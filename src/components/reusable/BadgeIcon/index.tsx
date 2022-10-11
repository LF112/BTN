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
	const { icon, text, style = {} } = props
	return (
		<BadgeIcon style={style}>
			{icon}
			<Text>{text}</Text>
		</BadgeIcon>
	)
}

//=> Style
export const BadgeIcon = styled.div`
	position: relative;
	height: 30px;
	border-radius: 5px;
	background: #21252b;
	box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 12%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 10px;
	user-select: none;
	svg {
		width: 22px;
		height: 22px;
		margin-right: 5px;
		path {
			fill: #fff;
		}
	}
	i {
		color: #fff;
		margin-right: 5px;
	}
`

export const Text = styled.h2`
	font-family: 'Geometos', 'HarmonyOS';
	font-weight: 400;
	line-height: 1;
	font-size: 16px;
	color: #fff;
	margin-top: -2px;
`
