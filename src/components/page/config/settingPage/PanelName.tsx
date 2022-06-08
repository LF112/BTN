import React, { useEffect } from 'react'
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
import { BTFetch } from 'state/fetch/hooks'
import { useApiState, useUpdateApi } from 'state/api/hooks'
import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const { name } = useApiState('panel')
	const updateApi = useUpdateApi()
	const addPopup = useAddPopup()

	useEffect(() => {
		updateApi(['panel', 'name'])
	}, [''])

	return (
		<SetMain>
			<SetUpMainN>
				<div>
					<Input
						defaultValue={name}
						tips={'键入 WEB 面板网页别名'}
						handleNext={async (
							text: string,
							done: (status?: boolean) => void
						) => {
							//TODO: 此处请求会返回错误，宝塔并没有对此 API 参数解耦，待以插件形式解决
							const { msg, status } = (await $fetch(_NID['SetPanel'], {
								webname: text
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
					<SetUpTitle>面板别名</SetUpTitle>
				</div>
				<SetUpDescription>WEB 面板站点标题</SetUpDescription>
			</SetUpMainN>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 98ms;
`

const SetUpMainN = styled(SetUpMain)`
	> div {
		width: 400px;
	}
`
