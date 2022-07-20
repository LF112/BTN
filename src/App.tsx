/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
import { HashRouter as Router } from 'react-router-dom'
//[ package ]

import Sidebar from 'components/global/Sidebar'
import Footer from 'components/global/Footer'
import Popups from 'components/global/Popups'
import Pages from 'pages'
import Loading from 'pages/Loading'
import RipplesMask from 'components/global/RipplesMask'
import NetworkWarnPane from 'components/global/WarnPane/network'
import PopupBox from 'components/global/PopupBox'
//[ Components ]

//=> Main Component
export default () => {
	return (
		<BtnMain>
			<div>
				<Main>
					<Popups />
					<PopupBox />
					<RipplesMask child={<NetworkWarnPane />} />
					<Router>
						<Sidebar />
						<Pages />
						<Loading />
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
		max-width: 1440px;
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
