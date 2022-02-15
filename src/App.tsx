import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
//[ package ]

import Sidebar from 'components/global/Sidebar'
import Footer from 'components/global/Footer'
import Popups from 'components/global/Popups'
import Pages from 'pages'
import RipplesMask from 'components/global/RipplesMask'
//[ Components ]

import { useStatus } from 'state/status/hooks'
import { useToggleFloatTips } from 'state/animation/hooks'
//[ hooks ]

//=> Main Component
export default () => {
	const $apiStatus = useStatus('network', 'apiStatus')
	const useFloatTips = useToggleFloatTips()

	const node = useRef<HTMLElement>()

	useEffect(() => {
		if ($apiStatus) useFloatTips(true, node.current)
	}, [$apiStatus])

	return (
		<BtnMain ref={node as any}>
			<div>
				<Main>
					<Popups />
					<RipplesMask />
					<Router>
						<Sidebar />
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
