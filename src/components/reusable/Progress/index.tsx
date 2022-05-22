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

//=> DOM
export default (props: any) => {
	const { value, sticky, style, style2, percentage = false } = props

	return (
		<StateStrip sticky={sticky} style={style}>
			<div style={style2}>
				{percentage ? <Percentage>{value || 0}%</Percentage> : <></>}
				<LineMask>
					<div style={{ width: `${value || 0}%` }} />
				</LineMask>
			</div>
		</StateStrip>
	)
}

//=> Style
const StateStrip = styled.div<{ sticky: string }>`
	position: relative;
	width: 100%;
	height: 18px;
	display: flex;
	justify-content: center;
	align-items: end;
	z-index: 10;
	> div {
		display: flex;
		width: 100%;
		height: 18px;
		background: linear-gradient(109deg, #1f2229, #1d212b, #1f232c, #1a1d22);
		border-radius: ${props => (props.sticky ? props.sticky : '8px')};
		box-shadow: 0 -1px 2px -1px #15171c;
		padding: 6px 12px;
	}
`

const LineMask = styled.div`
	width: 100%;
	height: 100%;
	background: hsl(218deg, 13%, 17%, 85%);
	border-radius: 20px;
	> div {
		width: 0%;
		height: 100%;
		border-radius: 20px;
		background: linear-gradient(90.43deg, #33ceff 1.33%, #37d99f 105.76%);
	}
`

const Percentage = styled.p`
	color: #fff;
	font-size: 12px;
	line-height: 1;
	font-family: 'Geometos';
	margin-top: -4px;
	margin-right: 10px;
	user-select: none;
`
