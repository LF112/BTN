import React from 'react'
import styled from 'styled-components'

//=> Main Component
export default () => {
	return (
		<Main>
			<h1>你好，BTN！</h1>
		</Main>
	)
}

//=> Style Component
const Main = styled.main`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	> h1 {
		font-size: 50px;
		font-weight: bold;
	}
`
