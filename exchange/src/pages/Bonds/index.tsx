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
import GameBondDepositoryABI from '../../constants/abis/GameBondDepository.json'
import GAME_ABI from '../../constants/abis/game.json'
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
import axios from "axios";

interface BondDepository
{
  depositTokenName: string,
  depositTokenDecimals: number,
  nonce: number,
  contract: Contract,
  earnTokenName: string
}
//
// interface BondPosition
// {
//   name: string,
//   inAddress: string,
//   contract: Contract,
//   earnTokenName: string
// }

interface BondCardProps {
  bondDepository: BondDepository;
  account: string | null | undefined;
}

interface NftBondCardProps {
  generation: number;
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

const BondCard : React.FC<BondCardProps> = ({ bondDepository, account }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [canUnlockAmount, setCanUnlockAmount] = useState(BigNumber.from(0));
  const [bondInfo, setBondInfo] = useState<any>(undefined);
  const connectedBondContract = useContract(bondDepository.contract.address, GameBondDepositoryABI, true);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !connectedBondContract) return;
      setBondInfo(await connectedBondContract.buyInfo(account, bondDepository.nonce));
      setCanUnlockAmount(await connectedBondContract.canUnlockAmount(account, bondDepository.nonce));
    }
    effect();
    return () => { mountedRef.current = false }
  }, [bondDepository, account, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  const onClaim = useTransactionCallback(connectedBondContract, "claim", `Claim ${bondDepository.earnTokenName} from ${bondDepository.depositTokenName}.`, bondDepository.nonce);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  // useEffect(() => {
  //   if (approvalState === ApprovalState.PENDING) {
  //     setApprovalSubmitted(true)
  //   }
  // }, [approvalState, approvalSubmitted]);
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Box>{bondDepository.depositTokenName}</Box>
        <Box>Total Vested {bondDepository.earnTokenName} : {ethers.utils.formatEther(bondInfo?.vestedGameAmount ?? BigNumber.from(0))}</Box>
        <Box>Vested {bondDepository.earnTokenName} Left: {ethers.utils.formatEther(bondInfo?.vestedGameLeft ?? BigNumber.from(0))}</Box>
        <Box>Vested {bondDepository.earnTokenName} Claimable: {ethers.utils.formatEther(canUnlockAmount)}</Box>
        <Box>Bond Ends: {new Date(bondInfo?.vestedEndTime?.toNumber() * 1000 ?? 0).toString()}</Box>

        <Button onClick={onClaim} my="10px" mx="5px">
          Claim
        </Button>
      </Grid>
    </Text>
  </LightCard>);
}

type DepositModalProps = {
  onDismiss?: () => void
  contract: Contract,
  token : Token | null | undefined,
  account : string | null | undefined
}

const defaultOnDismiss = () => null
const DepositModal = ({ onDismiss = defaultOnDismiss, contract, token, account }: DepositModalProps) => {
  const [amount, setAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");
  const [gameReceived, setGameReceived] = useState(BigNumber.from(0));
  const tokenContract = useTokenContract(token?.address);
  const onDeposit = useTransactionCallback(contract, "deposit", `Deposit ${amount} ${token?.name} for bonds.`, amount ? ethers.utils.parseEther(amount) : "0");

  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      if(!account || !tokenContract || !contract) return;
      setMaxAmount(ethers.utils.formatEther(await tokenContract.balanceOf(account)));
      setGameReceived(await contract.getTradeRate(amount ? ethers.utils.parseEther(amount) : "0"));
    };
    effect();
    return () => { mountedRef.current = false }
  }, [setMaxAmount, account, contract, tokenContract, amount]);
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
        <Text>Vested GAME Received: {ethers.utils.formatEther(gameReceived)} </Text>
      </Modal>
  );
}

export default function Bonds() {
  const theme = useContext(ThemeContext)
  const { account, library } = useActiveWeb3React();
  const bondDepositoriesIsLoading = false;
  const [contract, setContract] = useState(new Contract("0x150A50d050A7A1dF71BB54C101c6187eE942faf1", GameBondDepositoryABI, library));
  const [bondDepositories, setBondDepositories] = useState<BondDepository[]>([]);
  const [bondPeriodOver, setBondPeriodOver] = useState(true);
  const [totalUsdcDeposited, setTotalUsdcDeposited] = useState(BigNumber.from(0));
  const [maxBuyAmountInUsdc, setMaxBuyAmountInUsdc] = useState(BigNumber.from(0));
  const [gameBalance, setGameBalance] = useState(BigNumber.from(0));
  const [bondPeriodEnd, setBondPeriodEnd] = useState(new Date(0));
  const [usdc, setUsdc] = useState("");
  const [oraclePrice, setOraclePrice] = useState(BigNumber.from(0));
  const token = useToken(usdc ? usdc : undefined);
  const tokenAmount = token ? new TokenAmount(token, "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF") : undefined;
  const game = useContract(GAME?.address, GAME_ABI);

  const mountedRef = useRef(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  useEffect(() => {
    const effect = async () =>
    {
      let _contract : Contract = new Contract(contract.address, GameBondDepositoryABI, library);
      if(account && library) setContract(_contract.connect(getProviderOrSigner(library, account)));
      else setContract(_contract);
      setUsdc(await _contract.usdc());
      setTotalUsdcDeposited(await _contract.usdcDepositedForThisRound());
      setMaxBuyAmountInUsdc(await _contract.maxBuyAmountInUsdc());
      const _bondPeriodEnd = new Date((await _contract.buyEndTime()).toNumber() * 1000);
      setBondPeriodEnd(_bondPeriodEnd);
      setBondPeriodOver(new Date() > _bondPeriodEnd);
      if(game) {
        setOraclePrice(await game.getPrice());
        setGameBalance((await game.balanceOf(_contract.address)).sub(await _contract.totalGameVested()))
      }

      if(!account) return;
      const depositories : BondDepository[] = [];
      let activeNonces = await _contract.getActiveNonces(account);
      activeNonces = activeNonces.slice().sort((a, b) => {if(a.gt(b)) {
        return 1;
      } else if (a.lt(b)){
        return -1;
      } else {
        return 0;
      }});
      for(const nonce of activeNonces)
      {
        depositories.push({depositTokenName: "USDC",
            depositTokenDecimals: 18, //To 6 on mainnet
            nonce: nonce,
            contract: _contract,
            earnTokenName: "GAME"});
      }
      setBondDepositories(depositories);
    };
    effect();
    return () => { mountedRef.current = false }
  }, [account, library, game, setContract, setBondDepositories, refreshKey]);
  const [onPresentDeposit] = useModal(<DepositModal contract={contract} token={token} account={account} />);
  const [approvalState, approveCallback] = useApproveCallback(tokenAmount, contract.address);
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false);
  useEffect(() => {
    if (approvalState === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approvalState, approvalSubmitted]);

  return (
    <Container>
      <CardNav activeIndex={4} />
      <AppBody>
        <PageHeader
          title={"Bonds"}
          description={"Collect GAME at a discount without slippage."}
        >
          {/*<Button id="join-pool-button" as={Link} to="/add/AVAX">*/}
          {/*  Button*/}
          {/*</Button>*/}
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Bond Depository</Text>
                <Question
                  text={"Purchase bonds here."}
                />
              </RowBetween>
              <LightCard padding="40px">
                <Text textAlign="center">
                  <Grid>
                    <Box>USDC Bonds</Box>
                    { bondPeriodOver ?
                        (
                      <Box>Bond Period Over</Box>)
                        :
                        ( <>
                      <Box>USDC Deposited: {formatUSDC4(totalUsdcDeposited)}/{formatUSDC4(maxBuyAmountInUsdc)}</Box>
                      <Box>GAME Available To Purchase: {ethers.utils.formatEther(gameBalance)}</Box>
                      <Box>Bond Period Ends: {bondPeriodEnd.toString()}</Box>
                      <Box>Bond Price: ${formatEther2(oraclePrice.mul(8).div(10))}</Box>
                      <Box>Vested for: 7 days</Box>
                        </>)
                    }

                    {approvalState !== ApprovalState.APPROVED ?
                        (<Button my="10px" mx="5px" onClick={approveCallback}
                                 disabled={approvalState !== ApprovalState.NOT_APPROVED || approvalSubmitted}
                                 variant={
                                   //@ts-ignore
                                   approvalState === ApprovalState.APPROVED
                                       ? 'success' : 'primary'}>
                          Approve
                        </Button>) :
                        (<Button disabled={bondPeriodOver || totalUsdcDeposited.eq(maxBuyAmountInUsdc)} onClick={onPresentDeposit} my="10px" mx="5px">
                          Purchase
                        </Button>)}
                  </Grid>
                </Text>
              </LightCard>
              {!account || !library ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      Connect to a wallet to view active bonds.
                    </Text>
                  </LightCard>
              ) : bondDepositoriesIsLoading ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      <Dots>Loading</Dots>
                    </Text>
                  </LightCard>
              ) : bondDepositories?.length > 0 ? (
                  <>
                    {bondDepositories.map((bond) => (
                        <BondCard key={bond.nonce} bondDepository={bond} account={account} />
                    ))}
                  </>
              ) : (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      No active bonds found. Please buy one above.
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