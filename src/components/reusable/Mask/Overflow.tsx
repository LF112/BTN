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
	const { showMask, color, style, bottom = false } = props

	return (
		<Overflow
			color={color}
			bottom={bottom}
			style={{ display: showMask ? 'block' : 'none', ...style }}
		/>
	)
}

//=> Style
const Overflow = styled.main<{ color: string; bottom: boolean }>`
	position: absolute;
	width: ${props => (props.bottom ? '100%' : '30px')};
	height: ${props => (props.bottom ? '30px' : '100%')};
	background: linear-gradient(
		${props => (props.bottom ? '0' : '269')}deg,
		${props => (props.color ? props.color : '#323842')} 1%,
		transparent
	);
	${props => (props.bottom ? 'bottom: 0;left: 0;' : 'top: 0;right: 0;')}
	z-index: 10;
`
