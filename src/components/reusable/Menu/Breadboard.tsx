/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ Components ]

//=> DOM
export default (props: any) => {
	const { list, setChoose } = props

	const [choose, updateChoose] = useState<Number>(0)
	const [touchWidth, setTouchWidth] = useState<Number>(0)
	const [touchLeft, setTouchLeft] = useState<Number>(0)
	const [chooseWidth, setChooseWidth] = useState<Number>(0)
	const [chooseLeft, setChooseLeft] = useState<Number>(0)

	const node = useRef<HTMLElement>(null) as any

	//=> 设置初始选择条位置
	useEffect(() => {
		const DOM = node.current
		if (DOM) {
			const { clientWidth, offsetLeft } = DOM.firstElementChild

			setChooseWidth(clientWidth)
			setChooseLeft(offsetLeft)
			setTouchWidth(clientWidth)
			setTouchLeft(offsetLeft)
		}
	}, [node])

	const handleTouch = (event: any) => {
		const { target } = event
		setTouchWidth(target.clientWidth)
		setTouchLeft(target.offsetLeft)
	}

	const handleClick = (event: any, index: number, to: string) => {
		const { target } = event
		setChooseWidth(target.clientWidth)
		setChooseLeft(target.offsetLeft)
		updateChoose(index)
		setChoose(to)
	}

	return (
		<Main ref={node}>
			{list.map((item: any, index: number) => {
				return (
					<Item
						key={index}
						style={
							choose === index
								? { color: '#fff', fontSize: '16px', cursor: 'default' }
								: {}
						}
						onClick={(event: any) => {
							if (choose === index) event.preventDefault()
							else handleClick(event, index, item.to)
						}}
						onMouseEnter={handleTouch}
						onMouseLeave={() => {
							setTouchWidth(chooseWidth)
							setTouchLeft(chooseLeft)
						}}>
						{item.name}
					</Item>
				)
			})}
			<Line style={{ width: `${touchWidth}px`, left: `${touchLeft}px` }} />
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	background: #282c34;
	height: 50px;
	padding: 4px 14px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	> h1 + h1 {
		margin-left: 8px;
	}
`

const Item = styled.h1`
	color: #60697c;
	font-size: 15px;
	line-height: 1;
	font-family: 'HarmonyOS';
	cursor: pointer;
	user-select: none;
	:hover {
		color: #6e788e;
		font-size: 16px;
	}
`

const Line = styled.div`
	position: absolute;
	width: 0;
	height: 4px;
	border-radius: 5px;
	background: #444b58;
	left: 0;
	bottom: 8px;
`
