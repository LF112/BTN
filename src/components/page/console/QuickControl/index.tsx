import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { RocketOutlined, ToolOutlined, ReloadOutlined } from '@ant-design/icons'
import Button from 'components/reusable/Button'
//[ components ]

import { useAddPopup } from 'state/popup/hooks'
import { useApiState } from 'state/api/hooks'
import { useUpdateLoadId } from 'state/popupbox/hooks'
import { BTFetch } from 'state/fetch/hooks'

//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default () => {
	const $panel = useApiState('panel')
	const updateLoadId = useUpdateLoadId()
	const $fetch = BTFetch()
	const addPopup = useAddPopup()

	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		$fetch: $fetch,
		addPopup: addPopup,
		setButtonStatus: setButtonStatus
	})

	return (
		<Main>
			<Button
				tag={$panel.isNew ? '#f44336' : null}
				first={<RocketOutlined />}
				text='更新'
				onClick={() => updateLoadId('UpdatePanel', '更新面板')}
				style={{
					opacity: 0,
					animation: 'ScaleIn 0.25s forwards',
					animationDelay: '48ms'
				}}
			/>
			<Button
				first={<ToolOutlined />}
				status={buttonStatus}
				text='修复'
				onClick={() => CLICK.RepairPanel()}
				style={{
					opacity: 0,
					animation: 'ScaleIn 0.25s forwards',
					animationDelay: '64ms'
				}}
			/>
			<Button
				first={<ReloadOutlined />}
				text='重启'
				onClick={() => updateLoadId('Reboot', '重启')}
				style={{
					opacity: 0,
					animation: 'ScaleIn 0.25s forwards',
					animationDelay: '80ms'
				}}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.header`
	position: relative;
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background: #282c34;
	box-shadow: rgba(26, 26, 26, 45%) 0px 1px 3px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 5px 10px;
	opacity: 0;
	animation: FadeIn 0.25s forwards;
	animation-delay: 32ms;
`
