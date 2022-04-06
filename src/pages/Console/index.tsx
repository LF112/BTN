import React, { useEffect } from 'react'
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
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()
	const _apiStatus = useStatus('network', 'apiStatus')

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
						['system', 'load', 'disk', 'up', 'down', 'upTotal', 'downTotal'],
						['cpu', 'cpu'],
						['memory', 'mem']
					])
			}, 2000)
		return () => clearRafInterval(Timer)
	}, [_apiStatus])

	return (
		<Main>
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
