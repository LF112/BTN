/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

import Switch from 'components/reusable/Switch'
import {
	Main,
	SetUpMain,
	SetUpTitle,
	SetUpDescription
} from 'components/page/config/ReusableComponents'
//[ Components ]

import { ID as _NID } from 'store/api/linkId'
import { useAddPopup } from 'store/popup'
import { BTFetch } from 'store/fetch'
import { useApiState, $ } from 'store/api'
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const { panelLocalMode } = useApiState('panel')
	const addPopup = useAddPopup()

	return (
		<SetMain>
			<SetUpMain>
				<div>
					<Switch
						Default={$(panelLocalMode)}
						toggleSwitch={async (
							Switch: boolean,
							Toggle: (specify?: boolean) => void,
							setLoading: (specify: boolean) => void
						) => {
							setLoading(true)
							const { msg, status } = (await $fetch(_NID['SetLocal'])) as any
							if (status) {
								setLoading(false)
								addPopup(msg, 'success', 1500)
							} else {
								addPopup(msg, 'warn', 1500)
								setLoading(false)
							}
						}}
					/>
					<SetUpTitle>离线模式</SetUpTitle>
				</div>
				<SetUpDescription>
					离线模式下，面板更新、插件安装等联网服务将无法使用
				</SetUpDescription>
			</SetUpMain>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 66ms;
`
