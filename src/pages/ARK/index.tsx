import React from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { LightCard } from '../../components/Card'
// import { ARKTabs } from '../../components/NavigationTabs'
import { AutoRow, RowBetween } from '../../components/Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../../components/QuestionHelper'
// import { ReactComponent as LogoArk } from '../../assets/svg/swapLogo.svg'
import { useUserClaimedReward, useUserReferee2N, useUserRefereeN, useUserUnclaimReward } from '../../hooks/useArkSwap'
import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'

export const Container = styled.div`
  // margin-top: 12px;
  // padding-top: 12px;
  box-sizing: content-box;
`

const BodyHeader = styled.div`
  width: 100%;
  height: 48px;
  // border-radius: 14px 14px 0px 0px;
  // background: ${({ theme }) => theme.primary1};
  // background: #fff;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 40px 41px 20px;
  font-size:24px;
`
const BlockBox = styled.div`
  width: 210px;
  height: 150px;
  background-color: #f9f9f9;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
  border-radius: 15px;
`

const ComingSoon = styled(LightCard)`
  border: 1px solid #888888;
  background-color: ${({ theme }) => theme.bg3};
`
const BlockAddressesNum = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
`
const BlockAddressesTitle = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 16px;
  color: #666;
`
const BlockAddressesTotal = styled.div`
  width: 100%;
  height: 48px;
  text-align: center;
  font-size: 18px;
  color: #666;
  border-radius: 15px;
  line-height: 48px;
  text-align: center;
  color: #fff;
`

export default function ARK() {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const refereeN = useUserRefereeN(account)
  const referee2N = useUserReferee2N(account)
  const unclaimReward = useUserUnclaimReward(account)
  const claimedReward = useUserClaimedReward(account)
  return (
    <Container>
      <AutoColumn gap="lg">
        {/*<LightCard style={{ padding: '0.5rem 2rem' }}>*/}
        {/* <ARKTabs />*/}
        {/*</LightCard>*/}
        <RowBetween style={{ display: 'flex' }}>
          <LightCard
            style={{
              minWidth: 'auto',
              padding: 0,
              marginRight: 15,
              boxShadow: ' 0px 1px 10px 0px rgba(0, 0, 0, 0.05)',
              borderRadius: '5px'
            }}
          >
            <BodyHeader>
              {t('airdropWeight')}
              <QuestionHelper text={t('narkreward')} />
            </BodyHeader>
            <AutoColumn gap="lg" style={{ width: '520px', padding: 40 }}>
              <AutoRow justify={'center'}>
                <BlockBox style={{ marginRight: '15px' }}>
                  <BlockAddressesNum style={{ color: '#00c6d1' }}>
                    {refereeN ? refereeN.toString() : '**'}
                  </BlockAddressesNum>
                  <BlockAddressesTitle>{t('parentBlockAddresses')}</BlockAddressesTitle>
                </BlockBox>
                <BlockBox>
                  <BlockAddressesNum style={{ color: '#00c6d1' }}>
                    {referee2N ? referee2N.toString() : '**'}
                  </BlockAddressesNum>
                  <BlockAddressesTitle>{t('uncleBlockAddresses')}</BlockAddressesTitle>
                </BlockBox>
              </AutoRow>
              <AutoRow>
                <BlockAddressesTotal style={{ backgroundColor: '#00c6d1' }}>
                  100000 {t('numberOfAirdrops')}
                </BlockAddressesTotal>
              </AutoRow>
            </AutoColumn>
          </LightCard>
          <LightCard
            style={{
              padding: 0,
              marginLeft: 15,
              boxShadow: ' 0px 1px 10px 0px rgba(0, 0, 0, 0.05)',
              borderRadius: '5px'
            }}
          >
            <BodyHeader>
              {t('liquidityMiningRewards')}
              <QuestionHelper text={t('earkreward')} />
            </BodyHeader>

            <AutoColumn gap="lg" style={{ width: '520px', padding: 40 }}>
              <AutoRow justify={'center'}>
                <BlockBox style={{ marginRight: '15px' }}>
                  <BlockAddressesNum style={{ color: '#ff5a75' }}>
                    {unclaimReward ? unclaimReward.toString() : '**'}
                  </BlockAddressesNum>
                  <BlockAddressesTitle>{t('Unclaimed')}</BlockAddressesTitle>
                </BlockBox>
                <BlockBox>
                  <BlockAddressesNum style={{ color: '#ff5a75' }}>
                    {claimedReward ? claimedReward.toString() : '**'}
                  </BlockAddressesNum>
                  <BlockAddressesTitle>{t('claimed')}</BlockAddressesTitle>
                </BlockBox>
              </AutoRow>
              <AutoRow>
                <BlockAddressesTotal style={{ backgroundColor: '#ff5a75' }}>
                  {t('ownComputingPower')}
                </BlockAddressesTotal>
              </AutoRow>
            </AutoColumn>

            {/*<AutoColumn gap="lg" style={{ width: 388, padding: 36 }}>*/}
            {/*<AutoRow>*/}
            {/*<TYPE.black fontWeight={500} fontSize={13}>*/}
            {/*{t('ownComputingPower')}:*/}
            {/*</TYPE.black>*/}
            {/*<TYPE.black fontWeight={500} fontSize={16}></TYPE.black>*/}
            {/*</AutoRow>*/}
            {/*<AutoRow>*/}
            {/*<TYPE.black fontWeight={500} fontSize={13}>*/}
            {/*{t('Unclaimed')}:*/}
            {/*</TYPE.black>*/}
            {/*<TYPE.black style={{ padding: 0, marginLeft: 15 }} fontWeight={500} fontSize={16}>*/}
            {/*{unclaimReward ? unclaimReward.toString() : '**'}*/}
            {/*</TYPE.black>*/}
            {/*</AutoRow>*/}
            {/*<AutoRow>*/}
            {/*<TYPE.black fontWeight={500} fontSize={13}>*/}
            {/*{t('claimed')}:*/}
            {/*</TYPE.black>*/}
            {/*<TYPE.black style={{ padding: 0, marginLeft: 15 }} fontWeight={500} fontSize={16}>*/}
            {/*{claimedReward ? claimedReward.toString() : '**'}*/}
            {/*</TYPE.black>*/}
            {/*</AutoRow>*/}
            {/*</AutoColumn>*/}
          </LightCard>
        </RowBetween>

        {/*<LightCard>*/}
        {/*<RowBetween style={{ padding: '34px 168px' }}>*/}
        {/*<LogoArk />*/}
        {/*<TYPE.largeHeader fontWeight={500} fontSize={35}>*/}
        {/*0CIR*/}
        {/*</TYPE.largeHeader>*/}
        {/*</RowBetween>*/}
        {/*</LightCard>*/}

        <TYPE.black fontWeight={500} fontSize={16}>
          {t('comingSoon')}:
        </TYPE.black>
        <RowBetween>
          <ComingSoon style={{ marginRight: 15 }}>
            <AutoColumn gap="lg">
              <TYPE.coming fontWeight={500} fontSize={16}>
                {t('extraSwapRewards')}：**
              </TYPE.coming>
              <TYPE.coming fontWeight={500} fontSize={16}>
                {t('ownSwapRewards')}：**
              </TYPE.coming>
              <TYPE.coming fontWeight={500} fontSize={16}>
                {t('nArkBonus')}：**
              </TYPE.coming>
            </AutoColumn>
          </ComingSoon>
          <ComingSoon style={{ marginLeft: 15, height: '100%' }}>
            <TYPE.coming fontWeight={500} fontSize={16}>
              UBI 1.0：**
            </TYPE.coming>
          </ComingSoon>
        </RowBetween>
      </AutoColumn>
    </Container>
  )
}
