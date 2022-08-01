import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import styled, { ThemeContext } from 'styled-components'
import {Box, Button, CardBody, ChevronDownIcon, Flex, Modal, Slider, Text, useModal} from '@gametheory/uikit'
import {useActiveWeb3React} from "../../hooks";
import {useContract, useGameContract, useTokenContract} from "../../hooks/useContract";
import {GAME, ROUTER_ADDRESS} from "../../constants";
import {BigNumber, BigNumberish, ethers} from "ethers";
import {Contract} from "@ethersproject/contracts";
import {useHasPendingApproval, useTransactionAdder} from "../../state/transactions/hooks";
import {calculateGasMargin, getProviderOrSigner} from "../../utils";
import {TransactionResponse} from "@ethersproject/providers";
import MasterChefABI from '../../constants/abis/MasterChef.json';
import {EarnNav} from 'components/CardNav'
import Question from 'components/QuestionHelper'
import Container from 'components/Container'
import PageHeader, {PageTitle} from "../../components/PageHeader";
import Wrapper, { Grid, GridItem } from 'components/Grid'
import TokenSymbol, {TokenSymbolWrapper} from 'components/TokenSymbol';

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
const useTransactionCallback = (
    contract : Contract | null | undefined, functionName : string, summary : string, ...args : Array<any>
): () => Promise<void> => {

  if(!contract) return useCallback(async (): Promise<void> => { return new Promise((executor) => { executor(); })}, []);
  const addTransaction = useTransactionAdder()

  const tx = useCallback(async (): Promise<void> => {

    const estimatedGas = await contract.estimateGas[functionName](...args);

    // eslint-disable-next-line consistent-return
    return contract[functionName](...args, {
          gasLimit: calculateGasMargin(estimatedGas),
        })
        .then((response: TransactionResponse) => {
          addTransaction(response, {
            summary: summary
          })
        })
        .catch((error: Error) => {
          console.error(`Failed to ${summary.charAt(0).toLowerCase() + summary.slice(1)}`, error)
          throw error
        })
  }, [contract, functionName, summary, args, addTransaction])

  return tx;
}

const formatEther4 = (ether : BigNumberish) : string => {
    const balance = BigNumber.from(ether);
    const remainder = balance.mod(BigNumber.from(10).pow(14));
    return (ethers.utils.formatEther(balance.sub(remainder)));
  }

const GameRewardCard = ({ }) => {
  const game = useGameContract(GAME?.address);
  const { account } = useActiveWeb3React();
  const [totalEarned, setTotalEarned] = useState(BigNumber.from(0));
  const [refreshKey, setRefreshKey] = useState(0);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !game) return;
      //console.log(await game.totalEarned(account))
      setTotalEarned(await game.totalEarned(account));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setTotalEarned, account, game, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  const onClaim = useTransactionCallback(game, "claimReward", `Claim GAME HODL rewards.`);

  return (<div className="boxed">
    <CardBody style={{textAlign: 'center'}}>
        <TokenSymbolWrapper>
            <TokenSymbol symbol="GAME" />
        </TokenSymbolWrapper>
        <CardTitle>Passive GAME Rewards</CardTitle>
        <Text textAlign="center" marginBottom="20px" fontSize="14px">
            Passively earn GAME just by holding or staking Game Theory tokens.
        </Text>
        <div style={{marginTop: 'auto'}}>
        <Text color="var(--extra-color-2)" fontSize="20px">
            {ethers.utils.formatEther(totalEarned)}
        </Text>
        <Text marginBottom="20px" className="textGlow" fontSize="14px">
            Claimable GAME Rewards
        </Text>
        <Button disabled={totalEarned.eq(0)} onClick={onClaim} my="10px" mx="5px" width={'100%'}>
            Claim
        </Button>
        <Text className="textGlow" marginTop="20px" fontSize="14px">
            Claiming here while having MASTER available to withdraw will re-lock your MASTER for 30 days!
        </Text>
        </div>
    </CardBody>
  </div>);
}

const TheoryRewardCard = ({ }) => {
  const game = useGameContract(GAME?.address);
  const { account } = useActiveWeb3React();
  const [totalRedeemTaxOutAmounts, setTotalRedeemTaxOutAmounts] = useState([BigNumber.from(0)]);
  const [redeemTaxAmounts, setTaxRedeemAmounts] = useState([BigNumber.from(0)]);
  const [totalSupply, setTotalSupply] = useState(BigNumber.from(0));
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [canTaxOut, setCanTaxOut] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!game) return;
      setTotalRedeemTaxOutAmounts(await game.totalRedeemTaxOutAmounts());
      setTotalSupply(await game.totalCredits());
      if(!account) return;
      setTaxRedeemAmounts(await game.redeemTaxOutAmounts(account));
      setBalance(await game.credits(account));
      setCanTaxOut(await game.canTaxOut((await game.claimableTokens(0)).addr));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setTaxRedeemAmounts, setTotalRedeemTaxOutAmounts, account, game, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  // const redeemTaxAmounts = await game?.redeemTaxOutAmounts(account);
  const onClaim = useTransactionCallback(game, "redeemTaxOut", `Claim GAME buy rewards.`);

  return (<div className="boxed">
    <CardBody style={{textAlign: 'center'}}>
        <TokenSymbolWrapper>
            <TokenSymbol symbol="USDC" />
        </TokenSymbolWrapper>
        <CardTitle>
            USDC Rewards Pool
        </CardTitle>
        <Text textAlign="center" marginBottom="20px" fontSize="14px">
            Earn a share of the USDC reward pool by buying GAME tokens while the price is under $1. Rewards become claimable when GAME price is above $1.
        </Text>
        <div style={{marginTop: 'auto'}}>
        { redeemTaxAmounts?.length > 0 && totalRedeemTaxOutAmounts?.length > 0 &&
            (
          <>
            <Text color="var(--extra-color-2)" fontSize="20px">{ethers.utils.formatUnits(redeemTaxAmounts[0], 6)}</Text>
            <Text className="textGlow" fontSize="14px" marginBottom='20px'>Claimable USDC Rewards</Text>
          </>
            )
        }
        <Button disabled={canTaxOut || !redeemTaxAmounts.some((bn) => {return bn.gt(0)})} onClick={onClaim} my="10px" mx="5px" width={'100%'}>
          Claim
        </Button>
        { redeemTaxAmounts?.length > 0 && totalRedeemTaxOutAmounts?.length > 0 &&
            (
          <>
            <Text fontSize="14px" className="textGlow" marginTop='20px'>Total USDC rewards pool:</Text>
            <Text fontSize="14px">{ethers.utils.formatUnits(totalRedeemTaxOutAmounts[0], 6)}</Text>
          </>
            )
        }
        </div>
    </CardBody>
  </div>);
}

export default function Rewards() {

    return (
        <Container>
            <PageTitle>
                Stake & Earn
            </PageTitle>
            <Text textAlign={'center'} marginBottom="40px">
      Access your rewards and stake your tokens to earn more.
      </Text>
            <EarnNav activeIndex={1} />
            <Wrapper>
                <Grid>
                    <GridItem width="375px">
                        <GameRewardCard />
                    </GridItem>
                    <GridItem width="375px">
                        <TheoryRewardCard />
                    </GridItem>
                </Grid>
            </Wrapper>
        </Container>
    )


}

const CardTitle = styled(Text)`
    font-size: 20px;
    font-family: "kallisto",sans-serif;
    font-weight: 700;
    margin-bottom: 20px;

    span {
        font-family: "kallisto",sans-serif;
        font-weight: 700;
        margin-right: 10px;
    }
`;