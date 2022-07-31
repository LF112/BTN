/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { useStore } from '@nanostores/react'
//[ package ]

import BTN from 'components/page/config/BTN'
import Navigation from 'components/page/config/Navigation'
import Page from './Page'
//[ Components ]

import { setPageLoad, _pageLoad } from 'state2/animation'
//[ state ]

//=> DOM
export default () => {
	const [togglePage, setTogglePage] = useState<string>('panel')

	const pageNode = useRef<HTMLDivElement>(null)

	//=> MAIN EFFECTS
	const [SHOW, setSHOW] = useState<Boolean>(false)
	const pageLoad = useStore(_pageLoad)
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
