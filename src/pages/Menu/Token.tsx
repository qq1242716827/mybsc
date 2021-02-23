import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import SwapLogo from '../../assets/svg/swapLogo.svg'
import LpBg from '../../assets/swap_images/LP_bg.jpg'
import { Link } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'

const TokenPage = styled.div`
  position: relative;
  max-width: 1020px;
  width: 100%;
  margin: auto;
  margin-top: 40px;
  padding: 1px;
  box-sizing: content-box;
`
const TokenTop = styled.div`
  position: relative;
`
const TokenTitle = styled.div`
  text-align: center;
  line-height: 36px;
  font-size: 24px;
  margin-top: 20px;
  font-weight: 500;
  color: #606060;
`
// const LpSubTitle = styled.div`
//   text-align: center;
//   line-height: 30px;
//   font-size: 20px;
//   margin-top: 10px;
//   color: #00c6d1;
// `
const TokenTopIcon = styled.div`
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
const TokenTopBg = styled.div`
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
const TokenPoolRow = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 40px;
`
const TokenPoolItem = styled.div`
  width: 320px;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 15px;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.05);
  margin-right: 30px;

  :nth-child(3n) {
    margin-right: 0px;
  }
  :hover,
  :focus {
    box-shadow: 0px 1px 10px 0px rgba(0, 198, 209, 0.5);
  }
`
const MarginTopBox = styled.div`
  margin-top: 10px;
`
const TokenPoolItemName = styled(MarginTopBox)`
  text-align: center;
  font-size: 24px;
  line-height: 1.5;
`
const TokenPoolItemContent = styled(MarginTopBox)`
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
`
const TokenPoolItemIconRow = styled.div`
  padding-top: 15px;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
`
const TokenPoolItemIconItem = styled.div`
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  over-flow: hidden;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`
const TokenPoolItemApy = styled(MarginTopBox)`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  background-color: #00c6d1;
  color: #fff;

  & > span {
  }
`
const TokenPoolItemSelect = styled(Link)`
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-radius: 50px;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  padding: 0 30px;
  border: 1px solid #00c6d1;
  box-sizing: border-box;
  color: #00c6d1;
  margin-top: 15px;
  text-decoration: none;
  outline: none;
  display: block;

  :hover {
    background-color: #00c6d1;
    color: #fff;
  }
`

export default function Token({ poolList }: { poolList?: Array<any> }) {
  const { t } = useTranslation()

  const { account } = useWeb3React()
  const apy = account ? 10 : 0

  return (
    <TokenPage>
      <TokenTop>
        <TokenTopBg>
          <img src={LpBg} alt="bg" />
        </TokenTopBg>
        <TokenTopIcon>
          <img src={SwapLogo} alt="logo" />
        </TokenTopIcon>
        <TokenTitle>{t('LP && Tokens Title')}</TokenTitle>
        {/*<LpSubTitle>{t('LP')}</LpSubTitle>*/}
      </TokenTop>
      <TokenPoolRow>
        {poolList &&
          poolList.map(
            (v, i) =>
              v.type === 'Token' && (
                <TokenPoolItem key={i}>
                  <TokenPoolItemIconRow>
                    <TokenPoolItemIconItem>
                      <img src={v.iconL} alt="icon" />
                    </TokenPoolItemIconItem>
                  </TokenPoolItemIconRow>
                  <TokenPoolItemName>{v.name}</TokenPoolItemName>
                  <TokenPoolItemContent>Earn {v.dailyPer} ARK(Per Day)</TokenPoolItemContent>
                  <TokenPoolItemContent>Earn {v.total} ARK(Total)</TokenPoolItemContent>
                  <TokenPoolItemContent>{v.usdtTotal} HUSD</TokenPoolItemContent>
                  <TokenPoolItemApy>
                    <span>APY</span>
                    <span>{apy}%</span>
                  </TokenPoolItemApy>
                  <TokenPoolItemSelect to={'/menu/pool/' + v.id}>Select</TokenPoolItemSelect>
                </TokenPoolItem>
              )
          )}
      </TokenPoolRow>
    </TokenPage>
  )
}
