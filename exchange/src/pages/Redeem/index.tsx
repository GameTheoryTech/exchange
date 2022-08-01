import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import styled, { ThemeContext } from 'styled-components'
import {currencyEquals, ETHER, Pair, Token, TokenAmount, Trade} from '@gametheory/sdk'
import {Box, Button, CardBody, ChevronDownIcon, Flex, Grid, Modal, Slider, Text, useModal} from '@gametheory/uikit'
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
import RedeemerABI from '../../constants/abis/Redeemer.json'
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

interface Redeemable
{
  name: string,
  inAddress: string,
  contract: Contract,
  earnTokenName: string
  // finished: false,
  // multiplier: '7500',
  // site: "https://makerdao.com",
  // buyLink: 'https://spooky.fi/#/swap?outputCurrency=0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E',
  // sort: 0,
  // closedForStaking: true,
}

interface RedeemCardProps {
  redeemable: Redeemable;
  account: string | null | undefined;
}

interface NftRedeemCardProps {
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

const RedeemCard : React.FC<RedeemCardProps> = ({ redeemable, account }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [multiplier, setMultiplier] = useState("0");
  const [signature, setSignature] = useState("0");
  const [amountRedeemable, setAmountRedeemable] = useState(BigNumber.from(0));
  const [redeemed, setRedeemed] = useState(false);
  const [allowRedeem, setAllowRedeem] = useState(false);
  const connectedRedeemContract = useContract(redeemable.contract.address, RedeemerABI, true);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      //https://migration.gametheory.tech
      let res = await axios.post('https://migration.gametheory.tech/.netlify/functions/server/avalanche/multiplier', { address: account, token: redeemable.inAddress });
      if(res.data.amount !== "error")
      {
        const _multiplier = res.data.multiplier;
        setMultiplier(_multiplier);
        setAmountRedeemable(await redeemable.contract.redeemableAmount(redeemable.inAddress, ethers.utils.parseEther(_multiplier)));
      }
      setAllowRedeem(await redeemable.contract.allowRedeem());
      setRedeemed(await redeemable.contract.redeemedOutToken(account, redeemable.inAddress));
      res = await axios.post('https://migration.gametheory.tech/.netlify/functions/server/avalanche', { address: account, token: redeemable.inAddress });
      if(res.data.amount !== "error") setSignature(res.data.signature);
    }
    effect();
    return () => { mountedRef.current = false }
  }, [redeemable, account, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  //TODO: Use permit instead of approve. Add depositWithPermit and depositOnBehalfOfWithPermit to redeemables.
  //const [approvalState, approveCallback] = useApproveCallback(tokenAmount, redeem.contract.address);
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const onClaim = useTransactionCallback(connectedRedeemContract, "redeem", `Claim ${redeemable.earnTokenName} from ${redeemable.name} pool.`, redeemable.inAddress, multiplier ? ethers.utils.parseEther(multiplier) : BigNumber.from(0), signature);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  // useEffect(() => {
  //   if (approvalState === ApprovalState.PENDING) {
  //     setApprovalSubmitted(true)
  //   }
  // }, [approvalState, approvalSubmitted]);
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Box>{redeemable.name}</Box>
        <Box>{redeemable.earnTokenName} Redeemable: {ethers.utils.formatEther(amountRedeemable)}</Box>
        <Box>{redeemed ? "REDEEMED" : allowRedeem ? "" : "Please wait to redeem."}</Box>

        <Button disabled={redeemed || !allowRedeem || amountRedeemable.eq(0)} onClick={onClaim} my="10px" mx="5px">
          Claim
        </Button>
      </Grid>
    </Text>
  </LightCard>);
}

const NftRedeemCard : React.FC<NftRedeemCardProps> = ({ generation, account }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [ids, setIds] = useState<number[]>([]);
  const [signature, setSignature] = useState("0");
  const [redeemed, setRedeemed] = useState(false);
  const [allowRedeem, setAllowRedeem] = useState(false);
  const nftContract = useContract("0x77396e5a5b5d27dd4F22C8AdEcfa951e494f35aA", ERC721_ABI, true);
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      //https://migration.gametheory.tech
      let res = await axios.post('https://migration.gametheory.tech/.netlify/functions/server/avalanche/nft/ids', { address: account, generation: generation });
      if(res.data.amount !== "error")
      {
        setIds(res.data.ids);
      }
      if(nftContract)
      {
        const _redeemed = await nftContract.redeemed(account, generation);
        const _canRedeem = await nftContract.canRedeem(generation, res.data.ids);
        setRedeemed(_redeemed && !_canRedeem);
        setAllowRedeem(await nftContract.allowRedeem());
      }
      res = await axios.post('https://migration.gametheory.tech/.netlify/functions/server/avalanche/nft', { address: account, generation: generation });
      if(res.data.amount !== "error") setSignature(res.data.signature);
    }
    effect();
    return () => { mountedRef.current = false }
  }, [nftContract, account, refreshKey]);
  useEffect(() => {
    const interval=setInterval(()=>{
      setRefreshKey(oldKey => oldKey + 1);
    },10000)

    return()=>clearInterval(interval)
  }, [setRefreshKey]);
  //TODO: Use permit instead of approve. Add depositWithPermit and depositOnBehalfOfWithPermit to redeemables.
  //const [approvalState, approveCallback] = useApproveCallback(tokenAmount, redeem.contract.address);
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const onClaim = useTransactionCallback(nftContract, "redeem", `Claim Generation ${generation} NFTs.`, generation, ids, signature);

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  // useEffect(() => {
  //   if (approvalState === ApprovalState.PENDING) {
  //     setApprovalSubmitted(true)
  //   }
  // }, [approvalState, approvalSubmitted]);
  return (<LightCard padding="40px">
    <Text textAlign="center">
      <Grid>
        <Box>Gen {generation} VIP Pass</Box>
        <Box>{ids.length > 0 ? `Ids Redeemable: ${ids.map(id => id + 100 * generation).join(", ")}` : "No Ids Redeemable"}</Box>
        <Box>{redeemed ? "REDEEMED" : allowRedeem ? "" : "Please wait to redeem."}</Box>

        <Button disabled={redeemed || ids.length == 0} onClick={onClaim} my="10px" mx="5px">
          Claim
        </Button>
      </Grid>
    </Text>
  </LightCard>);
}

export default function Redeem() {
  const theme = useContext(ThemeContext)
  const { account, library } = useActiveWeb3React();
  const redeemablesIsLoading = false;
  const [contract, setContract] = useState(new Contract("0x434e3320235e88f5d0399B2Fba4913ef29273f3a", RedeemerABI, library));
  const [redeemables, setRedeemables] = useState([{name: "GAME", inAddress: "0x56EbFC2F3873853d799C155AF9bE9Cb8506b7817", contract: contract, earnTokenName: "GAME"}]);

  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      let _contract : Contract = new Contract(contract.address, RedeemerABI, library);
      if(account && library) setContract(_contract.connect(getProviderOrSigner(library, account)));
      else setContract(_contract);
      //const redeemables : Redeem[] = [{name: "GAME-USDC", id: 0, contract: contract, depositTokenName: "GAME-USDC.e", earnTokenName: "GAME"},{name: "GAME-WAVAX", id: 1, contract: contract, depositTokenName: "GAME-WAVAX", earnTokenName: "GAME"}];
      setRedeemables([
        {name: "GAME", inAddress: "0x56EbFC2F3873853d799C155AF9bE9Cb8506b7817", contract: _contract, earnTokenName: "GAME"},
        {name: "THEORY", inAddress: "0x60787C689ddc6edfc84FCC9E7d6BD21990793f06", contract: _contract, earnTokenName: "GAME"},
        {name: "HODL", inAddress: "0xFfF54fcdFc0E4357be9577D8BC2B4579ce9D5C88", contract: _contract, earnTokenName: "GAME"},
        {name: "MASTER", inAddress: "0x83641AA58E362A4554e10AD1D120Bf410e15Ca90", contract: _contract, earnTokenName: "GAME"},
        {name: "GAME-DAI", inAddress: "0x168e509FE5aae456cDcAC39bEb6Fd56B6cb8912e", contract: _contract, earnTokenName: "GAME-USDC"},
        {name: "THEORY-DAI", inAddress: "0xF69FCB51A13D4Ca8A58d5a8D964e7ae5d9Ca8594", contract: _contract, earnTokenName: "GAME-USDC"},
      ]);
    };
    effect();
    return () => { mountedRef.current = false }
  }, [account, library, setContract, setRedeemables]);


  return (
    <Container>
      <PageTitle style={{marginBottom: '40px'}}>
        Redeem Tokens
      </PageTitle>
      <EarnNav activeIndex={3} />
      <AppBody>
        <PageHeader
          title={"Redeem"}
          description={"Collect your tokens from the migration here."}
        >
          {/*<Button id="join-pool-button" as={Link} to="/add/AVAX">*/}
          {/*  Button*/}
          {/*</Button>*/}
        </PageHeader>
        <AutoColumn gap="lg" justify="center">
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Redeemable Tokens</Text>
                <Question
                  text={"Redeem tokens here."}
                />
              </RowBetween>
              {!account || !library ? (
                  <LightCard padding="40px">
                    <Text textAlign="center">
                      Connect to a wallet to view redeemables.
                    </Text>
                  </LightCard>
              ) : redeemablesIsLoading ? (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      <Dots>Loading</Dots>
                    </Text>
                  </LightCard>
              ) : redeemables?.length > 0 ? (
                  <>
                    {redeemables.map((redeem) => (
                        <RedeemCard key={redeem.name} redeemable={redeem} account={account} />
                    ))}
                  </>
              ) : (
                  <LightCard padding="40px">
                    <Text color="textDisabled" textAlign="center">
                      No redeemable tokens found.
                    </Text>
                  </LightCard>
              )}
              {
                  account && library &&
                  <>
                <NftRedeemCard account={account} generation={0}/>
                <NftRedeemCard account={account} generation={1}/>
                  </>
              }
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </Container>
  )
}