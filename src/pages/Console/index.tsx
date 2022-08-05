/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { setRafInterval, clearRafInterval } from 'setRafTimeout'
import { useStore } from '@nanostores/react'
//[ package ]

import Header from 'components/page/console/Header'
import QuickControl from 'components/page/console/QuickControl'
import StatusPanel from 'components/page/console/StatusPanel'
import SystemInfo from 'components/page/console/SystemInfo'
import DiskCard from 'components/page/console/DiskCard'
import DataHub from 'components/page/console/DataHub'
//[ components ]

import { useUpdateApi } from 'state2/api'
import { _apiStatus } from 'state2/status'
import { setPageLoad, _pageLoad } from 'state2/animation'
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()

	const apiStatus = useStore(_apiStatus)

	//=> MAIN EFFECTS
	const [SHOW, setSHOW] = useState<Boolean>(false)
	const pageLoad = useStore(_pageLoad)
	useEffect(() => {
		if (!pageLoad) {
			setPageLoad(true)
			setSHOW(true)
		}
	}, [''])

	//=> 更新状态
	let Timer: any = null
	useEffect(() => {
		updateApi([
			'panel.panelVersion',
			'panel.panelName',
			'panel.panelPro',
			'panel.panelLtd',
			'panel.panelBeta',
			'panel.panelRunTime',
			'panel.panelIsNew',
			'panel.panelBetaVersion',
			'panel.panelNewVersion',
			'panel.panelBetaVersionLogs',
			'panel.panelNewVersionLogs',
			'panel.panelBetaVersionUptime',
			'panel.panelNewVersionUptime',
			'cpu.cpu',
			'server.OS',
			'disk.disk',
			'disk.iostat',
			'security.riskList',
			'security.securityList',
			'security.ignoreList'
		])

		//=> 持续获取面板状态
		if (!apiStatus) {
			//=> 当 API 被限制时，且 Timer 已定义
			if (typeof Timer === 'function') clearRafInterval(Timer)
		} else
			Timer = setRafInterval(() => {
				if (apiStatus)
					updateApi([
						'network.networkUp',
						'network.networkDown',
						'network.networkUpTotal',
						'network.networkDownTotal',
						'disk.disk',
						'disk.iostat',
						'cpu.cpu'
					])
			}, 2000)
		return () => {
			if (Timer) clearRafInterval(Timer)
		}
	}, [apiStatus])

	return (
		<Main
			style={
				SHOW && !pageLoad ? { animation: 'FadeOut_Left 0.5s forwards' } : {}
			}>
			<Left>
				<Header />
				<StatusPanel />
				<DataHub />
			</Left>
			<Right>
				<QuickControl />
				<SystemInfo />
				<DiskCard />
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
