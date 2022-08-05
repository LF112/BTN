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
import Tips from 'components/page/config/Tips'
//[ Components ]

import { ID as _NID } from 'store/api/linkId'
import { useAddPopup } from 'state/popup/hooks'
import { BTFetch } from 'store/fetch'
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const addPopup = useAddPopup()

	return (
		<SetMain>
			<SetUpMain>
				<div>
					<Switch
						toggleSwitch={(
							Switch: boolean,
							Toggle: (specify?: boolean) => void,
							setLoading: (specify: boolean) => void
						) => {
							// 直接在组件中处理 | '我觉得这个代码很短，没必要多建个文件放到里面的样子'
							setLoading(true)
							addPopup(
								'关闭面板将无法访问面板，是否继续',
								'choose',
								async (close: () => void, choose: boolean) => {
									if (choose) {
										//=> 确认关闭
										const { msg, status } = (await $fetch(
											_NID['ClosePanel']
										)) as any
										if (status) {
											close()
											setLoading(false)
											addPopup('面板已关闭', 'success', 1500)
										} else {
											addPopup(msg, 'warn', 1500)
											setLoading(false)
										}
									} else {
										//=> 取消关闭
										close()
										setLoading(false)
										Toggle(false)
									}
								}
							)
						}}
					/>
					<SetUpTitle>关闭面板</SetUpTitle>
				</div>
				<SetUpDescription>
					仅关闭当前面板的 WEB 端服务，不影响服务器其他业务的正常运行
				</SetUpDescription>
			</SetUpMain>
			<Tips
				text='您仍可以执行此命令来启用面板。'
				code={'rm -f /www/server/panel/data/close.pl'}
			/>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
`
