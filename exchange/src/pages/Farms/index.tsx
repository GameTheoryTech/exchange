import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import styled, { ThemeContext } from 'styled-components'
import {currencyEquals, ETHER, Pair, Token, TokenAmount, Trade} from '@gametheory/sdk'
import {Box, Button, Card,CardBody, ChevronDownIcon, Flex, Grid, Modal, Slider, Text, useModal} from '@gametheory/uikit'
import {EarnNav} from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import Container from 'components/Container'
import {Contract} from "@ethersproject/contracts";
import {ApprovalState, useApproveCallback} from "../../hooks/useApproveCallback";
import {Currency, CurrencyAmount} from "@gametheory/sdk";
import {useActiveWeb3React} from "../../hooks";
import AppBody from "../AppBody";
import PageHeader, {PageTitle} from "../../components/PageHeader";
import {Link} from "react-router-dom";
import MasterChefABI from '../../constants/abis/MasterChef.json';
import MasterABI from '../../constants/abis/master.json';
import ERC721_ABI from '../../constants/abis/erc721.json'
import PairABI from '../../constants/abis/pair.json';

import {Dots} from "../Pool/styleds";
import {useHasPendingApproval, useTransactionAdder} from "../../state/transactions/hooks";
import {useContract, useGameContract, useTokenContract} from "../../hooks/useContract";
import {MaxUint256} from "@ethersproject/constants";
import {calculateGasMargin, getProviderOrSigner} from "../../utils";
import {TransactionResponse} from "@ethersproject/providers";
import {computeSlippageAdjustedAmounts} from "../../utils/prices";
import {Field} from "../../state/swap/actions";
import {GAME, ROUTER_ADDRESS} from "../../constants";
import SettingsModal from "../../components/PageHeader/SettingsModal";
import {BigNumber, BigNumberish, ethers} from "ethers";
import SlippageToleranceSetting from "../../components/PageHeader/SlippageToleranceSetting";
import TransactionDeadlineSetting from "../../components/PageHeader/TransactionDeadlineSetting";
import ExpertSetting from "../../components/PageHeader/ExpertSetting";
import CurrencyInputPanel from "../../components/CurrencyInputPanel";
import {useToken} from "../../hooks/Tokens";
import DoubleCurrencyLogo from "../../components/DoubleLogo";
import CurrencyLogo from "../../components/CurrencyLogo";
import CurrencySearchModal from "../../components/SearchModal/CurrencySearchModal";
import {darken} from "polished";
import NumericalInput from "../../components/NumericalInput";
import {ERC20_ABI} from "../../constants/abis/erc20";
import TokenSymbol, {TokenSymbolWrapper} from 'components/TokenSymbol';
import Wrapper, { Grid as GridWrap, GridItem } from 'components/Grid'

interface Farm
{
  name: string,
  id: number,
  contract: Contract,
  depositTokenName: string,
  earnTokenName: string
  // finished: false,
  // multiplier: '7500',
  // site: "https://makerdao.com",
  // buyLink: 'https://spooky.fi/#/swap?outputCurrency=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
  // sort: 0,
  // closedForStaking: true,
}

interface FarmCardProps {
  farm: Farm;
  account: string | null | undefined;
}

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
const formatEther2 = (ether : BigNumberish) : string => {
  const balance = BigNumber.from(ether);
  const remainder = balance.mod(BigNumber.from(10).pow(16));
  return (ethers.utils.formatEther(balance.sub(remainder)));
}
const formatUSDC4 = (ether : BigNumberish) : string => {
  const balance = BigNumber.from(ether);
  const remainder = balance.mod(BigNumber.from(10).pow(2));
  return (ethers.utils.formatUnits(balance.sub(remainder), 6));
}
const formatUSDC2 = (ether : BigNumberish) : string => {
  const balance = BigNumber.from(ether);
  const remainder = balance.mod(BigNumber.from(10).pow(4));
  return (ethers.utils.formatUnits(balance.sub(remainder), 6));
}

type FarmModalProps = {
  onDismiss?: () => void
  farm: Farm,
  token : Token | undefined,
  account : string | null | undefined
}

type MasterModalProps = {
  onDismiss?: () => void
  master: Contract,
  token : Token | null | undefined,
  account : string | null | undefined
}

const defaultOnDismiss = () => null
const MasterModal = ({ onDismiss = defaultOnDismiss, master, token, account }: MasterModalProps) => {
  const [amount, setAmount] = useState("0");
  const [days, setDays] = useState(30);
  const [maxAmount, setMaxAmount] = useState("0");
  const [masterReceived, setMasterReceived] = useState("0");
  const contract = useTokenContract(token?.address);
  const onDeposit = useTransactionCallback(master, "deposit", `Deposit ${amount} GAME-USDC to MASTER.`, amount ? ethers.utils.parseEther(amount) : "0", BigNumber.from(days).mul(24).mul(60).mul(60));
  const [refreshKey, setRefreshKey] = useState(0);
  const [minDays, setMinDays] = useState(30);
  const mountedRef = useRef(true);

  //TODO: Min days if you have a balance is userInfo.lockTime/24/60/60
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },1000);
    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !contract) return;
      setMaxAmount(ethers.utils.formatEther(await contract.balanceOf(account)));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setMaxAmount, token, account, contract]);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !master) return;
      let _minDays = 30;
      if((await master.balanceOf(account)).gt(0))
      {
        const masterInfo = (await master.userInfo(account));
        if(masterInfo && masterInfo.lockTime !== undefined) {
          _minDays = Math.ceil(masterInfo.lockTime.toNumber() / 60 / 60 / 24);
          setMinDays(_minDays);
        }
      }
      setMasterReceived(ethers.utils.formatEther(await master.lpToMaster(account, amount ? ethers.utils.parseEther(amount) : "0", BigNumber.from(Math.max(days, _minDays)).mul(24).mul(60).mul(60))));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setMasterReceived, setMinDays, account, master, amount, days, refreshKey]);

  return (
      <Modal title="Deposit (MASTER)" onDismiss={onDismiss}>
        <CurrencyInputPanel
            value={amount}
            onUserInput={(input) => {setAmount(input)}}
            onMax={() => {
              setAmount(maxAmount);
            }}
            disableCurrencySelect={true}
            showMaxButton={amount !== maxAmount}
            currency={token}
            id="master-input-token"
            showCommonBases={false}
        />
        <Grid>
        <Text>Days: {days}</Text>
          <Box width="420px">
        <Slider name="master-input-slider" min={minDays} max={1460} value={days} onValueChanged={(val)=>{setDays(val)}} step={1} />
          </Box>
            <Text>MASTER Received: {masterReceived} </Text>
        </Grid>
        <Button disabled={!amount || amount === "0"} onClick={() => {onDeposit();onDismiss();}} my="10px" mx="5px">
          Deposit
        </Button>
      </Modal>
  );
}
const DepositModal = ({ onDismiss = defaultOnDismiss, farm, token, account }: FarmModalProps) => {
  const [amount, setAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");
  const contract = useTokenContract(token?.address);
  const connectedFarmContract = useContract(farm.contract.address, MasterChefABI, true);
  const onDeposit = useTransactionCallback(connectedFarmContract, "deposit", `Deposit ${amount} ${farm.earnTokenName} to ${farm.name} farm.`, farm.id, amount ? ethers.utils.parseEther(amount) : "0");

  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !contract) return;
      setMaxAmount(ethers.utils.formatEther(await contract.balanceOf(account)));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setMaxAmount, account, contract]);
  return (
      <Modal title="Deposit" onDismiss={onDismiss}>
        <CurrencyInputPanel
            value={amount}
            onUserInput={(input) => {setAmount(input)}}
            onMax={() => {
              setAmount(maxAmount);
            }}
            disableCurrencySelect={true}
            showMaxButton={amount !== maxAmount}
            currency={token}
            id="deposit-input-token"
            showCommonBases={false}
        />
        <Button disabled={!amount || amount === "0"} onClick={() => {onDeposit();onDismiss();}} my="10px" mx="5px">
          Deposit
        </Button>
      </Modal>
  );
}

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`
const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 34px;
  font-size: 16px;
  font-weight: 500;
  background-color: transparent;
  color: ${({ selected, theme }) => (selected ? theme.colors.text : '#FFFFFF')};
  border-radius: 12px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  :focus,
  :hover {
    background-color: ${({ theme }) => darken(0.05, theme.colors.input)};
  }
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.colors.textSubtle)};
  }
`
const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`
const InputContainer = styled.div<{ hideInput: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
const WithdrawModal = ({ onDismiss = defaultOnDismiss, farm, token, account }: FarmModalProps) => {
  const [amount, setAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");
  //const contract = useTokenContract(token?.address);
  const connectedFarmContract = useContract(farm.contract.address, MasterChefABI, true);
  const onWithdraw = useTransactionCallback(connectedFarmContract, "withdraw", `Withdraw ${amount} ${farm.earnTokenName} from ${farm.name} farm.`, farm.id, amount ? ethers.utils.parseEther(amount) : "0");

  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account) return;
      if(BigNumber.from(farm.id).gte(await farm.contract.poolLength())) return;
      const userInfo = await farm.contract.userInfo(farm.id, account);
      setMaxAmount(ethers.utils.formatEther((userInfo.amount).sub(userInfo.lockedAmount)));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setMaxAmount, account, farm]);
  return (
      <Modal title="Withdraw" onDismiss={onDismiss}>
        <CurrencyInputPanel
            value={amount}
            onUserInput={(input) => {setAmount(input)}}
            onMax={() => {
              setAmount(maxAmount);
            }}
            disableCurrencySelect={true}
            showMaxButton={amount !== maxAmount}
            currency={token}
            id="withdraw-input-token"
            showCommonBases={false}
            balanceOverride={maxAmount}
        />
        <Button disabled={!amount || amount === "0"} onClick={() => {onWithdraw();onDismiss();}} my="10px" mx="5px">
          Withdraw
        </Button>
      </Modal>
  );
}
const BoostModal = ({ onDismiss = defaultOnDismiss, farm, token, account }: FarmModalProps) => {
  const [nftId, setNftId] = useState("1");
  const [approved, setApproved] = useState(false);
  const [owned, setOwned] = useState(false);
  const nftAddress = "0x77396e5a5b5d27dd4F22C8AdEcfa951e494f35aA"
  const nftContract = useContract(nftAddress, ERC721_ABI, true);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !nftContract || !nftId || !(await nftContract.exists(nftId)))
      {
        setApproved(false);
        setOwned(false);
        return;
      }
      try {
        setApproved((await nftContract.getApproved(nftId)).toLowerCase() === farm.contract.address.toLowerCase());
        setOwned((await nftContract.ownerOf(nftId)).toLowerCase() === account.toLowerCase())
      }
      catch (error : any) //DONE: Shouldn't run into this anymore.
      {
        if(!error.message.includes("query for nonexistent token")) //Hack for the fact that querying if a token exists isn't standard.
          throw(error);
        else
          setApproved(false);
          setOwned(false);
      }
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setApproved, setOwned, account, nftContract, nftId, farm, refreshKey]);

  const connectedFarmContract = useContract(farm.contract.address, MasterChefABI, true);
  const onBoost = useTransactionCallback(connectedFarmContract, "depositNft", `Deposit Boost NFT ID ${nftId} to ${farm.name} farm.`, farm.id, nftAddress, nftId ? nftId : "0");
  const onApprove = useTransactionCallback(nftContract, "approve", `Approve Boost NFT ID ${nftId} for ${farm.name} farm.`, farm.contract.address, nftId ? nftId : "0");

  return (
      <Modal title="Boost" onDismiss={onDismiss}>
        <Text>Type your NFT ID here</Text>
        <InputPanel id="boost-input-token">
          <InputContainer hideInput={false}>
            <InputRow selected={true}>
              <NumericalInput
                  className="token-amount-input"
                  value={nftId}
                  onUserInput={(val) => {
                    setNftId(val);
                    // setRefreshKey(oldKey => oldKey + 1);
                  }}
                  placeholder="1"
              />
            </InputRow>
          </InputContainer>
        </InputPanel>
        <Button disabled={!owned} onClick={() => {if(approved){ onBoost(); onDismiss(); } else onApprove();}} my="10px" mx="5px">
          {owned ? ((approved ? "Boost" : "Approve")) : ("Not Owned")}
        </Button>
      </Modal>
  )
}

const FarmCard : React.FC<FarmCardProps> = ({ farm, account }) => {
  const [poolInfo, setPoolInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [tokenAmount, setTokenAmount] = useState<TokenAmount | undefined>(undefined);
  const [pendingGame, setPendingGame] = useState(BigNumber.from(0));
  const [apr, setApr] = useState(0);
  const [dpr, setDpr] = useState(0);
  const [tokensPerDay, setTokensPerDay] = useState(BigNumber.from(0));
  const [tokensPerYear, setTokensPerYear] = useState(BigNumber.from(0));
  const [oraclePrice, setOraclePrice] = useState(BigNumber.from(0));
  const [depositPrice, setDepositPrice] = useState(BigNumber.from(0));
  const game = useGameContract(GAME?.address);
  const lpToken = useContract(poolInfo?.lpToken, PairABI, true);
  const [refreshKey, setRefreshKey] = useState(0);

  const mountedRef = useRef(true);
  const { library } = useActiveWeb3React()
  useEffect(() => {
    const effect = async () =>
    {
        if(BigNumber.from(farm.id).gte(await farm.contract.poolLength())) return;
        const _poolInfo = await farm.contract.poolInfo(farm.id);
        setPoolInfo(_poolInfo);
        if(!account) return;
        setUserInfo(await farm.contract.userInfo(farm.id, account));
        setPendingGame(await farm.contract.pendingGame(farm.id, account));
        //setPendingGame(ethers.utils.parseEther("0.019545254223099787").mul(59));
        if (_poolInfo && farm.earnTokenName === 'GAME')
        {
          const _token = new Token(43113, _poolInfo.lpToken, 18, farm.depositTokenName, farm.depositTokenName);
          setToken(_token);
          if(_token)
            setTokenAmount(new TokenAmount(_token, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
          if(game)
          {
            const tokenPerSecond = await farm.contract.getGamePerSecondInPool(farm.id, account);
            const tokenPerHour = tokenPerSecond.mul(60).mul(60);
            const totalRewardTokensPerDay = tokenPerHour.mul(24);
            const totalRewardTokensPerYear = totalRewardTokensPerDay.mul(365);
            const totalStakingTokensInPool = _poolInfo.totalDeposited;
            if ((await game.oracle()) !== "0x0000000000000000000000000000000000000000") {
              const _oraclePrice = await game.getPrice();
              setOraclePrice(_oraclePrice);
              const totalRewardPricePerDay =
                  totalRewardTokensPerDay.mul(_oraclePrice).div(BigNumber.from(10).pow(18));
              const totalRewardPricePerYear =
                  totalRewardTokensPerYear.mul(_oraclePrice).div(BigNumber.from(10).pow(18));

              if(lpToken) {
                const totalSupply = await lpToken.totalSupply();
                //Get amount of tokenA
                let otherToken = await lpToken.token0();
                if(otherToken.toLowerCase() == game.address.toLowerCase()) otherToken = await lpToken.token1();

                // const totalSupply = await lpToken.totalSupply();
                // //Get amount of tokenA
                // const tokenSupply = await game.balanceOf(lpToken.address);
                // const priceOfToken = _oraclePrice;
                // const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(18)).div(totalSupply);
                // const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.

                const tokenSupply = await new Contract(otherToken, ERC20_ABI, library).balanceOf(lpToken.address);
                const priceOfToken = BigNumber.from(10).pow(18); //Lazy... USDC = $1
                const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(12)).mul(BigNumber.from(10).pow(18)).div(totalSupply);
                const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.
                setDepositPrice(_depositPrice);
                const totalStakingPriceInPool =
                    totalStakingTokensInPool.mul(_depositPrice).div(BigNumber.from(10).pow(18))
                const dailyAPR = (+ethers.utils.formatEther(totalRewardPricePerDay) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                const yearlyAPR = (+ethers.utils.formatEther(totalRewardPricePerYear) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                setDpr(dailyAPR);
                setApr(yearlyAPR);
              }
            }
            {
              if(_poolInfo.totalDeposited.eq(0)) return; //Temp
              const tokensPerSecond = await farm.contract.getPersonalGamePerSecondInPool(farm.id, account);
              const _tokensPerDay = tokensPerSecond.mul(60).mul(60).mul(24);
              setTokensPerDay(_tokensPerDay);
              setTokensPerYear(_tokensPerDay.mul(365));
            }
          }
        }
        // return tokenContract
        //     .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        //       gasLimit: calculateGasMargin(estimatedGas),
        //     })
        //     .then((response: TransactionResponse) => {
        //       addTransaction(response, {
        //         summary: `Approve ${amountToApprove.currency.symbol}`,
        //         approval: { tokenAddress: token.address, spender },
        //       })
        //     })
        //     .catch((error: Error) => {
        //       console.error('Failed to approve token', error)
        //       throw error
        //     })
    }
    effect();
    return () => { mountedRef.current = false }
  }, [setUserInfo, setPoolInfo, setPendingGame, setToken, setTokenAmount, farm, account, game, lpToken, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  //TODO: Use permit instead of approve. Add depositWithPermit and depositOnBehalfOfWithPermit to farms.
  const [approvalState, approveCallback] = useApproveCallback(tokenAmount, farm.contract.address);
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)
  const [onPresentDeposit] = useModal(<DepositModal farm={farm} token={token} account={account} />);
  const [onPresentWithdraw] = useModal(<WithdrawModal farm={farm} token={token} account={account} />);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted]);


  return (<div className="boxed">
    <CardBody style={{textAlign: 'center'}}>
    <TokenSymbolWrapper>
      <TokenSymbol symbol={`${token}`} />
      <TokenSymbol symbol="USDC" />
    </TokenSymbolWrapper>
    <CardTitle>
      {farm.name} Liquidity Pool
    </CardTitle>
    {/*<Question
          text={`Your Daily ${farm.earnTokenName} Emissions: ${ethers.utils.formatEther(tokensPerDay)}
Your Yearly ${farm.earnTokenName} Emissions: ${ethers.utils.formatEther(tokensPerYear)}`}
/>*/}
    <Text textAlign="center" marginBottom="40px" fontSize="14px">  
      Deposit GAME-USDC LP tokens & earn yield. No locking time period. Withdraw at any time.
    </Text>

    <CardMeta style={{marginBottom:'40px'}}>
      <GridWrap>
        <GridItem width="lg" mobile>
          <Text color="var(--extra-color-2)" fontSize="20px">{apr.toFixed(2)}%</Text>
          <Text className="textGlow" fontSize="14px">Yearly Rewards</Text>
        </GridItem>
        <GridItem width="lg" mobile>
          <Text color="var(--extra-color-2)" fontSize="20px">{dpr.toFixed(2)}%</Text>
          <Text className="textGlow" fontSize="14px">Daily Rewards</Text>
        </GridItem>
      </GridWrap>
    </CardMeta>
          
        {/*<Box>Total Emissions Per Day ({farm.earnTokenName}): {totalTokensPerDay}</Box>*/}
        {/*<Box>Total Emissions Per Year ({farm.earnTokenName}): {totalTokensPerYear}</Box> removed due to confusion about what this means (it means if everyone had your boost, this would be total emissions. To be replaced with personal emissions.)*/}
        {(farm.depositTokenName === "GAME-USDC" ?
        <>
          <Text fontSize="36px" fontWeight="700" lineHeight="1">{formatEther4((userInfo?.amount ?? BigNumber.from(0)).sub(userInfo?.lockedAmount ?? BigNumber.from(0)))}</Text>
          <Text color="var(--extra-color-2)" fontSize="20px">
          ${formatEther2(((userInfo?.amount ?? BigNumber.from(0)).sub(userInfo?.lockedAmount ?? BigNumber.from(0)))
              .mul(depositPrice).div(BigNumber.from(10).pow(18)))}
          </Text>
          <Text className="textGlow" fontSize="14px" marginBottom='30px'>
            GAME-USDC LP Tokens Staked
          </Text>
        </> :
        <>
          <Text fontSize="36px" fontWeight="700" lineHeight="1">{formatEther4(userInfo?.amount ?? BigNumber.from(0))}</Text>
            <Text color="var(--extra-color-2)" fontSize="20px">
            ${formatEther2(((userInfo?.amount ?? BigNumber.from(0)))
                .mul(depositPrice).div(BigNumber.from(10).pow(18)))}
          </Text>
            <Text className="textGlow" fontSize="14px" marginBottom='30px'>
              Deposited
          </Text>
        </>)
        }
        <div style={{marginTop: 'auto'}}>
          <GridWrap>
            <GridItem width="lg" mobile>
          {approvalState !== ApprovalState.APPROVED ?
          (<Button width={'100%'} onClick={approveCallback}
                   disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                   variant={
                     //@ts-ignore
                     approvalState === ApprovalState.APPROVED
                       ? 'success' : 'primary'}>
            Approve
          </Button>) :
          (<Button onClick={onPresentDeposit} width={'100%'}>
            Deposit
          </Button>)}
          </GridItem>
          <GridItem width="lg" mobile>
          <Button disabled={userInfo?.amount.eq(0) ?? true} onClick={onPresentWithdraw} width={'100%'}>
            Withdraw
          </Button>
          </GridItem>
          </GridWrap>
          </div>
      </CardBody>
  </div>);
}

const FarmCardClaim = (props: {farm: Farm, account: any}) => {
  const {farm, account} = props;
  const [poolInfo, setPoolInfo] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [tokenAmount, setTokenAmount] = useState<TokenAmount | undefined>(undefined);
  const [pendingGame, setPendingGame] = useState(BigNumber.from(0));
  const [apr, setApr] = useState(0);
  const [dpr, setDpr] = useState(0);
  const [tokensPerDay, setTokensPerDay] = useState(BigNumber.from(0));
  const [tokensPerYear, setTokensPerYear] = useState(BigNumber.from(0));
  const [oraclePrice, setOraclePrice] = useState(BigNumber.from(0));
  const [depositPrice, setDepositPrice] = useState(BigNumber.from(0));
  const game = useGameContract(GAME?.address);
  const lpToken = useContract(poolInfo?.lpToken, PairABI, true);
  const [refreshKey, setRefreshKey] = useState(0);

  const mountedRef = useRef(true);
  const { library } = useActiveWeb3React()

  useEffect(() => {
    const effect = async () =>
    {
        if(BigNumber.from(farm.id).gte(await farm.contract.poolLength())) return;
        const _poolInfo = await farm.contract.poolInfo(farm.id);
        setPoolInfo(_poolInfo);
        if(!account) return;
        setUserInfo(await farm.contract.userInfo(farm.id, account));
        setPendingGame(await farm.contract.pendingGame(farm.id, account));
        //setPendingGame(ethers.utils.parseEther("0.019545254223099787").mul(59));
        if (_poolInfo && farm.earnTokenName === 'GAME')
        {
          const _token = new Token(43113, _poolInfo.lpToken, 18, farm.depositTokenName, farm.depositTokenName);
          setToken(_token);
          if(_token)
            setTokenAmount(new TokenAmount(_token, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
          if(game)
          {
            const tokenPerSecond = await farm.contract.getGamePerSecondInPool(farm.id, account);
            const tokenPerHour = tokenPerSecond.mul(60).mul(60);
            const totalRewardTokensPerDay = tokenPerHour.mul(24);
            const totalRewardTokensPerYear = totalRewardTokensPerDay.mul(365);
            const totalStakingTokensInPool = _poolInfo.totalDeposited;
            if ((await game.oracle()) !== "0x0000000000000000000000000000000000000000") {
              const _oraclePrice = await game.getPrice();
              setOraclePrice(_oraclePrice);
              const totalRewardPricePerDay =
                  totalRewardTokensPerDay.mul(_oraclePrice).div(BigNumber.from(10).pow(18));
              const totalRewardPricePerYear =
                  totalRewardTokensPerYear.mul(_oraclePrice).div(BigNumber.from(10).pow(18));

              if(lpToken) {
                const totalSupply = await lpToken.totalSupply();
                //Get amount of tokenA
                let otherToken = await lpToken.token0();
                if(otherToken.toLowerCase() == game.address.toLowerCase()) otherToken = await lpToken.token1();

                // const totalSupply = await lpToken.totalSupply();
                // //Get amount of tokenA
                // const tokenSupply = await game.balanceOf(lpToken.address);
                // const priceOfToken = _oraclePrice;
                // const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(18)).div(totalSupply);
                // const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.

                const tokenSupply = await new Contract(otherToken, ERC20_ABI, library).balanceOf(lpToken.address);
                const priceOfToken = BigNumber.from(10).pow(18); //Lazy... USDC = $1
                const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(12)).mul(BigNumber.from(10).pow(18)).div(totalSupply);
                const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.
                setDepositPrice(_depositPrice);
                const totalStakingPriceInPool =
                    totalStakingTokensInPool.mul(_depositPrice).div(BigNumber.from(10).pow(18))
                const dailyAPR = (+ethers.utils.formatEther(totalRewardPricePerDay) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                const yearlyAPR = (+ethers.utils.formatEther(totalRewardPricePerYear) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                setDpr(dailyAPR);
                setApr(yearlyAPR);
              }
            }
            {
              if(_poolInfo.totalDeposited.eq(0)) return; //Temp
              const tokensPerSecond = await farm.contract.getPersonalGamePerSecondInPool(farm.id, account);
              const _tokensPerDay = tokensPerSecond.mul(60).mul(60).mul(24);
              setTokensPerDay(_tokensPerDay);
              setTokensPerYear(_tokensPerDay.mul(365));
            }
          }
        }
        // return tokenContract
        //     .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        //       gasLimit: calculateGasMargin(estimatedGas),
        //     })
        //     .then((response: TransactionResponse) => {
        //       addTransaction(response, {
        //         summary: `Approve ${amountToApprove.currency.symbol}`,
        //         approval: { tokenAddress: token.address, spender },
        //       })
        //     })
        //     .catch((error: Error) => {
        //       console.error('Failed to approve token', error)
        //       throw error
        //     })
    }
    effect();
    return () => { mountedRef.current = false }
  }, [setUserInfo, setPoolInfo, setPendingGame, setToken, setTokenAmount, farm, account, game, lpToken, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);

  const connectedFarmContract = useContract(farm.contract.address, MasterChefABI, true);
  const [onPresentBoost] = useModal(<BoostModal farm={farm} token={token} account={account} />);
  const onClaim = useTransactionCallback(connectedFarmContract, "withdraw", `Claim ${farm.earnTokenName} from ${farm.name} farm.`, farm.id, 0);
  const onUnboost = useTransactionCallback(connectedFarmContract, "withdrawNft", `Withdraw Boost NFT from ${farm.name} farm.`, farm.id);

  const [approvalState, approveCallback] = useApproveCallback(tokenAmount, farm.contract.address);
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted]);

  return (
    <Card>
      <CardBody style={{textAlign: 'center'}}>
        <CardTitle>
        Claim Your Staking Rewards
        </CardTitle>
        <Text fontSize='14px' marginBottom="30px">
        Your GAME rewards from both Liquidity Pool and MASTER Rewards Pool.
        </Text>


        <Text fontSize="36px" fontWeight="700" lineHeight="1">{formatEther4(pendingGame)}</Text>
        <Text color="var(--extra-color-2)" fontSize="20px">
        ${formatEther2(pendingGame
      .mul(oraclePrice).div(BigNumber.from(10).pow(18)))}
        </Text>
        <Text className="textGlow" fontSize="14px" marginBottom='30px'>
          GAME Earned
        </Text>

        <Button disabled={userInfo?.amount.eq(0) ?? true} onClick={onClaim} width="100%" marginBottom={'30px'}>
          Claim Rewards
        </Button>

        <Text fontSize="14px" marginBottom='30px'>
          Boost your APR percentage rates with a Game Theory NFT! Simply enter your NFT ID number to earn more!
        </Text>

        {(userInfo && userInfo.nft.addr !== "0x0000000000000000000000000000000000000000" ?
    <Button onClick={onUnboost} width="100%">
      Unboost
    </Button>
    : <Button disabled={!userInfo || userInfo.nft.addr !== "0x0000000000000000000000000000000000000000"} onClick={onPresentBoost} width="100%">
      Boost
    </Button>)}
    </CardBody>
    </Card>
  );
}

export default function Farms() {
  const theme = useContext(ThemeContext);
  const { account, library } = useActiveWeb3React();
  const farmsIsLoading = false;
  const [contract, setContract] = useState(new Contract("0x50ad0F743278893Ed7184F8B0272c51E88493528", MasterChefABI, library));
  const [farms, setFarms] = useState([{name: "GAME-USDC", id: 0, contract: contract, depositTokenName: "GAME-USDC", earnTokenName: "GAME"}]);
  const [tokenAddress, setTokenAddress] = useState("");
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      let _contract : Contract = new Contract(contract.address, MasterChefABI, library);
      if(account && library) setContract(_contract.connect(getProviderOrSigner(library, account)));
      else setContract(_contract);
      //const farms : Farm[] = [{name: "GAME-USDC", id: 0, contract: contract, depositTokenName: "GAME-USDC.e", earnTokenName: "GAME"},{name: "GAME-WAVAX", id: 1, contract: contract, depositTokenName: "GAME-WAVAX", earnTokenName: "GAME"}];
      setFarms([{name: "GAME-USDC", id: 0, contract: _contract, depositTokenName: "GAME-USDC", earnTokenName: "GAME"}]);
      if((await _contract.poolLength()).gt(0)) setTokenAddress((await _contract.poolInfo(0)).lpToken);
    };
    effect();
    return () => { mountedRef.current = false }
  }, [account, library, setContract, setFarms, setTokenAddress]);

  return (
    <Container>
      <PageTitle>
        Stake & Earn
      </PageTitle>
      <Text textAlign={'center'} marginBottom="40px">
      Access your rewards and stake your tokens to earn more.
      </Text>
      <EarnNav activeIndex={0} />
      <Wrapper>
                <GridWrap>
                    <GridItem width="375px">
                    <FarmCard farm={farms[0]} account={account} />
                    </GridItem>
                    <GridItem width="375px">
                      <MasterRewardCard tokenAddress={tokenAddress}/>
                    </GridItem>
                </GridWrap>
                <GridWrap style={{marginTop: '10px'}}>
                    <GridItem width="375px">
                      <FarmCardClaim farm={farms[0]} account={account} />
                    </GridItem>
                </GridWrap>
            </Wrapper>
    </Container>
  )
}

type MasterRewardProps = {
  tokenAddress: string
}

const MasterRewardCard = ({ tokenAddress } : MasterRewardProps) => {
  const { account, library } = useActiveWeb3React();
  const [contract, setContract] = useState(new Contract("0x93F71fcc39B278D4B5c0dB1Cab844b4d36e4575B", MasterABI, library));
  let token = useToken(tokenAddress === "" ? undefined : tokenAddress);
  if(token)
  {
    token.name = "GAME-USDC";
    token.symbol = "GAME-USDC";
  }
  const [tokenAmount, setTokenAmount] = useState<TokenAmount | undefined>(undefined);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      let _contract : Contract = new Contract(contract.address, MasterABI, library);
      if(account && library) setContract(_contract.connect(getProviderOrSigner(library, account)));
      else setContract(_contract);
    };
    effect();
    return () => { mountedRef.current = false }
  }, [account, library, setContract]);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [balance, setBalance] = useState(BigNumber.from(0));
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !contract) return;
      setUserInfo(await contract.userInfo(account));
      setBalance(await contract.balanceOf(account));
      if(token) setTokenAmount(new TokenAmount(token, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setUserInfo, setBalance, setTokenAmount, account, contract, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  const onWithdraw = useTransactionCallback(contract, "withdraw", `Withdraw LP from MASTER.`);
  const [onPresentDeposit] = useModal(<MasterModal master={contract} token={token} account={account} />);
  //TODO: Use permit instead of approve. Add depositWithPermit to MASTER.
  const [approvalState, approveCallback] = useApproveCallback(tokenAmount, contract.address);
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted]);


  // import from other farm pool
  const [contract2, setContract2] = useState(new Contract("0x50ad0F743278893Ed7184F8B0272c51E88493528", MasterChefABI, library));
  const [farms, setFarms] = useState([{name: "GAME-USDC", id: 0, contract: contract2, depositTokenName: "GAME-USDC", earnTokenName: "GAME"}]);
  const farm = farms[0];
  const [pendingGame, setPendingGame] = useState(BigNumber.from(0));
  const [apr, setApr] = useState(0);
  const [dpr, setDpr] = useState(0);
  const [tokensPerDay, setTokensPerDay] = useState(BigNumber.from(0));
  const [tokensPerYear, setTokensPerYear] = useState(BigNumber.from(0));
  const [oraclePrice, setOraclePrice] = useState(BigNumber.from(0));
  const game = useGameContract(GAME?.address);
  const [userInfo2, setUserInfo2] = useState<any>(null);
  const [poolInfo2, setPoolInfo2] = useState<any>(null);
  const lpToken = useContract(poolInfo2?.lpToken, PairABI, true);
  const [newToken, setNewToken] = useState<Token | undefined>(undefined);
  const [depositPrice, setDepositPrice] = useState(BigNumber.from(0));

  useEffect(() => {
    const effect = async () =>
    {
        if(BigNumber.from(farm.id).gte(await farm.contract.poolLength())) return;
        const _poolInfo = await farm.contract.poolInfo(farm.id);
        setPoolInfo2(_poolInfo);
        if(!account) return;
        setUserInfo2(await farm.contract.userInfo(farm.id, account));
        setPendingGame(await farm.contract.pendingGame(farm.id, account));
        //setPendingGame(ethers.utils.parseEther("0.019545254223099787").mul(59));
        if (_poolInfo && farm.earnTokenName === 'GAME')
        {
          const _token = new Token(43113, _poolInfo.lpToken, 18, farm.depositTokenName, farm.depositTokenName);
          setNewToken(_token);
          if(_token)
            setTokenAmount(new TokenAmount(_token, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"));
          if(game)
          {
            const tokenPerSecond = await farm.contract.getGamePerSecondInPool(farm.id, account);
            const tokenPerHour = tokenPerSecond.mul(60).mul(60);
            const totalRewardTokensPerDay = tokenPerHour.mul(24);
            const totalRewardTokensPerYear = totalRewardTokensPerDay.mul(365);
            const totalStakingTokensInPool = _poolInfo.totalDeposited;
            if ((await game.oracle()) !== "0x0000000000000000000000000000000000000000") {
              const _oraclePrice = await game.getPrice();
              setOraclePrice(_oraclePrice);
              const totalRewardPricePerDay =
                  totalRewardTokensPerDay.mul(_oraclePrice).div(BigNumber.from(10).pow(18));
              const totalRewardPricePerYear =
                  totalRewardTokensPerYear.mul(_oraclePrice).div(BigNumber.from(10).pow(18));

              if(lpToken) {
                const totalSupply = await lpToken.totalSupply();
                //Get amount of tokenA
                let otherToken = await lpToken.token0();
                if(otherToken.toLowerCase() == game.address.toLowerCase()) otherToken = await lpToken.token1();

                // const totalSupply = await lpToken.totalSupply();
                // //Get amount of tokenA
                // const tokenSupply = await game.balanceOf(lpToken.address);
                // const priceOfToken = _oraclePrice;
                // const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(18)).div(totalSupply);
                // const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.

                const tokenSupply = await new Contract(otherToken, ERC20_ABI, library).balanceOf(lpToken.address);
                const priceOfToken = BigNumber.from(10).pow(18); //Lazy... USDC = $1
                const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(12)).mul(BigNumber.from(10).pow(18)).div(totalSupply);
                const _depositPrice = (priceOfToken.mul(tokenInLP).mul(2).div(BigNumber.from(10).pow(18))); //We multiply by 2 since half the price of the lp token is the price of each piece of the pair. So twice gives the total.
                setDepositPrice(_depositPrice);
                const totalStakingPriceInPool =
                    totalStakingTokensInPool.mul(_depositPrice).div(BigNumber.from(10).pow(18))
                const dailyAPR = (+ethers.utils.formatEther(totalRewardPricePerDay) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                const yearlyAPR = (+ethers.utils.formatEther(totalRewardPricePerYear) / +ethers.utils.formatEther(totalStakingPriceInPool)) * 100;
                setDpr(dailyAPR);
                setApr(yearlyAPR);
              }
            }
            {
              if(_poolInfo.totalDeposited.eq(0)) return; //Temp
              const tokensPerSecond = await farm.contract.getPersonalGamePerSecondInPool(farm.id, account);
              const _tokensPerDay = tokensPerSecond.mul(60).mul(60).mul(24);
              setTokensPerDay(_tokensPerDay);
              setTokensPerYear(_tokensPerDay.mul(365));
            }
          }
        }
        // return tokenContract
        //     .approve(spender, useExact ? amountToApprove.raw.toString() : MaxUint256, {
        //       gasLimit: calculateGasMargin(estimatedGas),
        //     })
        //     .then((response: TransactionResponse) => {
        //       addTransaction(response, {
        //         summary: `Approve ${amountToApprove.currency.symbol}`,
        //         approval: { tokenAddress: token.address, spender },
        //       })
        //     })
        //     .catch((error: Error) => {
        //       console.error('Failed to approve token', error)
        //       throw error
        //     })
    }
    effect();
    return () => { mountedRef.current = false }
  }, [setUserInfo2, setPoolInfo2, setPendingGame, setNewToken, setTokenAmount, farm, account, game, lpToken, refreshKey]);

  return (<div className="boxed">
    <CardBody style={{textAlign: 'center'}}>
    <TokenSymbolWrapper>
      <TokenSymbol symbol="MASTER" />
    </TokenSymbolWrapper>
    <CardTitle>MASTER Rewards Pool</CardTitle>
    <Text textAlign="center" marginBottom="40px" fontSize="14px">  
      Lock your GAME-USDC LP tokens & earn extra platform revenue in Passive GAME rewards.
    </Text>

    <CardMeta style={{marginBottom:'40px'}}>
      <GridWrap>
        <GridItem width="lg" mobile>
          <Text color="var(--extra-color-2)" fontSize="20px">{apr.toFixed(2)}%</Text>
          <Text className="textGlow" fontSize="14px">Yearly Rewards</Text>
        </GridItem>
        <GridItem width="lg" mobile>
          <Text color="var(--extra-color-2)" fontSize="20px">{dpr.toFixed(2)}%</Text>
          <Text className="textGlow" fontSize="14px">Daily Rewards</Text>
        </GridItem>
      </GridWrap>
    </CardMeta>

        <Text fontSize="36px" fontWeight="700" lineHeight="1">{formatEther4(userInfo?.depositedGameUsdc ?? 0)}</Text>
            <Text color="var(--extra-color-2)" fontSize="20px">
            ${formatEther2(((userInfo?.lockedAmount ?? BigNumber.from(0)))
              .mul(depositPrice).div(BigNumber.from(10).pow(18)))}
          </Text>
            <Text className="textGlow" fontSize="14px" marginBottom='30px'>
              GAME-USDC LP Tokens Staked
          </Text>
          <Text fontSize="36px" fontWeight="700" lineHeight="1">{formatEther4(balance)}</Text>
          <Text className="textGlow" fontSize="14px" marginBottom='30px'>
              MASTER Tokens Deposited
          </Text>

        {(balance.gt(0) && userInfo && userInfo.lockFromTime !== undefined && userInfo.lockTime !== undefined &&

          <Text fontSize="14px" marginBottom="30px">
            Available to withdraw after lock period ends
            <Question
              text={`Deposit Date: ${(new Date(userInfo.lockFromTime.toNumber() * 1000)).toString()}
Withdraw Date: ${(new Date(userInfo.lockFromTime.add(userInfo.lockTime).toNumber() * 1000)).toString()}`} />
          </Text>
        )}
        <div style={{marginTop: 'auto'}}>
          <GridWrap>
            <GridItem width="lg" mobile>
          {approvalState !== ApprovalState.APPROVED ?
              (<Button width="100%" onClick={approveCallback}
                       disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                       variant={
                         //@ts-ignore
                         approvalState === ApprovalState.APPROVED
                             ? 'success' : 'primary'}>
                Approve
              </Button>) :
              (<Button disabled={!account || !tokenAddress} onClick={onPresentDeposit} width="100%">
                Deposit
              </Button>)}
              </GridItem>
              <GridItem width="lg" mobile>
          <Button disabled={!userInfo || userInfo.lockFromTime === undefined || userInfo.lockTime === undefined || balance.eq(0) || userInfo.lockFromTime.add(userInfo.lockTime).gt(Math.ceil(new Date().getTime() / 1000))} onClick={onWithdraw} width="100%">
            Withdraw
          </Button>
          </GridItem>
          </GridWrap>
        </div>
        </CardBody>
  </div>);
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

const CardMeta = styled.div`
  position: relative;
  margin-bottom: 20px;

    &:before {
      content: "";
      position: absolute;
      width: 2px;
      height: 100%;
      background: #2ff0dd;
      background: var(--extra-color-1);
      left: 50%;
      bottom: 0;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
      box-shadow: 0 0 5px #2ff0dd;
      box-shadow: 0 0 5px var(--extra-color-1);
    }
`;