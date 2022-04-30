import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { setRafInterval, clearRafInterval } from 'setRafTimeout'
//[ package ]

import Header from 'components/page/console/Header'
import QuickControl from 'components/page/console/QuickControl'
import StatusPanel from 'components/page/console/StatusPanel'
import SystemInfo from 'components/page/console/SystemInfo'
import DiskCard from 'components/page/console/DiskCard'
import DataHub from 'components/page/console/DataHub'
//[ components ]

import { useUpdateApi } from 'state/api/hooks'
import { useStatus } from 'state/status/hooks'
import {
	useUpdatePageLoadStatus,
	usePageLoadStatus
} from 'state/animation/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()
	const setPageLoad = useUpdatePageLoadStatus()

	const _apiStatus = useStatus('network', 'apiStatus')
	const pageLoad = usePageLoadStatus()

	//=> MAIN EFFECTS
	const [SHOW, setSHOW] = useState<Boolean>(false)
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
			[
				'panel',
				'version',
				'name',
				'Pro',
				'Ltd',
				'Beta',
				'time',
				'isNew',
				'betaVersionId',
				'VersionId',
				'betaVersionLogs',
				'VersionLogs',
				'betaUptime',
				'Uptime'
			],
			['system', 'load', 'os', 'disk']
		])

		//=> 持续获取面板状态
		if (!_apiStatus) {
			//=> 当 API 被限制时，且 Timer 已定义
			if (typeof Timer === 'function') clearRafInterval(Timer)
		} else
			Timer = setRafInterval(() => {
				if (_apiStatus)
					updateApi([
						[
							'system',
							'load',
							'disk',
							'up',
							'down',
							'upTotal',
							'downTotal',
							'iostat'
						],
						['cpu', 'cpu'],
						['memory', 'mem']
					])
			}, 2000)
		return () => {
			if (Timer) clearRafInterval(Timer)
		}
	}, [_apiStatus])

	return (
		<Main
			style={
				SHOW && !pageLoad ? { animation: 'pageFadeOut 0.5s forwards' } : {}
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
	animation: pageFadeIn 0.25s forwards;
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
