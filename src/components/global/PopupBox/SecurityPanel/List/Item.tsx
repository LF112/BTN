import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default () => {
	return <Main></Main>
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 65px;
	border-radius: 4px;
	background: #2d323a;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
`
