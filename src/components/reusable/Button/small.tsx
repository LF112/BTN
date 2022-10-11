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
	const { onClick, icon, style = {}, onMouseLeave } = props

	return (
		<Main style={style} onClick={onClick} onMouseLeave={onMouseLeave}>
			{icon}
		</Main>
	)
}

//=> Style
const Main = styled.button`
	min-width: 20px;
	height: 20px;
	padding: 3px;
	border-radius: 5px;
	background: #2f353d;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	> i {
		color: #c5c5c5;
		font-size: 16px;
		line-height: 1;
	}
	> span {
		color: #c5c5c5;
		font-size: 14px;
		line-height: 1;
		margin-top: 3px;
	}
	&:hover {
		transform: scale(0.96);
		background: #2a2f36;
	}
`
