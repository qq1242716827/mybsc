import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { RowBetween } from '../../components/Row'
// import { getArkdropUserInfoByAxios } from '../../state/arkdrop/hooks'
import { getAirdropUserInfoByPost } from '../../state/arkdrop/hooks'
import { getAirdropRewardByGet } from '../../state/arkdrop/hooks'
import { useWeb3React } from '@web3-react/core'
import AirdropPoolDetails from '../../components/AirdropPoolDetails'

export const Container = styled.div`
  // margin-top: 12px;
  // padding-top: 12px;
  box-sizing: content-box;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`
const AirdropBox = styled.div`
  max-width: 700px;
  position: relative;
  padding: 40px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: #fff;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    max-width: 100%;
    padding:15px;
  `};
`
const AirdropTitle = styled.div`
  width: 100%;
  font-size: 24px;
  color: #606060;
  font-weight: 700;
  text-align: center;
  line-height: 1.5;
  margin-bottom: 40px;
`
const AirdropContent = styled.div`
  width: 100%;
  border-radius: 15px;
  border: 1px solid #eee;
  padding: 20px;
`
const ContentItemRow = styled.div`
  position: relative;
  // display: flex;
  // flex-wrap: nowrap;
  // justify-content: flex-start;
`
const ContentItemLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #606060;
  line-height: 2;
  margin-right: 10px;
`
const ContentItemValue = styled.span`
  font-size: 16px;
  color: #606060;
  line-height: 2;
`
const AirdropBtn = styled.div`
  width: 80%;
  height: 60px;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  line-height: 60px;
  font-size: 20px;
  background-color: #eee;
  border-radius: 30px;
  color: #fff;
`
const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eee;
  margin-top: 40px;
`
const MyAirdropBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-radius: 15px;
  justify-content: space-between;
  margin-top: 20px;
  align-items: baseline;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    justify-content: start;
    flex-direction: column;
    padding:15px 0;
  `};
`
const LeftCard = styled.div`
  width: 180px;
  margin-right: 20px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
    margin-right: 0px;
  `};
`
const RightCard = styled.div`
  width: 270px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width: 100%;
  `};
`
const CardTitle = styled.div`
  width: 100%;
  line-height: 1;
  border-left: 2px solid #00c6d1;
  padding: 0px 15px;
  margin: 8px 0 20px;
`
const CardBgBase = styled.div`
  width: 100%;
  background-color: #f9f9f9;
  border-radius: 15px;
`
const LeftCardItem = styled(CardBgBase)`
  height: 100px;
  padding: 10px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-content: center;
  margin-bottom: 20px;
`
const LeftCardItemLabel = styled.span`
  font-size: 14px;
  margin-right: 10px;
  line-height: 20px;
  vertical-align: middle;
`
const LeftCardItemValue = styled.span`
  font-size: 20px;
  line-height: 20px;
  vertical-align: middle;
`
const RightCardItem = styled(CardBgBase)`
  padding: 25px;
`
const AddressItem = styled.div`
  width: 50%;
  padding: 0 20px;
  text-align: center;
`
const AddressItemValue = styled.div`
  padding-bottom: 5px;
  line-height: 1;
  font-size: 20px;
  color: #00c6d1;
  font-weight: 700;
`
const AddressItemTitle = styled.div`
  line-height: 1;
  font-size: 14px;
  color: #666;
`
// const CreateInviteBtn = styled.div`
//   width: 90%;
//   margin: auto;
//   margin-top: 20px;
//   background-color: #00c6d1;
//   border-radius: 25px;
//   height: 50px;
//   color: #fff;
//   text-align: center;
//   line-height: 50px;
// `

export default function Airdrop() {
  const { t } = useTranslation()
  // const dropData2 = useArkdropUserInfo()
  //dropData 设置初始值
  const [dropData, setdropData] = useState({
    // eslint-disable-next-line @typescript-eslint/camelcase
    pool_weights: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    recommend_weights: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_airdrops_num: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    user_airdrops_usdtPrice: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    direct_push_num: 0,
    // eslint-disable-next-line @typescript-eslint/camelcase
    interpolated_num: 0
  })

  //访问接口获取空投个人数据
  const { account } = useWeb3React()
  //axios 封装使用 方法1
  // useEffect(() => {
  //   ;(async function f() {
  //     if (account) {
  //       const userAddress = shortenAddress(account)
  //       console.log('userAddress', userAddress)
  //       const url = 'http://localhost:3000/arkdrop.json'
  //       const res2 = await getArkdropUserInfoByAxios(url)
  //       console.log('res2:', res2)
  //       // setdropData(res2.airdropInfo)
  //     } else {
  //       console.log('account', account)
  //     }
  //     // const res2 = await getArkdropUserInfoByAxios('http://localhost:3000/arkdrop.json')
  //     // setdropData(res2.airdropInfo)
  //   })()
  // }, [])

  //axios 封装使用 方法2
  const fetchMyAPI = useCallback(async () => {
    if (account) {
      // const url = 'http://localhost:3000/arkdrop.json'
      const url = 'https://arkswap.org/api/user/detail'
      // const url = '/arkdrop.json'
      const params = { address: account }
      // console.log('fetchMyAPI useCallback')
      // console.log('params', params)
      // console.log('account', account)
      // const response = await getArkdropUserInfoByAxios(url, params)
      const response = await getAirdropUserInfoByPost(url, params)
      if (response && (response.errcode === 0 || response.errcode === '0') && response.airdropInfo) {
        // console.log('response airdropInfo', response.airdropInfo)
        const airdropInfo = response.airdropInfo
        // eslint-disable-next-line @typescript-eslint/camelcase
        const user_airdrops_num: number = airdropInfo.user_airdrops_num ?? 0
        // eslint-disable-next-line @typescript-eslint/camelcase
        const user_airdrops_usdtPrice: number = airdropInfo.user_airdrops_usdtPrice ?? 0
        // eslint-disable-next-line @typescript-eslint/camelcase
        airdropInfo.user_airdrops_usdtPrice = (user_airdrops_num * user_airdrops_usdtPrice).toFixed(2)
        // console.log(airdropInfo)
        setdropData(airdropInfo)
      } else {
        console.log(response.errcode)
        // console.log(response.airdropInfo)
        // console.log(response)
      }
    }
  }, [account])
  useEffect(() => {
    fetchMyAPI()
  }, [fetchMyAPI])

  //显示资金池数据
  const [poolData, setpoolData] = useState<Array<any>>()
  useEffect(() => {
    ;(async function f() {
      // console.log('userAddress', account)
      // const params = { address: account }
      // const url = 'http://localhost:3000/airdropPool.json'
      const url = 'https://arkswap.org/api/user/arkLpDetail'
      // const url = '/api/user/arkLpDetail'
      const res2 = await getAirdropRewardByGet(url)
      // console.log('res2:', res2)
      if (res2 && res2.arkLpDetail) {
        setpoolData(res2.arkLpDetail)
      }
    })()
  }, [])

  return (
    <Container>
      <AirdropBox>
        <AirdropTitle>{t('Airdrop_2st_title')}</AirdropTitle>
        <AirdropContent>
          <ContentItemRow>
            <ContentItemLabel>{t('AirdropTimeLabel')}</ContentItemLabel>
            <ContentItemValue>{t('AirdropTimeValue_2st')}</ContentItemValue>
          </ContentItemRow>
          <ContentItemRow>
            <ContentItemLabel>{t('AirdropNumLabel')}</ContentItemLabel>
            <ContentItemValue style={{ color: '#00c6d1' }}>{t('AirdropNumValue_2st')}</ContentItemValue>
          </ContentItemRow>
          <ContentItemRow>
            <ContentItemLabel>{t('AirdropConditionsLabel')}</ContentItemLabel>
            <ContentItemValue>{t('AirdropConditions_2st')}</ContentItemValue>
          </ContentItemRow>
        </AirdropContent>
        {/*<AirdropBtn>{t('AirdropStatus_2st')}</AirdropBtn>*/}

        <Separator />
        <AirdropPoolDetails arkLpDetail={poolData} />
        <Separator />

        <MyAirdropBox>
          <LeftCard>
            {/*权重信息*/}
            <CardTitle>{t('My current weights')}</CardTitle>
            <LeftCardItem>
              <div>
                <LeftCardItemLabel>{t('Pool weights')}</LeftCardItemLabel>
                <LeftCardItemValue>{dropData['pool_weights'] ?? 0}</LeftCardItemValue>
              </div>
              <div style={{ marginTop: '5px' }}>
                <LeftCardItemLabel>{t('Recommendation weighting')}</LeftCardItemLabel>
                <LeftCardItemValue>{dropData['recommend_weights'] ?? 0}</LeftCardItemValue>
              </div>
            </LeftCardItem>
          </LeftCard>
          <LeftCard>
            {/*获得空投数*/}
            <CardTitle>{t('Number of airdrops obtained')}</CardTitle>
            <LeftCardItem>
              <div>
                <LeftCardItemValue style={{ color: '#00c6d1', fontWeight: 'bold' }}>
                  {dropData['user_airdrops_num']}
                </LeftCardItemValue>
              </div>
              <div style={{ marginTop: '5px' }}>
                <LeftCardItemLabel style={{ margin: '0px' }}>
                  {t('Worth')}
                  {dropData['user_airdrops_usdtPrice']} HUSD
                </LeftCardItemLabel>
              </div>
            </LeftCardItem>
          </LeftCard>

          {/*我的推荐*/}
          <RightCard>
            <CardTitle>{t('My Recommendations')}</CardTitle>
            <RightCardItem>
              <RowBetween style={{ display: 'flex' }}>
                <AddressItem>
                  <AddressItemValue>{dropData['direct_push_num']}</AddressItemValue>
                  <AddressItemTitle>{t('Number of direct push addresses')}</AddressItemTitle>
                </AddressItem>
                <AddressItem>
                  <AddressItemValue>{dropData['interpolated_num']}</AddressItemValue>
                  <AddressItemTitle>{t('Number of interpolated addresses')}</AddressItemTitle>
                </AddressItem>
              </RowBetween>
              {/*<CreateInviteBtn>{t('CreateInviteBtn')}</CreateInviteBtn>*/}
            </RightCardItem>
          </RightCard>
        </MyAirdropBox>
      </AirdropBox>

      <AirdropBox>
        <AirdropTitle>{t('Airdrop_1st_title')}</AirdropTitle>
        <AirdropContent>
          {/*<ContentItemRow>*/}
          {/*  <ContentItemLabel>{t('AirdropTimeLabel')}</ContentItemLabel>*/}
          {/*  <ContentItemValue>{t('AirdropTimeValue_1st')}</ContentItemValue>*/}
          {/*</ContentItemRow>*/}
          <ContentItemRow>
            <ContentItemLabel>{t('AirdropNumLabel')}</ContentItemLabel>
            <ContentItemValue style={{ color: '#00c6d1' }}>{t('AirdropNumValue_1st')}</ContentItemValue>
          </ContentItemRow>
          <ContentItemRow>
            <ContentItemLabel>{t('AirdropConditionsLabel')}</ContentItemLabel>
            <ContentItemValue>{t('AirdropConditions_1st')}</ContentItemValue>
          </ContentItemRow>
        </AirdropContent>
        <AirdropBtn>{t('AirdropStatus_1st')}</AirdropBtn>
      </AirdropBox>
    </Container>
  )
}
