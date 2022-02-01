import React from 'react'
import styled from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
//[ package ]

import Sidebar from 'components/global/Sidebar'
import Footer from 'components/global/Footer'
import Popups from 'components/global/Popups'
import Pages from 'pages'
//[ Components ]

//=> Main Component
export default () => {
	return (
		<BtnMain>
			<div>
				<Main>
					<Popups />
					<Sidebar />
					<Router>
						<Pages />
					</Router>
				</Main>
				<Footer />
			</div>
		</BtnMain>
	)
}

//=> Style Component
const BtnMain = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 25px;
	> div {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		background: #323842;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 15%);
	}
`

const Main = styled.main`
	position: relative;
	width: 100%;
	height: calc(100% - 42px);
	padding: 5px;
	display: flex;
	align-items: center;
`
