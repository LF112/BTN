import React, { useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { useUpdateShow } from 'state/popupbox/hooks'
import { useUpdateApi, useApiState } from 'state/api/hooks'
//[ hooks ]

import VersionStatus from './VersionStatus'
import CurrentVersion from './CurrentVersion'
import Logs from './Logs'
//[ components ]

//=> DOM
export default () => {
	const updateShow = useUpdateShow()
	const updateApi = useUpdateApi()
	const $panel = useApiState('panel')

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
		//=> 更新版本信息
		updateApi([
			'panel',
			'isNew',
			'betaVersionId',
			'VersionId',
			'betaVersionLogs',
			'VersionLogs',
			'betaUptime',
			'Uptime'
		])
	}, [''])

	return (
		<Main>
			<VersionStatus
				isNew={$panel.isNew}
				Beta={$panel.Beta}
				UpdateTime={$panel[$panel.Beta ? 'betaUptime' : 'Uptime']}
			/>
			<CurrentVersion
				isNew={$panel.isNew}
				Beta={$panel.Beta}
				version={$panel.version}
			/>
			<Logs
				Beta={$panel.Beta}
				VersionLogs={$panel.VersionLogs}
				betaVersionLogs={$panel.betaVersionLogs}
				versionId={$panel.VersionId}
				betaVersionId={$panel.betaVersionId}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 500px;
	height: 282px;
	padding: 0 15px 8px;
`
