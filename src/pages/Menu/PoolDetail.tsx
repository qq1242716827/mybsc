import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import LpBg from '../../assets/swap_images/LP_bg.jpg'
import SwapLogo from '../../assets/svg/swapLogo.svg'

const DetailPage = styled.div`
  position: relative;
  max-width: 700px;
`
const PageTopTitle = styled.div`
  text-align: center;
  line-height: 36px;
  font-size: 24px;
  margin-top: 20px;
  font-weight: 500;
  color: #606060;
`
// const PageTopSubTitle = styled.div`
//   text-align: center;
//   line-height: 30px;
//   font-size: 20px;
//   margin-top: 10px;
//   color: #00c6d1;
// `
const PageTop = styled.div`
  position: relative;
`
const PageTopIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: auto;
  margin-top: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const PageTopBg = styled.div`
  width: 600px;
  height: 245px;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: auto;
  z-index: -1;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const PageContent = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 40px;
`
const PageContentItem = styled.div`
  width: 320px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 15px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
`
const PageContentItemTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  padding-top: 15px;
`

function getDetailById(id: string) {
  console.log(id)
  return false
}
export default function PoolDetail(props: RouteComponentProps<{ id: string }>) {
  const {
    match: {
      params: { id }
    }
  } = props
  const { t } = useTranslation()
  const detail = getDetailById(id)
  console.log(detail)
  return (
    <DetailPage>
      <PageTop>
        <PageTopBg>
          <img src={LpBg} alt="bg" />
        </PageTopBg>
        <PageTopIcon>
          <img src={SwapLogo} alt="logo" />
        </PageTopIcon>
        <PageTopTitle>{t('ARK Pool')}</PageTopTitle>
        {/*<PageTopSubTitle>{t('Pool Notice')}</PageTopSubTitle>*/}
      </PageTop>

      <PageContent>
        <PageContentItem>
          <PageContentItemTitle>{t('Your Balance')}</PageContentItemTitle>
        </PageContentItem>
        <PageContentItem>
          <PageContentItemTitle>{t('Your Balance')}</PageContentItemTitle>
        </PageContentItem>
      </PageContent>
    </DetailPage>
  )
}
