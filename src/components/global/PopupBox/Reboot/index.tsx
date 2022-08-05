/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import Button from 'components/reusable/Button'
import { SyncOutlined } from '@ant-design/icons'
import Reboot from './reboot'
//[ components ]

import { useUpdateShow } from 'state/popupbox/hooks'
import { useUpdateApi, useApiState, $ } from 'store/api'
//[ hooks ]

import useToggle from 'utils/useToggle'

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { Close } = props
	const updateShow = useUpdateShow()
	const updateApi = useUpdateApi()
	const { webServer } = useApiState('system')

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
		updateApi(['system.webServer'])
	}, [''])

	const [showReboot, toggleShowReboot] = useToggle()
	const [panelButtonStatus, setPanelButtonStatus] = useState<number>(-2)
	const [serverButtonStatus, setServerButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		setPanelButtonStatus: setPanelButtonStatus,
		setServerButtonStatus: setServerButtonStatus
	})

	return (
		<Main>
			<div style={showReboot ? { opacity: 0, pointerEvents: 'none' } : {}}>
				<h1>选择需要进行的操作</h1>
				<ChooseReboot>
					<Button
						status={serverButtonStatus}
						text='重启服务器'
						onClick={() => toggleShowReboot()}
					/>
					<Button
						status={panelButtonStatus}
						text='重启面板'
						onClick={() => CLICK.RebootPanel()}
					/>
				</ChooseReboot>
			</div>
			<Reboot show={showReboot} webserver={$(webServer)} Close={Close} />
			<DecorateIcon />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 345px;
	height: 215px;
	padding: 0 15px 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		width: 100%;
		z-index: 1;
		> h1 {
			font-size: 20px;
			color: #fff;
			font-family: 'HarmonyOS';
			line-height: 1;
			font-weight: lighter;
			text-align: center;
			margin-bottom: 22px;
			user-select: none;
		}
	}
`

const ChooseReboot = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	> button:first-child {
		background: #e94d1e;
	}
	> button {
		padding: 12px 14px;
		> p {
			font-size: 16px;
		}
	}
`

const DecorateIcon = styled(SyncOutlined)`
	position: absolute;
	font-size: 265px;
	bottom: -75px;
	right: -75px;
	z-index: 0;
	color: #333842;
	animation: spin 5s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`
