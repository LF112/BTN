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

import { ID as _NID } from 'store/api/linkId'
import { BTFetch } from 'store/fetch'
import { useApiState, $ } from 'store/api'
import { useAddPopup } from 'store/popup'
//[ hooks ]

//=> DOM
export default () => {
	const $fetch = BTFetch()
	const { serverIP } = useApiState('panel')
	const addPopup = useAddPopup()

	return (
		<SetMain>
			<SetUpMainN>
				<div>
					<Input
						defaultValue={$(serverIP)}
						tips={'键入服务器 IP'}
						handleNext={async (
							text: string,
							done: (status?: boolean) => void
						) => {
							const { msg, status } = (await $fetch(_NID['SetServerLocalIP'], {
								address: text
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
					<SetUpTitle>服务器 IP</SetUpTitle>
				</div>
				<SetUpDescription>
					默认为公网 IP ，如为虚拟机测试则为虚拟机内网 IP
				</SetUpDescription>
			</SetUpMainN>
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 130ms;
`

const SetUpMainN = styled(SetUpMain)`
	> div {
		width: 400px;
	}
`
