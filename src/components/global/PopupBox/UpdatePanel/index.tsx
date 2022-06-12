/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
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
			'panel.isNew',
			'panel.betaVersionId',
			'panel.VersionId',
			'panel.betaVersionLogs',
			'panel.VersionLogs',
			'panel.betaUptime',
			'panel.Uptime'
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
