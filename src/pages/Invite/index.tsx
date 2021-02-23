import React, { useContext, useEffect, useState } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { AutoColumn } from '../../components/Column'
import { useUserInvited } from '../../hooks/useInvited'
import { useTranslation } from 'react-i18next'
import AddressInviteModal from '../../components/invite/AddressInviteModal'
import { CloseIcon, CustomLightSpinner, TYPE } from '../../theme'
import { useActiveWeb3React } from '../../hooks'
import { ZERO_ADDRESS } from '../../constants'
import QuestionHelper from '../../components/QuestionHelper'
import Modal from '../../components/Modal'
// import earkswapBg from '../../assets/swap_images/e_ark.jpg'
// import narkswapBg from '../../assets/swap_images/n_ark.jpg'

import {
  AccountControl,
  AccountGroupingRow,
  AccountSection,
  AddressLink,
  CloseColor,
  HeaderRow,
  InfoCard,
  UpperSection,
  YourAccount
} from '../../components/CircleDetail'
import { getEtherscanLink } from '../../utils'
import Copy from '../../components/AccountDetails/Copy'
import { ExternalLink as LinkIcon } from 'react-feather'
import Circle from '../../assets/images/blue-loader.svg'
import uImage from '../../assets/swap_images/big_swapcorn.jpg'

const PageWrapper = styled(AutoColumn)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      flex-direction: column;
  `};
`

const CircleCard = styled.div`
  max-width: 720px;
  width: 100%;
  padding: 59px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 60px;
  height: 300px;
  border-radius: 20px;
  cursor: pointer;
  color: transparent;
  position: relative;

  ${({ theme }) => theme.mediaWidth.upToSmall`
      width: 90%;
      height: 250px;
  `};
`

const InviteCard = styled(CircleCard)`
  // background: url(${uImage});
  background-color: #00c6D1;
`

// const CCircle = styled(CircleCard)`
//   background-image: url(${narkswapBg});
// `

const HelperFrame = styled.div`
  position: absolute;
  left: auto;
  right: 30px;
  top: 30px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    right: 12px;
    top: 12px;
  `};
`

export const CardBGImage = styled.span<{ desaturate?: boolean }>`
  background: url(${uImage});
  background-size:cover;
  width: 900px;
  height: 400px;
  position: absolute;
  border-radius: 12px;
  // top:0;
  // left:0;
  // opacity: 0.4;
  top: -100px;
  left: -50px;
  // transform: rotate(-15deg);
  // user-select: none;
  // ${({ desaturate }) => desaturate && `filter: saturate(0)`}
`

export default function Invite(props: RouteComponentProps<{ address: string }>) {
  const {
    match: {
      params: { address }
    },
    history
  } = props
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()
  const invited = useUserInvited(account)
  const theme = useContext(ThemeContext)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showMyInvite, setShowMyInvite] = useState(false)
  // console.log('invited', invited, address)
  useEffect(() => {
    if (address && invited !== ZERO_ADDRESS) {
      setShowMyInvite(true)
    }
  }, [address, invited, history])

  useEffect(() => {
    if (showMyInvite && invited === ZERO_ADDRESS) {
      setShowMyInvite(false)
      setShowInviteModal(true)
    }
  }, [invited, showMyInvite])

  return (
    <>
      <PageWrapper>
        <InviteCard
          onClick={() => {
            if (ZERO_ADDRESS === invited) {
              setShowInviteModal(true)
            } else {
              setShowMyInvite(true)
            }
          }}
        >
          <TYPE.white fontWeight={900} fontSize={41}>
            Invite
          </TYPE.white>
          <TYPE.white fontWeight={900} fontSize={16} textAlign="center" marginTop="10px">
            {t('InviteTip')}
          </TYPE.white>
          <HelperFrame>
            <QuestionHelper text={t('InviteHelp')} />
          </HelperFrame>
        </InviteCard>
        {/*<CCircle*/}
        {/*  onClick={() => {*/}
        {/*    history.push('/ecircle')*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <TYPE.white fontWeight={900} fontSize={41}>*/}
        {/*    {t('eArkSwap')}*/}
        {/*  </TYPE.white>*/}
        {/*  <TYPE.white fontWeight={900} fontSize={14} textAlign="center" marginTop="10px">*/}
        {/*    {t('createEArkSwapTip')}*/}
        {/*  </TYPE.white>*/}
        {/*  <HelperFrame>*/}
        {/*    <QuestionHelper text={t('eArkSwapHelp')} />*/}
        {/*  </HelperFrame>*/}
        {/*</CCircle>*/}
      </PageWrapper>

      <Modal isOpen={showMyInvite} onDismiss={() => setShowMyInvite(false)} minHeight={false} maxHeight={90}>
        <UpperSection>
          <CloseIcon
            onClick={() => {
              setShowMyInvite(false)
            }}
          >
            <CloseColor />
          </CloseIcon>
          <HeaderRow>{t('MyInvited')}</HeaderRow>
          {!invited ? (
            <AccountGroupingRow style={{ justifyContent: 'center' }}>
              <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
            </AccountGroupingRow>
          ) : (
            <AccountSection>
              <>
                <YourAccount>
                  <InfoCard>
                    <AccountGroupingRow id="web3-account-identifier-row">
                      <AccountControl>
                        <div>
                          <p style={{ wordBreak: 'break-all', whiteSpace: 'unset' }}>
                            {'https://arkswap.org/#/invite/' + account}
                          </p>
                        </div>
                      </AccountControl>
                    </AccountGroupingRow>
                    <AccountGroupingRow>
                      <AccountControl>
                        <div>
                          {account && (
                            <Copy toCopy={'https://arkswap.org/#/invite/' + account ?? ''}>
                              <span style={{ marginLeft: '4px' }}>{t('copyLink')}</span>
                            </Copy>
                          )}
                          {chainId && account && (
                            <AddressLink
                              hasENS={!!account}
                              isENS={true}
                              href={chainId && getEtherscanLink(chainId, account, 'address')}
                            >
                              <LinkIcon size={16} />
                              <span style={{ marginLeft: '4px' }}>{t('viewOnHECO')}</span>
                            </AddressLink>
                          )}
                        </div>
                      </AccountControl>
                    </AccountGroupingRow>
                  </InfoCard>
                </YourAccount>
                <TYPE.body textAlign={'center'} color={theme.text1}>
                  {t('copyToInvite')}
                </TYPE.body>
              </>
            </AccountSection>
          )}
        </UpperSection>
      </Modal>

      <AddressInviteModal
        isOpen={showInviteModal}
        address={address}
        onDismiss={() => {
          setShowInviteModal(false)
        }}
      />
    </>
  )
}
