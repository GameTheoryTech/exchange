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
import AltergeneABI from '../../constants/abis/Altergene.json'
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

type ClaimModalProps = {
  onDismiss?: () => void
  contract: Contract,
  account : string | null | undefined,
  nftAddress : string
}
const defaultOnDismiss = () => null

const ClaimModal = ({ onDismiss = defaultOnDismiss, contract, account, nftAddress }: ClaimModalProps) => {
  const [nftId, setNftId] = useState("1");
  //const nftContract = useContract(nftAddress, ERC721_ABI, true);
  const [approved, setApproved] = useState(false);
  const [owned, setOwned] = useState(false);
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

    };
    effect();
    return () => { mountedRef.current = false }
  }, [setApproved, setOwned, account, contract, nftId, refreshKey]);

  const onClaim = useTransactionCallback(contract, "claimCredits", `Claim NFT ID ${nftId} for 5 Altergene Credits.`, nftAddress, nftId ? nftId : "0");

  return (
      <Modal title="Claim" onDismiss={onDismiss}>
        <Text>Nft Id</Text>
        <InputPanel id="claim-input-token">
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
        <Button onClick={() => {onClaim(); onDismiss();}} my="10px" mx="5px">
          Claim
        </Button>
      </Modal>
  )
}

export default function AltergeneClaim() {
  const theme = useContext(ThemeContext)
  const nftAddress = "0xBbD9786f178e2AEBb4b4329c41A821921ca05339"
  const nftAddress2 = "0xB4e8ae04dDA4509f4246D01e2801b98484D40134"
  const nftContract = useContract(nftAddress, ERC721_ABI, true);
  const nftContract2 = useContract(nftAddress2, ERC721_ABI, true);
  const { account, library } = useActiveWeb3React();
  const redeemablesIsLoading = false;
  const [contract, setContract] = useState(new Contract("0xfccFA7C523A91d3E6E72E0Fa68Df01E4aE1e6173", AltergeneABI, library));
  const [maxNum, setMaxNum] = useState(BigNumber.from(0));
  const [maxNum2, setMaxNum2] = useState(BigNumber.from(0));
  const mountedRef = useRef(true);
  useEffect(() => {
    const effect = async () =>
    {
      let _contract: Contract = new Contract(contract.address, AltergeneABI, library);
      if (account && library) setContract(_contract.connect(getProviderOrSigner(library, account)));
      else setContract(_contract);
      if(nftContract) setMaxNum(await nftContract.balanceOf(account));
      if(nftContract2) setMaxNum2(await nftContract2.balanceOf(account));
    }
    effect();
    return () => { mountedRef.current = false }
  }, [account, library, nftContract, setContract, setMaxNum]);

  const [onPresentClaim] = useModal(<ClaimModal contract={contract} account={account} nftAddress={nftAddress} />);
  const onClaim = useTransactionCallback(contract, "claimAll", `Claim all owned NFTs for 5 Altergene Credits each.`, nftAddress, 0, maxNum);
  const [onPresentClaim2] = useModal(<ClaimModal contract={contract} account={account} nftAddress={nftAddress2} />);
  //const onClaim2 = useTransactionCallback(contract, "claimAll", `Claim all owned NFTs for 5 Altergene Credits each.`, nftAddress2, 0, maxNum2);

  return (
    <Container>
      <CardNav activeIndex={6} />
      <AppBody>
        <PageHeader
          title={"Altergene Claim"}
          description={"Claim Altergene Credits here."}
        >
          {/*<Button id="join-pool-button" as={Link} to="/add/AVAX">*/}
          {/*  Button*/}
          {/*</Button>*/}
        </PageHeader>
        <AutoColumn justify="center">
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Notorious PIG</Text>
                <Question
                    text={"Claim Altergene Credits with Notorious PIG NFTs here."}
                />
              </RowBetween>
              {
                  account && library &&
                  <>
                    <LightCard padding="40px">
                      <Flex flexDirection="row" justifyContent="center" alignItems="center">
                        <Button disabled={!account} onClick={onPresentClaim2} my="10px" mx="5px">
                          Claim One
                        </Button>
                        {/*<Button disabled={!account} onClick={onClaim2} my="10px" mx="5px">*/}
                        {/*  Claim All*/}
                        {/*</Button>*/}
                      </Flex>
                    </LightCard>
                  </>
              }
            </AutoColumn>
          </CardBody>
          <CardBody style={{ width: '100%' }}>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color={theme.colors.text}>Vending Machine</Text>
                <Question
                  text={"Claim Altergene Credits with Vending Machine NFTs here."}
                />
              </RowBetween>
              {
                  account && library &&
                  <>
                    <LightCard padding="40px">
                      <Flex flexDirection="row" justifyContent="center" alignItems="center">
                        <Button disabled={!account} onClick={onPresentClaim} my="10px" mx="5px">
                          Claim One
                        </Button>
                        <Button disabled={!account} onClick={onClaim} my="10px" mx="5px">
                          Claim All
                        </Button>
                      </Flex>
                    </LightCard>
                  </>
              }
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </Container>
  )
}