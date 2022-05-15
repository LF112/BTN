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

import { ID as _NID } from 'state/api/linkId'
import { useAddPopup, useClosePopup } from 'state/popup/hooks'
import { BTFetch } from 'state/fetch/hooks'
import { useApiState, useUpdateApi } from 'state/api/hooks'
//[ hooks ]
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const addPopup = useAddPopup()
	const closePopup = useClosePopup()
	const updateApi = useUpdateApi()

	const { ipv6 } = useApiState('config')

	return (
		<SetMain>
			<SetUpMain>
				<div>
					<Switch
						Default={ipv6}
						toggleSwitch={async (
							Switch: boolean,
							Toggle: (specify?: boolean) => void,
							setLoading: (specify: boolean) => void
						) => {
							// 直接在组件中处理 | '我觉得这个代码很短，没必要多建个文件放到里面的样子'
							setLoading(true)
							const { msg, status } = (await $fetch(_NID['ListenIPv6'])) as any
							if (status) {
								updateApi(['config', 'ipv6'])
								setLoading(false)
								addPopup(`已${ipv6 ? '禁用' : '启用'} IPv6 ！`, 'success', 1500)
							} else {
								addPopup(msg, 'warn', 1500)
								setLoading(false)
							}
						}}
					/>
					<SetUpTitle>面板 IPv6 访问支持</SetUpTitle>
				</div>
				<SetUpDescription>
					启用后，面板服务将监听 IPv6 地址，不支持 IPv6 请不要开启！
				</SetUpDescription>
			</SetUpMain>
			<Tips
				text='如不慎开启，请使用此命令关闭！'
				code={'rm -f /www/server/panel/data/ipv6.pl && /etc/init.d/bt restart'}
			/>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 41ms;
`
