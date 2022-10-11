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

import { updateShow } from 'store/popupbox'
import { useUpdateApi, useApiState, $ } from 'store/api'
//[ hooks ]

import VersionStatus from './VersionStatus'
import CurrentVersion from './CurrentVersion'
import Logs from './Logs'
//[ components ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()
	const {
		panelIsNew,
		panelBetaVersion,
		panelNewVersion,
		panelBetaVersionLogs,
		panelNewVersionLogs,
		panelBetaVersionUptime,
		panelNewVersionUptime,
		panelBeta,
		panelVersion
	} = useApiState('panel')

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
		//=> 更新版本信息
		updateApi([
			'panel.panelVersion',
			'panel.panelBeta',
			'panel.panelIsNew',
			'panel.panelBetaVersion',
			'panel.panelNewVersion',
			'panel.panelBetaVersionLogs',
			'panel.panelNewVersionLogs',
			'panel.panelBetaVersionUptime',
			'panel.panelNewVersionUptime'
		])
	}, [''])

	const _IsNew = $(panelIsNew)
	const _Beta = $(panelBeta)
	return (
		<Main>
			<VersionStatus
				isNew={_IsNew}
				Beta={_Beta}
				UpdateTime={
					_Beta ? $(panelBetaVersionUptime) : $(panelNewVersionUptime)
				}
			/>
			<CurrentVersion isNew={_IsNew} Beta={_Beta} version={$(panelVersion)} />
			<Logs
				Beta={_Beta}
				VersionLogs={$(panelNewVersionLogs)}
				betaVersionLogs={$(panelBetaVersionLogs)}
				versionId={$(panelNewVersion)}
				betaVersionId={$(panelBetaVersion)}
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
