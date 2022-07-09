import React from 'react'
import styled from 'styled-components'
//[ package ]

import Item from './Item'
//[ component ]

//=> DOM
export default () => {
	return (
		<Main>
			<Item />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: calc(100% - 55px);
`
