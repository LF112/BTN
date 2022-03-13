import React from 'react'
import styled from 'styled-components'
//[ package ]

import Card from './Card'
//[ components ]

//=> DOM
export default () => {
	return (
		<DiskCardList>
			<Card />
		</DiskCardList>
	)
}

//=> Style
const DiskCardList = styled.main`
	position: relative;
	width: 100%;
	margin-top: 10px;
`
