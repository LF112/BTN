import React from 'react'
import styled from 'styled-components'
//[ package ]

import Server from './Server'
//[ components ]

//=> Component
export default () => {
	return (
		<Sidebar>
			<Server />
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
`
