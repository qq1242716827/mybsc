import React, { useState } from 'react'
import styled from 'styled-components'
import { AutoColumn } from '../../components/Column'
import { useTranslation } from 'react-i18next'
import { AlertTriangle } from 'react-feather'
import { AutoRow, RowBetween } from '../../components/Row'
import { Button, CloseIcon, TYPE } from '../../theme'
import { ButtonBlue } from '../../components/Button'
import JoinEArkModal from '../../components/EArk/JoinEArkModal'
import { useJoinNArk, useNArkJoinAble, useNArk } from '../../hooks/useNArk'
import BigNumber from 'bignumber.js'

const PageWrapper = styled(AutoColumn)`
  width: 800px;
  padding: 38px 169px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  position: relative;
  background-color: ${({ theme }) => theme.bg1};
`

const TipFrame = styled(AutoColumn)`
  border-radius: 14px;
  padding-top: 19px;
  padding-bottom: 24px;
  background-color: ${({ theme }) => theme.bg1};
`

export default function EArk({ history }) {
  console.log('eark----------------->')
  const { t } = useTranslation()
  const able = useNArkJoinAble()
  const ark = useNArk()
  const JoinArk = useJoinNArk()
  console.log('ark------->', ark)
  console.log('JoinArk------->', JoinArk)
  console.log('able------->', able)

  const [showJoinEArkModal, setShowJoinEArkModal] = useState(false)
  //const allCircles = useAllCircleData()

  return (
    <PageWrapper>
      <CloseIcon
        onClick={() => {
          history.push('/invite')
        }}
        style={{ top: 12 }}
      />
      <AutoColumn gap="lg" justify="center">
        <TipFrame gap="md">
          <TYPE.mediumHeader fontSize={14}>创建或加入EArk前，您需要满足以下两个条件：</TYPE.mediumHeader>

          <AutoRow style={{ display: 'flex', alignItems: 'center' }}>
            <AlertTriangle color={able.invited ? '#30D683' : '#FF7238'} />
            <TYPE.main fontSize={14} marginLeft={10}>
              1. 先创建NArk；
            </TYPE.main>
          </AutoRow>

          <AutoRow style={{ display: 'flex', alignItems: 'center' }}>
            <AlertTriangle color={able.swapMore ? '#30D683' : '#FF7238'} />
            <TYPE.main fontSize={14} marginLeft={10}>
              2. 交易额不低于100HT等值金额；
            </TYPE.main>
          </AutoRow>
        </TipFrame>

        {new BigNumber(ark).isGreaterThan(0) || new BigNumber(JoinArk).isGreaterThan(0) ? (
          <RowBetween style={{ marginTop: 64, rowGap: '19' }} gap="19px">
            <Button
              onClick={() => {
                history.push('/myeark')
              }}
            >
              {t('myEArk')}
            </Button>
          </RowBetween>
        ) : (
          <RowBetween style={{ marginTop: 64, rowGap: '19' }} gap="19px">
            <Button
              disabled={
                !able.invited ||
                !able.swapMore ||
                new BigNumber(ark).isGreaterThan(0) ||
                new BigNumber(JoinArk).isGreaterThan(0)
              }
              style={{ width: '46%' }}
              onClick={() => {
                history.push('/eark/create')
              }}
            >
              {t('createEArk')}
            </Button>
            <Button
              disabled={
                !able.invited ||
                !able.swapMore ||
                new BigNumber(ark).isGreaterThan(0) ||
                new BigNumber(JoinArk).isGreaterThan(0)
              }
              style={{ width: '46%' }}
              onClick={() => {
                setShowJoinEArkModal(true)
              }}
            >
              {t('joinEArk')}
            </Button>
          </RowBetween>
        )}

        <ButtonBlue
          disabled={!(ark > 0) && !(JoinArk > 0)}
          onClick={() => {
            history.push('/stake')
          }}
        >
          {t('stakeMyLPT')}
        </ButtonBlue>

        {/*{myCircle.id && (*/}
        {/*  <TYPE.main fontSize={14}>*/}
        {/*    {t('check')} <Link to="/myecircle">{t('eCircle')}</Link>*/}
        {/*  </TYPE.main>*/}
        {/*)}*/}

        <TYPE.main fontSize={13} marginTop={24}>
          {t('note')}
        </TYPE.main>
      </AutoColumn>
      <JoinEArkModal
        isOpen={showJoinEArkModal}
        address={''}
        onDismiss={() => {
          setShowJoinEArkModal(false)
        }}
      />
    </PageWrapper>
  )
}
