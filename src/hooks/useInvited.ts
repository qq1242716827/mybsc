// check if the user has been invited this address
import { useSingleCallResult } from '../state/multicall/hooks'
import { useInviteContract } from './useContract'
import { isAddress } from '../utils'

export function useUserInvited(account: string | null | undefined): string {
  const parsedAddress = isAddress(account)
  const contract = useInviteContract()
  const invited = useSingleCallResult(contract, 'queryRefer', [
    account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  ])
  return invited?.result?.[0]
}

export function useUserRefereeN(account: string | null | undefined): string {
  const parsedAddress = isAddress(account)
  const contract = useInviteContract()
  const value = useSingleCallResult(contract, 'refereeN', [
    account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  ])
  return value?.result?.[0]
}

export function useUserReferee2N(account: string | null | undefined): string {
  const parsedAddress = isAddress(account)
  const contract = useInviteContract()
  const value = useSingleCallResult(contract, 'referee2N', [
    account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  ])
  return value?.result?.[0]
}

interface Reward {
  ncicle: string
  ncircle: string
}

export function useUserUnclaimReward(account: string | null | undefined): Reward {
  const parsedAddress = isAddress(account)
  const contract = useInviteContract()
  const value = useSingleCallResult(contract, 'earned', [
    account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  ])
  return value?.result?.[0]
}

export function useUserClaimedReward(account: string | null | undefined): Reward {
  const parsedAddress = isAddress(account)
  const contract = useInviteContract()
  const value = useSingleCallResult(contract, 'paid', [
    account && parsedAddress ? account : '0x0000000000000000000000000000000000000000'
  ])
  return value?.result?.[0]
}
