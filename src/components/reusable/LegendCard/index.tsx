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

import { DefaultCard } from 'components/reusable/Card'
//[ components ]

//=> DOM
export default (props: any) => {
	const { text, color = '#fff', data, noPoint, icon = '', textColor } = props

	return (
		<LegendCard>
			<LegendInfo color={color}>
				{noPoint ? <></> : <div />}
				<p>{text}</p>
			</LegendInfo>
			<LegendData>
				<p style={{ color: textColor }}>{data}</p>
			</LegendData>
			<LegendIcon>
				<i className={icon} />
			</LegendIcon>
		</LegendCard>
	)
}

//=> Style
const LegendCard = styled(DefaultCard)`
	width: 100%;
	min-width: auto;
	height: 45px;
	background: #2c313c;
	padding: 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const LegendInfo = styled.div<{ color: string }>`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	z-index: 1;
	> div {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: ${props => props.color};
	}
	> p {
		font-size: 12px;
		color: ${props => props.color};
		font-family: 'HarmonyOS';
		line-height: 1;
	}
`

const LegendData = styled.div`
	width: 100%;
	text-align: center;
	margin-top: 5px;
	z-index: 1;
	> p {
		font-size: 12px;
		color: #79869c;
		font-family: 'Russo One', 'HarmonyOS';
		line-height: 1;
	}
`

const LegendIcon = styled.div`
	position: absolute;
	z-index: 0;
	right: -15px;
	bottom: -18px;
	> i {
		color: #474f60;
		font-size: 58px;
	}
`
