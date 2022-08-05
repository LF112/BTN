import React from 'react'
import styled from 'styled-components'
//[ package ]

import {
	Main,
	SetUpMain,
	SetUpTitle,
	SetUpDescription
} from 'components/page/config/ReusableComponents'
import Input from 'components/reusable/Input'
//[ Components ]

import { ID as _NID } from 'state/api/linkId'
import { BTFetch } from 'store/fetch'
import { useApiState, $ } from 'store/api'
import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const { overTime } = useApiState('config')
	const addPopup = useAddPopup()

	const _overTime = $(overTime) || 0
	return (
		<SetMain>
			<SetUpMainN>
				<div>
					<Input
						defaultValue={String(_overTime)}
						tips={'键入面板登录状态超时时间'}
						type={'number'}
						max={86400}
						handleNext={async (
							text: string,
							done: (status?: boolean) => void
						) => {
							const { msg, status } = (await $fetch(_NID['SetOverTime'], {
								time: text
							})) as any
							if (status) {
								done()
								addPopup(msg, 'success', 1500)
							} else {
								addPopup(msg, 'warn', 1500)
								done(false)
							}
						}}
					/>
					<SetUpTitle>自动退出时间</SetUpTitle>
				</div>
				<SetUpDescription>
					{$(overTime)} 秒内无操作将自动退出登录
				</SetUpDescription>
			</SetUpMainN>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 114ms;
`

const SetUpMainN = styled(SetUpMain)`
	> div {
		width: 400px;
	}
`
