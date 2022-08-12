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

import LOGO from './LOGO'
import Copyright from './Copyright'
//[ component ]

//=> Component
export default () => {
	return (
		<Footer>
			<LOGO />
			<Copyright />
		</Footer>
	)
}

//=> Style Component
const Footer = styled.nav`
	width: 100%;
	height: 42px;
	display: flex;
	align-items: center;
	border-radius: 0 0 8px 8px;
	background: #21252b;
	padding: 2px 15px;
`
