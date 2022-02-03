import React from 'react'
import styled from 'styled-components'
//[ package ]

import Header from 'components/page/console/Header'
import QuickControl from 'components/page/console/QuickControl'
//[ components ]

//=> DOM
export default () => {
	return (
		<Main>
			<Left>
				<Header />
			</Left>
			<Right>
				<QuickControl />
			</Right>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: calc(100% - 218px);
	height: calc(100% - 20px);
	margin: 10px 10px 10px auto;
	padding: 10px 0;
	display: flex;
`

const Left = styled.div`
	width: calc(100% - 310px);
	height: 100%;
	margin-right: 10px;
`

const Right = styled.div`
	width: 300px;
	height: 100%;
`
