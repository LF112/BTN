/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { RocketOutlined, ToolOutlined, ReloadOutlined } from '@ant-design/icons'
import Button from 'components/reusable/Button'
//[ components ]

import { useApiState, $ } from 'store/api'
import { popupOpen } from 'store/popupbox'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default () => {
	const { panelIsNew } = useApiState('panel')

	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		setButtonStatus: setButtonStatus
	})

	return (
		<Main>
			<Button
				tag={$(panelIsNew) ? '#f44336' : null}
				first={<RocketOutlined />}
				text='更新'
				onClick={() => popupOpen('UpdatePanel', '更新面板')}
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
				onClick={() => popupOpen('Reboot', '重启')}
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
