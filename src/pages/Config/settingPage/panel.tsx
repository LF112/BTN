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

import ClosePanel from 'components/page/config/settingPage/ClosePanel'
import IPv6Support from 'components/page/config/settingPage/IPv6Support'
import OfflineMode from 'components/page/config/settingPage/OfflineMode'
import DevMode from 'components/page/config/settingPage/DevMode'
import PanelName from 'components/page/config/settingPage/PanelName'
//[ components ]

import { useUpdateApi } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()

	useEffect(() => {
		updateApi(['config.ipv6', 'panel.name'])
	}, [''])

	return (
		<Main>
			<ClosePanel />
			<IPv6Support />
			<OfflineMode />
			<DevMode />
			<PanelName />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	main + main {
		margin-top: 10px;
	}
`
