import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair, JSBI } from '@uniswap/sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
// import { StyledInternalLink, ExternalLink, TYPE, HideSmall } from '../../theme'
import { StyledInternalLink, TYPE } from '../../theme'
import { Text } from 'rebass'
import Card from '../../components/Card'
// import { RowBetween, RowFixed } from '../../components/Row'
import { RowBetween } from '../../components/Row'
import { ButtonPrimary, ButtonSecondary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import { Dots } from '../../components/swap/styleds'
// import { CardSection, DataCard, CardNoise, CardBGImage } from '../../components/earn/styled'
import { CardSection, DataCard, CardBGImage } from '../../components/earn/styled'
import { useStakingInfo } from '../../state/stake/hooks'
import { BIG_INT_ZERO } from '../../constants'
import { useTranslation } from 'react-i18next'

const PageWrapper = styled(AutoColumn)`
  // max-width: 640px;
  max-width: 700px;
  width: 100%;
`

const VoteCard = styled(DataCard)`
  // background: radial-gradient(76.02% 75.41% at 1.84% 0%, #27ae60 0%, #000000 100%);
  background: none;
  overflow: hidden;
`

// const TitleRow = styled(RowBetween)`
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     flex-wrap: wrap;
//     gap: 12px;
//     width: 100%;
//     flex-direction: column-reverse;
//   `};
// `
//
// const ButtonRow = styled(RowFixed)`
//   gap: 8px;
//   ${({ theme }) => theme.mediaWidth.upToSmall`
//     width: 100%;
//     flex-direction: row-reverse;
//     justify-content: space-between;
//   `};
// `

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  // width: fit-content;
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    // width: 48%;
  `};
`

const ResponsiveButtonSecondary = styled(ButtonSecondary)`
  // width: fit-content;
  width: 100%;
  border-radius: 5px;
  font-size: 18px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    // width: 48%;
  `};
`

const EmptyProposals = styled.div`
  border: 1px solid ${({ theme }) => theme.text4};
  padding: 16px 12px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  // show liquidity even if its deposited in rewards contract
  const stakingInfo = useStakingInfo()
  const stakingInfosWithBalance = stakingInfo?.filter(pool => JSBI.greaterThan(pool.stakedAmount.raw, BIG_INT_ZERO))
  const stakingPairs = usePairs(stakingInfosWithBalance?.map(stakingInfo => stakingInfo.tokens))

  // remove any pairs that also are included in pairs with stake in mining pool
  const v2PairsWithoutStakedAmount = allV2PairsWithLiquidity.filter(v2Pair => {
    return (
      stakingPairs
        ?.map(stakingPair => stakingPair[1])
        .filter(stakingPair => stakingPair?.liquidityToken.address === v2Pair.liquidityToken.address).length === 0
    )
  })

  //引入多语言
  const { t } = useTranslation()

  return (
    <>
      <PageWrapper>
        <SwapPoolTabs active={'pool'} />
        <VoteCard>
          <CardBGImage />
          {/*<CardNoise />*/}
          <CardSection>
            <AutoColumn gap="md">
              <RowBetween>
                <TYPE.white fontSize={20} fontWeight={600}>
                  {t('Liquidity provider rewards')}
                </TYPE.white>
              </RowBetween>
              <RowBetween>
                <TYPE.white fontSize={16}>{t('Liquidity provider rewards tip')}</TYPE.white>
              </RowBetween>
              {/*<ExternalLink*/}
              {/*  style={{ color: 'white', textDecoration: 'underline' }}*/}
              {/*  target="_blank"*/}
              {/*  href="https://uniswap.org/docs/v2/core-concepts/pools/"*/}
              {/*>*/}
              {/*  <TYPE.white fontSize={16}>Read more about providing liquidity</TYPE.white>*/}
              {/*</ExternalLink>*/}
            </AutoColumn>
          </CardSection>
          {/*<CardBGImage />*/}
          {/*<CardNoise />*/}
        </VoteCard>

        <AutoColumn gap="lg" justify="center" style={{ padding: '30px 0' }}>
          <AutoColumn
            gap="lg"
            style={{
              width: '100%',
              border: '1px solid #eee',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0px  4px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            <AutoColumn gap="lg" style={{ width: '100%' }}>
              <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'center', color: '#666' }}>
                {t('Your liquidity')}
              </TYPE.mediumHeader>
            </AutoColumn>
            <AutoColumn gap="lg" style={{ width: '100%' }}>
              <ResponsiveButtonSecondary as={Link} padding="16px 18px" to="/create/ETH">
                {t('Create a pair')}
              </ResponsiveButtonSecondary>
            </AutoColumn>
            <AutoColumn gap="lg" style={{ width: '100%' }}>
              <ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="16px 18px" to="/add/ETH">
                <Text fontWeight={500} fontSize={18}>
                  {t('Add Liquidity')}
                </Text>
              </ResponsiveButtonPrimary>
            </AutoColumn>
            {/*<TitleRow style={{ marginTop: '1rem' }} padding={'0'}>*/}
            {/*<HideSmall>*/}
            {/*<TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>*/}
            {/*Your liquidity*/}
            {/*</TYPE.mediumHeader>*/}
            {/*</HideSmall>*/}
            {/*<ButtonRow>*/}
            {/*<ResponsiveButtonSecondary as={Link} padding="6px 8px" to="/create/ETH">*/}
            {/*Create a pair*/}
            {/*</ResponsiveButtonSecondary>*/}
            {/*<ResponsiveButtonPrimary id="join-pool-button" as={Link} padding="6px 8px" to="/add/ETH">*/}
            {/*<Text fontWeight={500} fontSize={16}>*/}
            {/*Add Liquidity*/}
            {/*</Text>*/}
            {/*</ResponsiveButtonPrimary>*/}
            {/*</ButtonRow>*/}
            {/*</TitleRow>*/}

            {!account ? (
              <Card padding="40px">
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('ViewLiquidityTip')}
                </TYPE.body>
              </Card>
            ) : v2IsLoading ? (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  <Dots>Loading</Dots>
                </TYPE.body>
              </EmptyProposals>
            ) : allV2PairsWithLiquidity?.length > 0 || stakingPairs?.length > 0 ? (
              <>
                <ButtonSecondary>
                  <RowBetween>
                    {/*<ExternalLink href={'https://uniswap.info/account/' + account}>*/}
                    {/*  {t('账户分析和应计费用')}*/}
                    {/*</ExternalLink>*/}
                    <span> ↗</span>
                  </RowBetween>
                </ButtonSecondary>
                {v2PairsWithoutStakedAmount.map(v2Pair => (
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                ))}
                {stakingPairs.map(
                  (stakingPair, i) =>
                    stakingPair[1] && ( // skip pairs that arent loaded
                      <FullPositionCard
                        key={stakingInfosWithBalance[i].stakingRewardAddress}
                        pair={stakingPair[1]}
                        stakedBalance={stakingInfosWithBalance[i].stakedAmount}
                      />
                    )
                )}
              </>
            ) : (
              <EmptyProposals>
                <TYPE.body color={theme.text3} textAlign="center">
                  {t('NoLiquidity')}
                </TYPE.body>
              </EmptyProposals>
            )}

            <AutoColumn justify={'flex-start'} gap="md">
              <Text textAlign="left" fontSize={14} style={{ padding: '.5rem 0 .5rem 0' }}>
                {hasV1Liquidity ? t('MigrateImportTip1') : t('MigrateImportTip2')}{' '}
                <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                  {hasV1Liquidity ? t('Migrate now') : t('Import it')}
                </StyledInternalLink>
              </Text>
            </AutoColumn>
          </AutoColumn>
        </AutoColumn>
      </PageWrapper>
    </>
  )
}
