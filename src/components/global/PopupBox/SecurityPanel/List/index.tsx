/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
//[ package ]

import Item from './Item'
//[ component ]

//=> DOM
export default (props: any) => {
	const { data, choose } = props

	const node = useRef<HTMLDivElement>(null)
	const [BScrollCore, setBScroll] = useState<BScroll | null>(null)
	useEffect(() => {
		if (node) {
			const DOM = node.current
			//=> 装载 BetterScroll
			BScroll.use(MouseWheel)
			setTimeout(
				() =>
					setBScroll(
						new BScroll(DOM, {
							scrollX: false,
							scrollY: true,
							mouseWheel: true
						})
					),
				516
			)
		}
	}, [node])

	useEffect(() => {
		if (BScrollCore) {
			BScrollCore.refresh()
			BScrollCore.scrollTo(0, 0)
		}
	}, [choose])

	return (
		<Main ref={node}>
			<div
				style={{
					height: `${
						90 * data[choose].length + data[choose].length * 10 + 30
					}px`
				}}>
				{data[choose].map((item: any, index: number) => (
					<Item key={index} data={item} />
				))}
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: calc(100% - 65px);
	overflow: hidden;
	> div {
		> main + main {
			margin-top: 10px;
		}
	}
`
