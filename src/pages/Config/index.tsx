import React, { useEffect, useState, useRef } from 'react'
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

	const pageNode = useRef<HTMLDivElement>(null)

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
				SHOW && !pageLoad ? { animation: 'FadeOut_Left 0.5s forwards' } : {}
			}>
			<Left>
				<BTN />
				<Navigation
					togglePage={togglePage}
					setTogglePage={(nextPage: string) => {
						const { style } = pageNode.current
						style.animation = 'FadeOut_Left 0.25s forwards'
						setTimeout(() => {
							setTogglePage(nextPage)
							setTimeout(() => {
								style.animation = ''
							}, 116)
						}, 250)
					}}
				/>
			</Left>
			<Right ref={pageNode}>
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
	animation: FadeIn_Left 0.25s forwards;
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
