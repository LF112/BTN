/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

import { WarningOutlined } from '@ant-design/icons'
//[ assets ]

//=> DOM
export default (props: any) => {
	const { title, checkTime, level } = props

	return (
		<Main>
			<Title>
				<Tag level={level}>
					{level === 3 ? '高危' : level === 2 ? '中危' : '低危'}
				</Tag>
				<h1>{title}</h1>
			</Title>
			<CheckTime>
				<i className='el-icon-search' />
				<p>{checkTime}</p>
			</CheckTime>
			<WarningOutlined />
		</Main>
	)
}

//=> Style
const Main = styled.header`
	position: relative;
	width: 100%;
	height: 55px;
	padding: 0 15px;
	display: flex;
	justify-content: space-between;
	background: #2d323a;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	overflow: hidden;
	> span {
		position: absolute;
		font-size: 75px;
		color: #333842;
		right: -25px;
		bottom: -15px;
	}
`

export const Title = styled.div`
    position: relative;
	display: flex;
	align-items: center;
	> div {
		margin-top: 4px;
		margin-right: 5px;
	}
	> h1 {
		max-width: 320px;
		font-family: 'Noto Sans SC';
		color: #fff;
		font-size: 16px;
		font-weight: bold;
	}
`

const CheckTime = styled.div`
	display: flex;
	align-items: center;
	z-index: 10;
	> i {
		font-size: 12px;
		color: #fff;
	}
	> p {
		font-family: 'Russo One';
		font-size: 12px;
		color: #fff;
		margin-left: 4px;
	}
`

export const Tag = styled.div<{ level: number }>`
	font-size: 12px;
	color: #fff;
	line-height: 1;
	font-family: 'HarmonyOS';
	padding: 4px 8px;
	border-radius: 4px;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
	background: ${({ level }) =>
		level === 3
			? 'linear-gradient(90deg, #ff5d2d 2%, #ca4324 105%)'
			: level === 2
			? 'linear-gradient(90deg,#ffc22d 2%,#cab324 105%)'
			: 'linear-gradient(90deg,#2dff4d 2%,#24ca66 105%)'};
	transform: scale(0.82);
`
