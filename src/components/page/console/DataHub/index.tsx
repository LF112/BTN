/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
//[ package ]

import Network from './Network'
import Iostat from './Iostat'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ component ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { bytesToSize } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	const { up, down, upTotal, downTotal, iostat } = useApiState('system')

	//=> 显示遮罩
	const cardBoxNode = useRef<HTMLDivElement>(null)
	const [showMask, updateShowMask] = useState<boolean>(false)
	useEffect(() => {
		if (cardBoxNode) {
			const DOM = cardBoxNode.current
			if (DOM.scrollHeight > DOM.clientHeight) {
				updateShowMask(!showMask)
				//=> 装载 BetterScroll
				BScroll.use(MouseWheel)
				setTimeout(
					() =>
						new BScroll(DOM, {
							scrollX: false,
							scrollY: true,
							mouseWheel: true
						}),
					516
				)
			}
		}
	}, [cardBoxNode])

	return (
		<Main showMask={showMask}>
			<nav ref={cardBoxNode}>
				<div>
					<Network
						up={up}
						down={down}
						upTotal={bytesToSize(upTotal)}
						downTotal={bytesToSize(downTotal)}
					/>
					<Iostat data={iostat} />
				</div>
			</nav>
			<OverflowMask showMask={showMask} bottom={true} />
		</Main>
	)
}

//=> Style
const Main = styled.main<{ showMask: boolean }>`
	position: relative;
	width: 100%;
	height: calc(100% - 202px);
	margin-top: 8px;
	> nav {
		width: 100%;
		height: 100%;
		overflow: hidden;
		> div {
			width: 100%;
			${(props: any) => (props.showMask ? 'padding-bottom: 35px' : '')};
		}
	}
`
