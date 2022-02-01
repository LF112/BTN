import React from 'react'
import styled from 'styled-components'
//[ package ]

import Server from './Server'
import Item from './Item'
//[ components ]

import sidebarConsts from 'constants/sidebar_consts'
//[ constants ]

//=> Component
export default () => {
	return (
		<Sidebar>
			<div>
				<Server />
				<Menu>
					{sidebarConsts.map((data: object, index: number) => {
						return <Item key={index} data={data} />
					})}
				</Menu>
			</div>
		</Sidebar>
	)
}

//=> Style Component
const Sidebar = styled.nav`
	width: 198px;
	height: calc(100% - 20px);
	display: flex;
	justify-content: center;
	border-radius: 8px;
	margin: 10px;
	background: #282c34;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
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
