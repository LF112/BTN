import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

//[ package ]

import BTN from 'components/page/config/BTN'
import Navigation from 'components/page/config/Navigation'
import Page from './Page'
//[ Components ]

import {
	useUpdatePageLoadStatus,
	usePageLoadStatus
} from 'state/animation/hooks'
//[ state ]

//=> DOM
export default () => {
	const setPageLoad = useUpdatePageLoadStatus()
	const pageLoad = usePageLoadStatus()

	const [togglePage, setTogglePage] = useState<string>('panel')

	//=> MAIN EFFECTS
	const [SHOW, setSHOW] = useState<Boolean>(false)
	useEffect(() => {
		if (!pageLoad) {
			setPageLoad(true)
			setSHOW(true)
		}
	}, [''])

	return (
		<Main
			style={
				SHOW && !pageLoad ? { animation: 'pageFadeOut 0.5s forwards' } : {}
			}>
			<Left>
				<BTN />
				<Navigation togglePage={togglePage} setTogglePage={setTogglePage} />
			</Left>
			<Right>
				<Page page={togglePage} />
			</Right>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: calc(100% - 218px);
	height: calc(100% - 20px);
	margin: 10px 10px 10px auto;
	display: flex;
	animation: pageFadeIn 0.25s forwards;
`

const Left = styled.div`
	width: 230px;
	height: 100%;
	margin-right: 10px;
`

const Right = styled.div`
	width: calc(100% - 240px);
	height: 100%;
`
