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

import Item from './Item'
import BetterScroll from 'components/reusable/BetterScroll'
import Details from './Details'
//[ component ]

//=> DOM
export default (props: any) => {
	const { data, choose } = props
	const { risk: $Risk, security: $Security, ignore: $Ignore } = data

	return (
		<Main>
			<BetterScroll
				height={90 * $Risk.length + $Risk.length * 10 + 30}
				hide={!(choose === 'risk')}>
				{$Risk.map((item: any, index: number) => (
					<Item key={index} data={item} />
				))}
			</BetterScroll>
			<BetterScroll
				height={90 * $Security.length + $Security.length * 10 + 30}
				hide={!(choose === 'security')}>
				{$Security.map((item: any, index: number) => (
					<Item key={index} data={item} />
				))}
			</BetterScroll>
			<BetterScroll
				height={90 * $Ignore.length + $Ignore.length * 10 + 30}
				hide={!(choose === 'ignore')}>
				{$Ignore.map((item: any, index: number) => (
					<Item key={index} data={item} />
				))}
			</BetterScroll>
			<Empty show={data[choose].length === 0}>
				<h1>
					暂无{{ risk: '风险', security: '安全', ignore: '忽略' }[choose]}项
				</h1>
			</Empty>
			<Details />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: calc(100% - 65px);
	overflow: hidden;
	> main {
		position: absolute;
		top: 0;
		> div {
			> main + main {
				margin-top: 10px;
			}
		}
	}
`

const Empty = styled.div<{ show: boolean }>`
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: ${({ show }) => (show ? 1 : 0)};
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
	pointer-events: none;
	> h1 {
		color: #fff;
		font-size: 20px;
		font-family: 'HarmonyOS';
	}
`
