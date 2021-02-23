// check if the user has been invited this address
import { useSingleCallResult, useSingleContractMultipleData } from '../state/multicall/hooks'
import { useInviteContract } from './useContract'
import { calculateGasMargin, getRouterContract } from '../utils'
import { useActiveWeb3React } from './index'
import BigNumber from 'bignumber.js'
import { ZERO_ADDRESS } from '../constants'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useEffect, useState } from 'react'
export function useJoinCallback(account) {
  const { library, chainId } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const contract = useInviteContract()

  const joinCallback = async function() {
    if (!account || !library || !chainId || !contract) return
    console.log('joinCallback', contract)
    const args = [account]
    return contract.estimateGas['join'](...args, {}).then(estimatedGasLimit => {
      return contract.join(...args, { value: null, gasLimit: calculateGasMargin(estimatedGasLimit) }).then(response => {
        addTransaction(response, {
          summary: `JOIN ${account}`,
          claim: { recipient: account }
        })
        return response.hash
      })
    })
  }

  return { joinCallback }
}

export function useNArkJoinAble() {
  const { account, chainId, library } = useActiveWeb3React()
  const routerContract = getRouterContract(chainId, library, account)
  const ArkContract = useInviteContract()
  const [invited, setInvited] = useState(false)
  const [swapMore, setSwapMore] = useState(false)
  console.log(ArkContract)

  useEffect(() => {
    if (account) {
      routerContract.swapAmountOf(account).then(res => {
        console.log('account', res.toString())
        const less =
          new BigNumber(res.toString()).isGreaterThan('1000000000000000000') ||
          new BigNumber(res.toString()).isEqualTo('1000000000000000000')
        setSwapMore(less)
      })
      ArkContract.refererOf(account).then(res => {
        setInvited(res && res !== ZERO_ADDRESS)
      })
    }
  }, [account, ArkContract, routerContract])
  return { invited, swapMore }
}

export function useNArk() {
  const { account } = useActiveWeb3React()
  const contract = useInviteContract()
  const [id, setID] = useState(0)

  // const circleQuery = useSingleCallResult(ArkContract, 'balanceOf', [
  //   account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  // ])
  // console.log('circleQuery', circleQuery)
  // const circle = circleQuery?.result?.[0].toString()
  // console.log('circle', circle)
  useEffect(() => {
    if (account && contract) {
      contract.balanceOf(account).then(res => {
        console.log('ecircle id', res.toString())
        setID(res.toString() ?? '')
      })
    }
  }, [account, contract])
  return id
}

export function useJoinNArk() {
  const { account } = useActiveWeb3React()
  const contract = useInviteContract()
  const [id, setID] = useState(0)
  useEffect(() => {
    if (account && contract) {
      contract.circleOf(account).then(res => {
        console.log('join circle id', res.toString())

        setID(res.toString() ?? '')
      })
    }
  }, [account, contract])
  return id
}

export function useArkCount() {
  const contract = useInviteContract()
  const res = useSingleCallResult(contract, 'totalSupply')
  if (res.result && !res.loading) {
    return parseInt(res.result[0])
  }
  return undefined
}

export function useAllArkData() {
  const circleCount = useArkCount()
  const contact = useInviteContract()

  const circleIndexes = []
  for (let i = 1; i < (circleCount ?? 0); i++) {
    circleIndexes.push([i])
  }
  console.log('circleIndexes--->', circleIndexes)

  const circles = useSingleContractMultipleData(contact, 'tokenByIndex', circleIndexes)
  console.log('circles', circles)

  const nameIndexes = circles
    .map(item => {
      return item && [item.result?.[0].toString()]
    })
    .filter(item => {
      return item[0]
    })
  console.log('nameindexs', nameIndexes)
  const circleNames = useSingleContractMultipleData(contact, 'tokenURI', nameIndexes)
  return circleNames
    .map(item => {
      return item && item.result?.[0].toString()
    })
    .filter(item => {
      return item
    })
}
