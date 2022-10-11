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
	const { icon, title, children } = props
	return (
		<Main>
			<Title>
				{icon}
				{title}
			</Title>
			{children}
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 500px;
	height: 100%;
	border-radius: 5px;
	background: #22252c;
	box-shadow: rgba(26, 26, 26, 45%) 0px 1px 3px;
	padding: 15px 20px;
`

const Title = styled.h1`
	font-size: 20px;
	color: #fff;
	font-family: 'HarmonyOS';
	line-height: 1;
	user-select: none;
	display: flex;
	align-items: center;
	> svg {
		height: 22px;
		height: 22px;
		margin-top: 2px;
		margin-right: 10px;
	}
`
