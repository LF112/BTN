/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
//[ package ]

import Server from './Server'
import Item from './Item'
//[ components ]

import sidebarConsts from 'constants/sidebar_consts'
//[ constants ]

//=> Component
export default () => {
	const { pathname } = useLocation()

	return (
		<Sidebar>
			<div>
				<Server />
				<Menu>
					{sidebarConsts.map((data: object, index: number) => {
						return <Item key={index} data={{ location: pathname, ...data }} />
					})}
				</Menu>
			</div>
		</Sidebar>
	)
}

//=> Style Component
const Sidebar = styled.nav`
	position: relative;
	width: 198px;
	min-width: 198px;
	height: calc(100% - 20px);
	display: flex;
	justify-content: center;
	border-radius: 8px;
	margin: 10px;
	background: #282c34;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
	z-index: 30;
	> div {
		width: 100%;
		height: 100%;
	}
`

const Menu = styled.div`
	width: 100%;
	padding: 10px;
	> div + div {
		margin-top: 8px;
	}
`
