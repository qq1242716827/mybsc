import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LP from './Lp'
import Token from './Token'
import { getAirdropRewardByGet } from '../../state/arkdrop/hooks'

const MenuPage = styled.div`
  position: relative;
  width: 100%;
`
const MenuTabBar = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`
const activeClassName = 'ACTIVE'
const MenuTabBarBtn = styled.div.attrs({
  activeClassName
})`
  width: 200px;
  height: 60px;
  border-radius: 60px;
  line-height: 60px;
  text-align: center;
  border: 1px solid #eee;
  color: #999;
  cursor: pointer;

  &.${activeClassName} {
    color: #00c6d1;
    border: 1px solid #00c6d1;
  }

  :hover {
    color: #00c6d1;
    border: 1px solid #00c6d1;
  }

  background: ${({ theme }) => theme.bg1};
  margin: 0 20px;
`
const MenuTabBody = styled.div`
  position: relative;
`

export default function Menu() {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<number>(1)
  //显示pool列表
  const [poolList, setpoolList] = useState<Array<any>>()
  useEffect(() => {
    ;(async function f() {
      // console.log('userAddress', account)
      // const params = { address: account }
      const url = 'http://localhost:3000/poolList.json'
      // const url = 'https://arkswap.org/api/user/arkLpDetail'
      // const url = '/api/user/arkLpDetail'
      const res2 = await getAirdropRewardByGet(url)
      // console.log('res2:', res2)
      if (res2 && res2.poolList) {
        setpoolList(res2.poolList)
      }
    })()
  }, [])

  return (
    <MenuPage>
      <MenuTabBar>
        <MenuTabBarBtn
          className={current === 1 ? activeClassName : ''}
          onClick={() => {
            setCurrent(1)
          }}
        >
          {t('LP')}
        </MenuTabBarBtn>
        <MenuTabBarBtn
          className={current === 2 ? activeClassName : ''}
          onClick={() => {
            setCurrent(2)
          }}
        >
          {t('Token')}
        </MenuTabBarBtn>
      </MenuTabBar>

      {current === 1 && (
        <MenuTabBody>
          <LP poolList={poolList} />
        </MenuTabBody>
      )}
      {current === 2 && (
        <MenuTabBody>
          <Token poolList={poolList} />
        </MenuTabBody>
      )}
    </MenuPage>
  )
}
