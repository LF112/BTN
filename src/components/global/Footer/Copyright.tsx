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
export default () => {
	return (
		<Main>
			<p>Copyright &copy;</p>
			<LF
				href='https://www.lf112.net'
				target='_blank'
				className='TIP'
				data-tooltip='✨ 独立网站开发者'>
				&nbsp;LF112&nbsp;
			</LF>
			<p> All Rights Reserved.</p>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	display: flex;
	margin-left: 15px;
	> p {
		font-family: 'REEJI-PinboGB';
		font-size: 14px;
		font-weight: bold;
		margin-top: 2px;
		opacity: 0.75;
		-webkit-background-clip: text !important;
		-webkit-box-decoration-break: clone;
		color: transparent;
	}
	> p:first-child {
		background: linear-gradient(110deg, #5d6470, #525a6a, #4b5461);
	}
	> p:last-child {
		background: linear-gradient(110deg, #525a6a, #4b5461);
	}
`

const LF = styled.a`
	position: relative;
	font-family: 'REEJI-PinboGB';
	font-size: 14px;
	font-weight: bold;
	margin: 2px 2px 0;
	opacity: 0.75;
	color: #475361;
	cursor: pointer;
	border-radius: 4px;
	&:hover {
		opacity: 1;
		color: #4b5867;
		background: #2b2f38;
		transform: scale(0.98);
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
	}
`
