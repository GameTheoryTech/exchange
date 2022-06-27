import { ChainId } from '@gametheory/sdk'
import MULTICALL_ABI from './abi.json'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0xed386Fe855C1EFf2f843B910923Dd8846E45C5A4', // TODO
  [ChainId.TESTNET]: '0x3D015943d2780fE97FE3f69C97edA2CCC094f78c'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
