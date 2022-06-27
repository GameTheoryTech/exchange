import {
    ChainId,
    Currency,
    CurrencyAmount,
    currencyEquals,
    ETHER,
    Fetcher,
    JSBI,
    Token,
    TokenAmount, Route,
    WETH
} from '@gametheory/sdk'
import {useEffect, useMemo, useState} from 'react'
import {BigNumber, ethers} from "ethers";
import ERC20_INTERFACE from '../../constants/abis/erc20'
import { useAllTokens } from '../../hooks/Tokens'
import { useActiveWeb3React } from '../../hooks'
import {useGameContract, useMulticallContract} from '../../hooks/useContract'
import { isAddress } from '../../utils'
import { useSingleContractMultipleData, useMultipleContractSingleData } from '../multicall/hooks'
import {GAME} from "../../constants";

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
export function useETHBalances(
  uncheckedAddresses?: (string | undefined)[]
): { [address: string]: CurrencyAmount | undefined } {
  const multicallContract = useMulticallContract()

  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address])
  )

  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: CurrencyAmount }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = CurrencyAmount.ether(JSBI.BigInt(value.toString()))
        return memo
      }, {}),
    [addresses, results]
  )
}

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (Token | undefined)[]
): [{ [tokenAddress: string]: TokenAmount | undefined }, boolean] {
  const validatedTokens: Token[] = useMemo(
    () => tokens?.filter((t?: Token): t is Token => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])

  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address])

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () =>
        address && validatedTokens.length > 0
          ? validatedTokens.reduce<{ [tokenAddress: string]: TokenAmount | undefined }>((memo, token, i) => {
              const value = balances?.[i]?.result?.[0]
              const amount = value ? JSBI.BigInt(value.toString()) : undefined
              if (amount) {
                memo[token.address] = new TokenAmount(token, amount)
              }
              return memo
            }, {})
          : {},
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (Token | undefined)[]
): { [tokenAddress: string]: TokenAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0]
}

// get the balance for a single token/account combo
export function useTokenBalance(account?: string, token?: Token): TokenAmount | undefined {
  const tokenBalances = useTokenBalances(account, [token])
  if (!token) return undefined
  return tokenBalances[token.address]
}

export function useCurrencyBalances(
  account?: string,
  currencies?: (Currency | undefined)[]
): (CurrencyAmount | undefined)[] {
  const tokens = useMemo(() => currencies?.filter((currency): currency is Token => currency instanceof Token) ?? [], [
    currencies
  ])

  const tokenBalances = useTokenBalances(account, tokens)
  const containsETH: boolean = useMemo(() => currencies?.some(currency => currency === ETHER) ?? false, [currencies])
  const ethBalance = useETHBalances(containsETH ? [account] : [])

  return useMemo(
    () =>
      currencies?.map(currency => {
        if (!account || !currency) return undefined
        if (currency instanceof Token) return tokenBalances[currency.address]
        if (currency === ETHER) return ethBalance[account]
        return undefined
      }) ?? [],
    [account, currencies, ethBalance, tokenBalances]
  )
}

export function useCurrencyBalance(account?: string, currency?: Currency): CurrencyAmount | undefined {
  return useCurrencyBalances(account, [currency])[0]
}

export function useSellTax(currency : Currency | undefined | null, value : string | undefined | null, route : Route | undefined | null, originalAmountOut : string | undefined | null) : Array<any>
{
    const { library } = useActiveWeb3React()
    const gameContract = useGameContract(GAME?.address);
    const [sellTax, setSellTax] = useState(BigNumber.from(0));
    const [refreshKey, setRefreshKey] = useState(0);
    const [amountInWithTax, setAmountInWithTax] = useState(BigNumber.from(0));
    const [extraSlippage, setExtraSlippage] = useState(0);
    useEffect(() => {
        async function getSellTax() {
            try {
                if(!currency || !currencyEquals(currency, GAME) || !gameContract || !library || !route || !value || parseFloat(value) === 0 || !originalAmountOut) {
                    setSellTax(BigNumber.from(0));
                    if(value) setAmountInWithTax(ethers.utils.parseEther(value));
                    else setAmountInWithTax(BigNumber.from(0));
                    setExtraSlippage(0);
                    return;
                }
                const revenue = await gameContract.revenue();
                const routePair = await Fetcher.fetchPairData(route.path[1], GAME, library);
                const liquidity = currencyEquals(routePair.token0, GAME) ? routePair.reserve0.raw.toString() : routePair.reserve1.raw.toString();
                const amount = ethers.utils.parseEther(value);
                const start = revenue;
                const end = revenue.add(amount);
                const taxIn = await gameContract.taxAmountIn(start, end, liquidity);
                const amountInWithTaxStr = amount.sub(taxIn).toString();
                const amountOut = BigNumber.from(routePair.getOutputAmount(
                    new TokenAmount(GAME, amountInWithTaxStr))[0].raw.toString());
                const taxOut = await gameContract.taxAmountOut(route.path[1].address, amountOut);
                const originalAmountOutBN = ethers.utils.parseEther(originalAmountOut);
                setExtraSlippage(
                    originalAmountOutBN.sub(amountOut.sub(taxOut)).mul(10000).div(originalAmountOutBN).toNumber()
                );
                //console.log(originalAmountOutBN.sub(amountOut.sub(taxOut)).mul(10000).div(originalAmountOutBN).toNumber());
                // console.log(
                //     // amount, taxIn, amountInWithTax,
                //     ethers.utils.formatEther(amountInWithTax), ethers.utils.formatEther(routePair.getOutputAmount(
                //     new TokenAmount(GAME, amountInWithTax))[0].raw.toString()));
                if(amountInWithTaxStr === '0') setSellTax(BigNumber.from(10000));
                else setSellTax(await gameContract.taxRate(start, end, liquidity, route.path[1].address, amountOut));
                setAmountInWithTax(BigNumber.from(amountInWithTaxStr));
                // console.log("ORIGINAL IN", amount);
                // console.log("IN", await gameContract.taxAmountIn(start, end, liquidity));
                // const amountOut = BigNumber.from(routePair.getOutputAmount(
                //     new TokenAmount(GAME, amountInWithTax))[0].raw.toString());
                // console.log("EXPECTED WITH NO SLIPPAGE", amountOut
                // );
                // console.log("EXPECTED WITH 0.5 SLIPPAGE", amountOut.sub(amountOut.mul(50).div(10000)));
                // console.log("OUT", await gameContract.taxAmountOut(route.path[1].address, routePair.getOutputAmount(
                //     new TokenAmount(GAME, amountInWithTax))[0].raw.toString()
                // ));
            }
            catch (e : any) {
                console.info(`Invalid input for taxRate: ${e?.stack}`);
            }
        }
        getSellTax().then();
    }, [gameContract, refreshKey, value, library, currency]);
    useEffect(() => {
        const interval=setInterval(()=>{
            setRefreshKey(oldKey => oldKey + 1);
        },10000)

        return()=>clearInterval(interval)
    }, []);
    return [sellTax, amountInWithTax, extraSlippage]
}

// mimics useAllBalances
export function useAllTokenBalances(): { [tokenAddress: string]: TokenAmount | undefined } {
  const { account } = useActiveWeb3React()
  const allTokens = useAllTokens()
  const allTokensArray = useMemo(() => Object.values(allTokens ?? {}), [allTokens])
  const balances = useTokenBalances(account ?? undefined, allTokensArray)
  return balances ?? {}
}
