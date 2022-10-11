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

import SystemIcon from 'constants/systemIcon'
//[ constants ]

//=> DOM
export default (props: any) => {
	const { OS, OSArch } = props

	return (
		<SysIcon>
			{SystemIcon[OS.replace(/[0-9]/g, '').toLowerCase()]}
			<div>{OSArch}</div>
		</SysIcon>
	)
}

//=> Style
const SysIcon = styled.div`
	position: relative;
	width: 80px;
	height: 80px;
	border-radius: 8px;
	background: #21252b;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	display: flex;
	align-items: center;
	justify-content: center;
	> svg {
		width: 60px;
		height: 60px;
	}
	> div {
		font-family: 'Geometos';
		color: #fff;
		position: absolute;
		padding: 5px 8px;
		bottom: 5px;
		font-size: 12px;
		border-radius: 5px;
		line-height: 1;
		background: #2f353d;
		opacity: 0.8;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	}
`
