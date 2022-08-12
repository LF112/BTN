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
			<BTN className='TIP' data-tooltip='Made With 💖 By LF112'>
				<h1>BTN</h1>
			</BTN>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
`

const BTN = styled.div`
	margin-top: 2px;
	padding: 5px;
	border-radius: 4px;
	cursor: pointer;
	> h1 {
		opacity: 0.8;
		font-size: 18px;
		font-family: 'Russo One';
		font-weight: 400;
		line-height: 1;
		letter-spacing: 2px;
		-webkit-background-clip: text !important;
		-webkit-box-decoration-break: clone;
		color: transparent;
		background: linear-gradient(110deg, #5b6678, #525a6a, #4b5461, #4b5461);
		user-select: none;
	}
	&:hover {
		background: #282c34;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		> h1 {
			opacity: 1;
			transform: scale(0.98);
		}
	}
`
