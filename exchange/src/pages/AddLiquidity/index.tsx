import React, { useCallback, useState } from 'react'
import { BigNumber } from '@ethersproject/bignumber'
import { TransactionResponse } from '@ethersproject/providers'
import {Currency, Token, currencyEquals, ETHER, TokenAmount, WETH, Trade} from '@gametheory/sdk'
import { Button, CardBody, AddIcon, Text as UIKitText } from '@gametheory/uikit'
import { RouteComponentProps } from 'react-router-dom'
import { LightCard } from 'components/Card'
import { AutoColumn, ColumnCenter } from 'components/Column'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'
import CardNav from 'components/CardNav'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { AddRemoveTabs } from 'components/NavigationTabs'
import { MinimalPositionCard } from 'components/PositionCard'
import Row, { RowBetween, RowFlat } from 'components/Row'

import { PairState } from 'data/Reserves'
import { useActiveWeb3React } from 'hooks'
import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Field } from 'state/mint/actions'
import { useDerivedMintInfo, useMintActionHandlers, useMintState } from 'state/mint/hooks'

import { useTransactionAdder } from 'state/transactions/hooks'
import { useIsExpertMode, useUserDeadline, useUserSlippageTolerance } from 'state/user/hooks'
import {calculateGasMargin, calculateSlippageAmount, getFactoryContract, getRouterContract} from 'utils'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { wrappedCurrency } from 'utils/wrappedCurrency'
import { currencyId } from 'utils/currencyId'
import Pane from 'components/Pane'
import Container from 'components/Container'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useI18n from 'hooks/useI18n'
import AppBody from '../AppBody'
import { Dots, Wrapper } from '../Pool/styleds'
import { ConfirmAddModalBottom } from './ConfirmAddModalBottom'
import { PoolPriceBar } from './PoolPriceBar'
import {GAME, ROUTER_ADDRESS} from '../../constants'
import useENS from "../../hooks/useENS";
import {useCurrencyBalances} from "../../state/wallet/hooks";
import {useAllCommonPairs, useTradeExactIn, useTradeExactOut} from "../../hooks/Trades";
import {tryParseAmount} from "../../state/swap/hooks";

export default function AddLiquidity({
  match: {
    params: { currencyIdA, currencyIdB },
  },
  history,
}: RouteComponentProps<{ currencyIdA?: string; currencyIdB?: string }>) {
  const { account, chainId, library } = useActiveWeb3React()
  const currencyA = useCurrency(currencyIdA)
  const currencyB = useCurrency(currencyIdB)
  const TranslateString = useI18n()

  const oneCurrencyIsWAVAX = Boolean(
    chainId &&
      ((currencyA && currencyEquals(currencyA, WETH[chainId])) ||
        (currencyB && currencyEquals(currencyB, WETH[chainId])))
  )
  const expertMode = useIsExpertMode()

  // mint state
  const { independentField, typedValue, otherTypedValue } = useMintState()
  const {
    dependentField,
    currencies,
    pair,
    pairState,
    currencyBalances,
    parsedAmounts,
    price,
    noLiquidity,
    liquidityMinted,
    poolTokenPercentage,
    error,
  } = useDerivedMintInfo(currencyA ?? undefined, currencyB ?? undefined)
  const { onFieldAInput, onFieldBInput } = useMintActionHandlers(noLiquidity)
  const isValid = !error

  // modal and loading
  const [showConfirm, setShowConfirm] = useState<boolean>(false)
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false) // clicked confirm

  // txn values
  const [deadline] = useUserDeadline() // custom from users settings
  const [allowedSlippage] = useUserSlippageTolerance() // custom from users
  const [txHash, setTxHash] = useState<string>('')

  // get formatted amounts
  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: noLiquidity ? otherTypedValue : parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // get the max amounts user can add
  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmountSpend(currencyBalances[field]),
      }
    },
    {}
  )

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.CURRENCY_A, Field.CURRENCY_B].reduce(
    (accumulator, field) => {
      return {
        ...accumulator,
        [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0'),
      }
    },
    {}
  )

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_A], ROUTER_ADDRESS)
  const [approvalB, approveBCallback] = useApproveCallback(parsedAmounts[Field.CURRENCY_B], ROUTER_ADDRESS)

  const addTransaction = useTransactionAdder();

  const tradeA = useTradeExactIn(parsedAmounts[Field.CURRENCY_A], GAME);
  const tradeB = useTradeExactIn(parsedAmounts[Field.CURRENCY_B], GAME);
  let desiredRouteA : Token[] = [];
  let desiredRouteB : Token[] = [];
  const wrappedA = wrappedCurrency(currencyA ?? undefined, chainId);
  const wrappedB = wrappedCurrency(currencyB ?? undefined, chainId);
  if(tradeA && wrappedB && tradeA.route.path && tradeA.route.path.length > 1)
  {
    desiredRouteA = tradeA.route.path;
    desiredRouteB = [wrappedB, ...tradeA.route.path];
  }
  else if (tradeB && wrappedA && tradeB.route.path && tradeB.route.path.length > 1)
  {
    desiredRouteA = [wrappedA, ...tradeB.route.path];
    desiredRouteB = tradeB.route.path;
  }

  async function onAdd() {
    if (!chainId || !library || !account) return
    const router = getRouterContract(chainId, library, account)

    const { [Field.CURRENCY_A]: parsedAmountA, [Field.CURRENCY_B]: parsedAmountB } = parsedAmounts
    if (!parsedAmountA || !parsedAmountB || !currencyA || !currencyB) {
      return
    }

    const amountsMin = {
      [Field.CURRENCY_A]: calculateSlippageAmount(parsedAmountA, noLiquidity ? 0 : allowedSlippage)[0],
      [Field.CURRENCY_B]: calculateSlippageAmount(parsedAmountB, noLiquidity ? 0 : allowedSlippage)[0],
    }

    const deadlineFromNow = Math.ceil(Date.now() / 1000) + deadline

    let estimate;
    let method: (...args: any) => Promise<TransactionResponse>
    let args: Array<string | string[] | string[][] | number>
    let value: BigNumber | null
    // TODO: Do this in UI and disable Supply button if no route found.
    const tokenA : Token = currencyA instanceof Token ? currencyA as Token : WETH[chainId];
    const tokenB : Token = currencyB instanceof Token ? currencyB as Token : WETH[chainId];
    let currencyARoute : Array<Token> = desiredRouteA;
    let currencyBRoute : Array<Token> = desiredRouteB;
    // TODO: Find the first currency in the pair that has a path to trade.route to GAME, or disable the button.

    // const factory = getFactoryContract(chainId, library, account);
    // Check if any currency is in a GAME pair.
    // Game pair itself
    if(tokenA.address.toLowerCase() === GAME.address.toLowerCase())
    {
      currencyARoute = [GAME];
      currencyBRoute = [tokenB, GAME];
    }
    else if(tokenB.address.toLowerCase() === GAME.address.toLowerCase())
    {
      currencyARoute = [tokenA, GAME];
      currencyBRoute = [GAME];
    }
    // else
    // {
    //   // Half of game pair
    //   const gameCurrencies = [WETH[chainId]];
    //   // eslint-disable-next-line no-restricted-syntax
    //   gameCurrencies.every((gameCurrency) => {
    //     if(tokenA.address.toLowerCase() === gameCurrency.address.toLowerCase())
    //     {
    //       currencyARoute = [gameCurrency, GAME];
    //       currencyBRoute = [tokenB, gameCurrency, GAME];
    //       return false;
    //     }
    //     if (tokenB.address.toLowerCase() === gameCurrency.address.toLowerCase())
    //     {
    //       currencyARoute = [tokenA, gameCurrency, GAME];
    //       currencyBRoute = [gameCurrency, GAME];
    //       return false;
    //     }
    //     return true;
    //   })
    // }
    const currencyARouteAddresses : string[] = currencyARoute.map((c) => c.address);
    const currencyBRouteAddresses : string[] = currencyBRoute.map((c) => c.address);
    const routeAddresses : string[][] = [currencyARouteAddresses, currencyBRouteAddresses];
    if (currencyA === ETHER || currencyB === ETHER) {
      const tokenBIsAVAX = currencyB === ETHER
      estimate = router.estimateGas.addLiquidityETH
      method = router.addLiquidityETH
      args = [
        wrappedCurrency(tokenBIsAVAX ? currencyA : currencyB, chainId)?.address ?? '', // token
        (tokenBIsAVAX ? parsedAmountA : parsedAmountB).raw.toString(), // token desired
        amountsMin[tokenBIsAVAX ? Field.CURRENCY_A : Field.CURRENCY_B].toString(), // token min
        amountsMin[tokenBIsAVAX ? Field.CURRENCY_B : Field.CURRENCY_A].toString(), // eth min
        account,
        deadlineFromNow,
        tokenBIsAVAX ? routeAddresses : routeAddresses.reverse() // Reverses in place, but we don't need the old array anymore.
      ]
      value = BigNumber.from((tokenBIsAVAX ? parsedAmountB : parsedAmountA).raw.toString())
    } else {
      estimate = router.estimateGas.addLiquidity
      method = router.addLiquidity
      args = [
        wrappedCurrency(currencyA, chainId)?.address ?? '',
        wrappedCurrency(currencyB, chainId)?.address ?? '',
        parsedAmountA.raw.toString(),
        parsedAmountB.raw.toString(),
        amountsMin[Field.CURRENCY_A].toString(),
        amountsMin[Field.CURRENCY_B].toString(),
        account,
        deadlineFromNow,
        routeAddresses
      ]
      value = null
    }

    setAttemptingTxn(true)
    // const aa = await estimate(...args, value ? { value } : {})
    await estimate(...args, value ? { value } : {})
      .then((estimatedGasLimit) =>
        method(...args, {
          ...(value ? { value } : {}),
          gasLimit: calculateGasMargin(estimatedGasLimit),
        }).then((response) => {
          setAttemptingTxn(false)

          addTransaction(response, {
            summary: `Add ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(3)} ${
              currencies[Field.CURRENCY_A]?.symbol
            } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(3)} ${currencies[Field.CURRENCY_B]?.symbol}`,
          })

          setTxHash(response.hash)
        })
      )
      .catch((e) => {
        setAttemptingTxn(false)
        // we only care if the error is something _other_ than the user rejected the tx
        if (e?.code !== 4001) {
          console.error(e)
        }
      })
  }

  const modalHeader = () => {
    return noLiquidity ? (
      <AutoColumn gap="20px">
        <LightCard mt="20px" borderRadius="20px">
          <RowFlat>
            <UIKitText fontSize="48px" mr="8px">
              {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol}`}
            </UIKitText>
            <DoubleCurrencyLogo
              currency0={currencies[Field.CURRENCY_A]}
              currency1={currencies[Field.CURRENCY_B]}
              size={30}
            />
          </RowFlat>
        </LightCard>
      </AutoColumn>
    ) : (
      <AutoColumn gap="20px">
        <RowFlat style={{ marginTop: '20px' }}>
          <UIKitText fontSize="48px" mr="8px">
            {liquidityMinted?.toSignificant(6)}
          </UIKitText>
          <DoubleCurrencyLogo
            currency0={currencies[Field.CURRENCY_A]}
            currency1={currencies[Field.CURRENCY_B]}
            size={30}
          />
        </RowFlat>
        <Row>
          <UIKitText fontSize="24px">
            {`${currencies[Field.CURRENCY_A]?.symbol}/${currencies[Field.CURRENCY_B]?.symbol} Pool Tokens`}
          </UIKitText>
        </Row>
        <UIKitText small textAlign="left" padding="8px 0 0 0 " style={{ fontStyle: 'italic' }}>
          {`Output is estimated. If the price changes by more than ${
            allowedSlippage / 100
          }% your transaction will revert.`}
        </UIKitText>
      </AutoColumn>
    )
  }

  const modalBottom = () => {
    return (
      <ConfirmAddModalBottom
        price={price}
        currencies={currencies}
        parsedAmounts={parsedAmounts}
        noLiquidity={noLiquidity}
        onAdd={onAdd}
        poolTokenPercentage={poolTokenPercentage}
      />
    )
  }

  const pendingText = `Supplying ${parsedAmounts[Field.CURRENCY_A]?.toSignificant(6)} ${
    currencies[Field.CURRENCY_A]?.symbol
  } and ${parsedAmounts[Field.CURRENCY_B]?.toSignificant(6)} ${currencies[Field.CURRENCY_B]?.symbol}`

  const handleCurrencyASelect = useCallback(
    (currA: Currency) => {
      const newCurrencyIdA = currencyId(currA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA]
  )
  const handleCurrencyBSelect = useCallback(
    (currB: Currency) => {
      const newCurrencyIdB = currencyId(currB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA || 'AVAX'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB]
  )

  const handleDismissConfirmation = useCallback(() => {
    setShowConfirm(false)
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onFieldAInput('')
    }
    setTxHash('')
  }, [onFieldAInput, txHash])

  const cannotBuybackGame = noLiquidity && !!currencyA && !!currencyB && !currencyEquals(currencyA, GAME) && !currencyEquals(currencyB, GAME) && desiredRouteA.length <= 1 && desiredRouteB.length <= 1;

  return (
    <Container>
      <CardNav activeIndex={1} />
      <AppBody>
        <AddRemoveTabs adding />
        <Wrapper>
          <TransactionConfirmationModal
            isOpen={showConfirm}
            onDismiss={handleDismissConfirmation}
            attemptingTxn={attemptingTxn}
            hash={txHash}
            content={() => (
              <ConfirmationModalContent
                title={
                  noLiquidity
                    ? TranslateString(1154, 'You are creating a pool')
                    : TranslateString(1156, 'You will receive')
                }
                onDismiss={handleDismissConfirmation}
                topContent={modalHeader}
                bottomContent={modalBottom}
              />
            )}
            pendingText={pendingText}
          />
          <CardBody>
            <AutoColumn gap="20px">
              {noLiquidity && (
                <ColumnCenter>
                  <Pane>
                    <AutoColumn gap="12px">
                      <UIKitText>{TranslateString(1158, 'You are the first liquidity provider.')}</UIKitText>
                      <UIKitText>
                        {TranslateString(1160, 'The ratio of tokens you add will set the price of this pool.')}
                      </UIKitText>
                      <UIKitText>
                        {TranslateString(1162, 'Once you are happy with the rate, click supply to review.')}
                      </UIKitText>
                      <UIKitText>
                        Make sure one of the tokens has a direct route to GAME, or contact us if you wish to buyback another token.
                      </UIKitText>
                    </AutoColumn>
                  </Pane>
                </ColumnCenter>
              )}
              <CurrencyInputPanel
                value={formattedAmounts[Field.CURRENCY_A]}
                onUserInput={onFieldAInput}
                onMax={() => {
                  onFieldAInput(maxAmounts[Field.CURRENCY_A]?.toExact() ?? '')
                }}
                onCurrencySelect={handleCurrencyASelect}
                showMaxButton={!atMaxAmounts[Field.CURRENCY_A]}
                currency={currencies[Field.CURRENCY_A]}
                id="add-liquidity-input-tokena"
                showCommonBases={false}
              />
              <ColumnCenter>
                <AddIcon color="textSubtle" />
              </ColumnCenter>
              <CurrencyInputPanel
                value={formattedAmounts[Field.CURRENCY_B]}
                onUserInput={onFieldBInput}
                onCurrencySelect={handleCurrencyBSelect}
                onMax={() => {
                  onFieldBInput(maxAmounts[Field.CURRENCY_B]?.toExact() ?? '')
                }}
                showMaxButton={!atMaxAmounts[Field.CURRENCY_B]}
                currency={currencies[Field.CURRENCY_B]}
                id="add-liquidity-input-tokenb"
                showCommonBases={false}
              />
              {currencies[Field.CURRENCY_A] && currencies[Field.CURRENCY_B] && pairState !== PairState.INVALID && (
                <div>
                  <UIKitText
                    style={{ textTransform: 'uppercase', fontWeight: 600 }}
                    color="textSubtle"
                    fontSize="12px"
                    mb="2px"
                  >
                    {noLiquidity
                      ? TranslateString(1164, 'Initial prices and pool share')
                      : TranslateString(1166, 'Prices and pool share')}
                  </UIKitText>
                  <Pane>
                    <PoolPriceBar
                      currencies={currencies}
                      poolTokenPercentage={poolTokenPercentage}
                      noLiquidity={noLiquidity}
                      price={price}
                    />
                  </Pane>
                </div>
              )}

              {!account ? (
                <ConnectWalletButton width="100%" />
              ) : (
                <AutoColumn gap="md">
                  {(approvalA === ApprovalState.NOT_APPROVED ||
                    approvalA === ApprovalState.PENDING ||
                    approvalB === ApprovalState.NOT_APPROVED ||
                    approvalB === ApprovalState.PENDING) &&
                    isValid && (
                      <RowBetween>
                        {approvalA !== ApprovalState.APPROVED && (
                          <Button
                            onClick={approveACallback}
                            disabled={approvalA === ApprovalState.PENDING}
                            style={{ width: approvalB !== ApprovalState.APPROVED ? '48%' : '100%' }}
                          >
                            {approvalA === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_A]?.symbol}</Dots>
                            ) : (
                              `Approve ${currencies[Field.CURRENCY_A]?.symbol}`
                            )}
                          </Button>
                        )}
                        {approvalB !== ApprovalState.APPROVED && (
                          <Button
                            onClick={approveBCallback}
                            disabled={approvalB === ApprovalState.PENDING}
                            style={{ width: approvalA !== ApprovalState.APPROVED ? '48%' : '100%' }}
                          >
                            {approvalB === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.CURRENCY_B]?.symbol}</Dots>
                            ) : (
                              `Approve ${currencies[Field.CURRENCY_B]?.symbol}`
                            )}
                          </Button>
                        )}
                      </RowBetween>
                    )}
                  <Button
                    onClick={() => {
                      if (expertMode) {
                        onAdd()
                      } else {
                        setShowConfirm(true)
                      }
                    }}
                    disabled={!isValid || approvalA !== ApprovalState.APPROVED || approvalB !== ApprovalState.APPROVED || cannotBuybackGame}
                    variant={
                      !isValid && !!parsedAmounts[Field.CURRENCY_A] && !!parsedAmounts[Field.CURRENCY_B]
                        ? 'danger'
                        : 'primary'
                    }
                    width="100%"
                  >
                    {cannotBuybackGame ? 'No buyback route to GAME found.' : error ?? 'Supply'}
                  </Button>
                </AutoColumn>
              )}
            </AutoColumn>
          </CardBody>
        </Wrapper>
      </AppBody>
      {pair && !noLiquidity && pairState !== PairState.INVALID ? (
        <AutoColumn style={{ minWidth: '20rem', marginTop: '1rem' }}>
          <MinimalPositionCard showUnwrapped={oneCurrencyIsWAVAX} pair={pair} />
        </AutoColumn>
      ) : null}
    </Container>
  )
}
