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
	const { panelName } = useApiState('panel')
	const addPopup = useAddPopup()

	return (
		<SetMain>
			<SetUpMainN>
				<div>
					<Input
						defaultValue={$(panelName)}
						tips={'键入 WEB 面板网页别名'}
						handleNext={async (
							text: string,
							done: (status?: boolean) => void
						) => {
							const { msg, status } = (await $fetch(_NID['SetPanelTitle'], {
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
