import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import styled, { ThemeContext } from 'styled-components'
import {currencyEquals, ETHER, Pair, Token, TokenAmount, Trade} from '@gametheory/sdk'
import {Box, Button, CardBody, ChevronDownIcon, Flex, Grid, Modal, Slider, Text, useModal} from '@gametheory/uikit'
import CardNav from 'components/CardNav'
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
import PageHeader from "../../components/PageHeader";
import {Link} from "react-router-dom";
import MasterChefABI from '../../constants/abis/MasterChef.json';
import MasterABI from '../../constants/abis/master.json';
import ERC721_ABI from '../../constants/abis/erc721.json'
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
        _minDays = Math.ceil((await master.userInfo(account)).lockTime.toNumber() / 60 / 60 / 24);
        setMinDays(_minDays);
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
  const nftAddress = "0x5F23D5194E7cd670aA85725433bd8649Be2B63F7"
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
        <Text>Nft Id</Text>
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
  const lpToken = useTokenContract(poolInfo?.lpToken);
  const [refreshKey, setRefreshKey] = useState(0);
  const connectedFarmContract = useContract(farm.contract.address, MasterChefABI, true);
  const mountedRef = useRef(true);
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
                const tokenSupply = await game.balanceOf(lpToken.address);
                const priceOfToken = _oraclePrice;
                const tokenInLP = tokenSupply.mul(BigNumber.from(10).pow(18)).div(totalSupply);
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
  const [onPresentBoost] = useModal(<BoostModal farm={farm} token={token} account={account} />);
  const onClaim = useTransactionCallback(connectedFarmContract, "withdraw", `Claim ${farm.earnTokenName} from ${farm.name} farm.`, farm.id, 0);
  const onUnboost = useTransactionCallback(connectedFarmContract, "withdrawNft", `Withdraw Boost NFT from ${farm.name} farm.`, farm.id);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted]);
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Box>{farm.name}</Box>
          <Question
              text={`Your Daily ${farm.earnTokenName} Emissions: ${ethers.utils.formatEther(tokensPerDay)}
Your Yearly ${farm.earnTokenName} Emissions: ${ethers.utils.formatEther(tokensPerYear)}`}
          />
        </Flex>
        <Box>APR ($): {apr.toFixed(2)}%</Box>
        {/*<Box>Total Emissions Per Day ({farm.earnTokenName}): {totalTokensPerDay}</Box>*/}
        <Box>DPR ($): {dpr.toFixed(2)}%</Box>
        {/*<Box>Total Emissions Per Year ({farm.earnTokenName}): {totalTokensPerYear}</Box> removed due to confusion about what this means (it means if everyone had your boost, this would be total emissions. To be replaced with personal emissions.)*/}
        {(farm.depositTokenName === "GAME-USDC" ?
        <>
        <Box>Deposited (Total): {ethers.utils.formatEther(userInfo?.amount ?? BigNumber.from(0))} {farm.depositTokenName} ($
          {ethers.utils.formatEther(((userInfo?.amount ?? BigNumber.from(0)))
              .mul(oraclePrice).div(BigNumber.from(10).pow(18)))}
          )</Box>
        <Box>Deposited (Self): {ethers.utils.formatEther((userInfo?.amount ?? BigNumber.from(0)).sub(userInfo?.lockedAmount ?? BigNumber.from(0)))} {farm.depositTokenName} ($
          {ethers.utils.formatEther(((userInfo?.amount ?? BigNumber.from(0)).sub(userInfo?.lockedAmount ?? BigNumber.from(0)))
              .mul(oraclePrice).div(BigNumber.from(10).pow(18)))}
          )</Box>
        <Box>Deposited (MASTER): {ethers.utils.formatEther(userInfo?.lockedAmount ?? BigNumber.from(0))} {farm.depositTokenName} ($
          {ethers.utils.formatEther(((userInfo?.lockedAmount ?? BigNumber.from(0)))
              .mul(oraclePrice).div(BigNumber.from(10).pow(18)))}
          )</Box>
        </> :
        <>
        <Box>Deposited: {ethers.utils.formatEther(userInfo?.amount ?? BigNumber.from(0))} {farm.depositTokenName} ($)</Box>
        </>)
        }
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          {approvalState !== ApprovalState.APPROVED ?
          (<Button my="10px" mx="5px" onClick={approveCallback}
                   disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                   variant={
                     //@ts-ignore
                     approvalState === ApprovalState.APPROVED
                       ? 'success' : 'primary'}>
            Approve
          </Button>) :
          (<Button onClick={onPresentDeposit} my="10px" mx="5px">
            Deposit
          </Button>)}
          <Button disabled={userInfo?.amount.eq(0) ?? true} onClick={onPresentWithdraw} my="10px" mx="5px">
            Withdraw
          </Button>
        </Flex>
        <Box>Earned: {ethers.utils.formatEther(pendingGame)} {farm.earnTokenName}</Box>
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          <Button disabled={userInfo?.amount.eq(0) ?? true} onClick={onClaim} my="10px" mx="5px">
            Claim
          </Button>
          {(userInfo && userInfo.nft.addr !== "0x0000000000000000000000000000000000000000" ?
          <Button onClick={onUnboost} my="10px" mx="5px">
            Unboost
          </Button>
          : <Button disabled={!userInfo || userInfo.nft.addr !== "0x0000000000000000000000000000000000000000"} onClick={onPresentBoost} my="10px" mx="5px">
            Boost
          </Button>)}
        </Flex>
      </Grid>
    </Text>
  </LightCard>);
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
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Box>GAME Rewards</Box>
        <Box>Claimable: {ethers.utils.formatEther(totalEarned)}</Box>
        <Box>Claiming here while having MASTER available to withdraw will set your MASTER lock time to 30 days!</Box>
        <Button disabled={totalEarned.eq(0)} onClick={onClaim} my="10px" mx="5px">
          Claim
        </Button>
      </Grid>
    </Text>
  </LightCard>);
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

  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
        <Box>THEORY Rewards</Box>
        <Question
            text={`THEORY Amount Per $1 USD of GAME: 1
THEORY Total Supply: ${ethers.utils.formatEther(totalSupply)}
THEORY Balance: ${ethers.utils.formatEther(balance)}`}
        />
        </Flex>
        {/*<Box>USDC.e Claimable: {}</Box>*/}
        { redeemTaxAmounts?.length > 0 && totalRedeemTaxOutAmounts?.length > 0 &&
            (
          <>
            <Box>Total USDC Unclaimed: {ethers.utils.formatEther(totalRedeemTaxOutAmounts[0])}</Box>
            <Box>USDC Claimable: {ethers.utils.formatEther(redeemTaxAmounts[0])}</Box>
          </>
            )
        }
        <br/>
        <Box>These are rewards for buying GAME while the price is under $1. They become available once the price of GAME is over $1.</Box>
        <Button disabled={canTaxOut || !redeemTaxAmounts.some((bn) => {return bn.gt(0)})} onClick={onClaim} my="10px" mx="5px">
          Claim
        </Button>
      </Grid>
    </Text>
  </LightCard>);
}

export default function Farms() {
  const theme = useContext(ThemeContext);
  const { account, library } = useActiveWeb3React();
  const farmsIsLoading = false;
  const [contract, setContract] = useState(new Contract("0x1596490ceC2eC309aDA47c0519AbD718E47A62B2", MasterChefABI, library));
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
      <CardNav activeIndex={2} />
      <AppBody>
        <PageHeader
          title={"Earn"}
          description={"Collect rewards and deposit liquidity for rewards here."}
        >
          {/*<Button id="join-pool-button" as={Link} to="/add/AVAX">*/}
          {/*  Button*/}
          {/*</Button>*/}
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Locked Revenue Share</Text>
                <Question
                    text={"Lock up your LP for MASTER, withdraw your MASTER back to LP, or view MASTER stats here."}
                />
              </RowBetween>
              <MasterRewardCard tokenAddress={tokenAddress}/>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Automatic Rewards</Text>
                <Question
                  text={"Rewards you obtain from holding tokens or doing special actions."}
                />
              </RowBetween>
              <GameRewardCard/>
              <TheoryRewardCard/>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Manual Rewards</Text>
                <Question
                    text={"Rewards you have to deposit collateral for."}
                />
              </RowBetween>
              {!account || !library ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    Connect to a wallet to view farms.
                  </Text>
                </LightCard>
              ) : farmsIsLoading ? (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    <Dots>Loading</Dots>
                  </Text>
                </LightCard>
              ) : farms?.length > 0 ? (
                <>
                  {farms.map((farm) => (
                    <FarmCard key={farm.id} farm={farm} account={account} />
                  ))}
                </>
              ) : (
                <LightCard padding="40px">
                  <Text color="textDisabled" textAlign="center">
                    No farms found.
                  </Text>
                </LightCard>
              )}
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </Container>
  )
}

type MasterRewardProps = {
  tokenAddress: string
}

const MasterRewardCard = ({ tokenAddress } : MasterRewardProps) => {
  const { account, library } = useActiveWeb3React();
  const [contract, setContract] = useState(new Contract("0x6efab29db603590598A2ae7C9Dd68DD85343B163", MasterABI, library));
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
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Box>MASTER</Box>
        <Box>Balance: {ethers.utils.formatEther(balance)} MASTER</Box>
        <Box>Deposited LP: {ethers.utils.formatEther(userInfo?.depositedGameUsdc ?? 0)} GAME-USDC</Box>
        {
          (balance.gt(0) &&
              <>
                <Box>Deposit Date: {(new Date(userInfo.lockFromTime.toNumber() * 1000)).toString()}</Box>
                <Box>Withdraw Date: {(new Date(userInfo.lockFromTime.add(userInfo.lockTime).toNumber() * 1000)).toString()}</Box>
              </>
          )
        }
        <Flex flexDirection="row" justifyContent="center" alignItems="center">
          {approvalState !== ApprovalState.APPROVED ?
              (<Button my="10px" mx="5px" onClick={approveCallback}
                       disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                       variant={
                         //@ts-ignore
                         approvalState === ApprovalState.APPROVED
                             ? 'success' : 'primary'}>
                Approve
              </Button>) :
              (<Button disabled={!account || !tokenAddress} onClick={onPresentDeposit} my="10px" mx="5px">
                Deposit
              </Button>)}
          <Button disabled={!userInfo || balance.eq(0) || userInfo.lockFromTime.add(userInfo.lockTime).gt(Math.ceil(new Date().getTime() / 1000))} onClick={onWithdraw} my="10px" mx="5px">
            Withdraw
          </Button>
        </Flex>
      </Grid>
    </Text>
  </LightCard>);
}
