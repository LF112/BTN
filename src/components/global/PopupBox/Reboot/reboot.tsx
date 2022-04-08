import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import Button from 'components/reusable/Button'
import { DefaultCard } from 'components/reusable/Card'
import { ReactComponent as WaitToDo_ICON } from 'assets/svg/global_waittodo.svg'
import { ReactComponent as Running_ICON } from 'assets/svg/global_running.svg'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons'
//[ components ]

import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

import ClickHandler from './click'
import { BTFetch } from 'state/fetch/hooks'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { show, webserver, Close } = props
	const addPopup = useAddPopup()
	const $fetch = BTFetch()

	const [taskList, setTaskList] = useState<any[]>([
		{ task: '停止 Web 服务', run: -2 },
		{ task: '停止 MySQL 服务', run: -2 },
		{ task: '重启服务器', run: -2 }
	])
	const [light, setLight] = useState<number>(-1)
	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		addPopup: addPopup,
		$fetch: $fetch,
		setServerButtonStatus: setButtonStatus,
		SetTaskArr: setTaskList,
		TaskList: taskList,
		setLight: setLight,
		webserver: webserver,
		Close: Close
	})

	return (
		<Main
			style={{
				opacity: show ? 1 : 0,
				pointerEvents: show ? 'auto' : 'none'
			}}>
			<ButtonBar>
				<h2>在此处安全地重启服务器</h2>
				<Button
					text='立即重启'
					status={buttonStatus}
					onClick={() => CLICK.RebootServer()}
				/>
			</ButtonBar>
			<Task>
				{taskList.map((item: any, index: number) => {
					const run = item.run
					return (
						<div
							key={index}
							style={{ background: light === index ? '#333842' : 'unset' }}>
							{run === -2 ? (
								<WaitToDo_ICON />
							) : run === -1 ? (
								<Running_ICON
									style={{ animation: 'spin 1s linear infinite' }}
								/>
							) : run === 1 ? (
								<CheckOutlined style={{ color: '#36d7ae' }} />
							) : (
								<CloseOutlined style={{ color: '#b84827' }} />
							)}
							<p>{item.task}</p>
						</div>
					)
				})}
			</Task>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 2;
	padding: 0 15px 8px;
`

const ButtonBar = styled.div`
	width: 100%;
	height: 55px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	> h2 {
		font-size: 14px;
		color: #fff;
		font-family: 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
	}
	> button {
		background: #e94d1e;
		:hover {
			background: #c54119;
		}
	}
`

const Task = styled(DefaultCard)`
	width: 100%;
	height: 145px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	> div {
		width: 100%;
		height: 35px;
		display: flex;
		align-items: center;
		align-items: center;
		padding: 0 10px;
		border-radius: 5px;
		> svg,
		span {
			width: 16px;
			height: 16px;
			margin-right: 10px;
			font-size: 16px;
		}
		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
		> p {
			font-size: 14px;
			color: #fff;
			font-family: 'Geometos', 'HarmonyOS';
			line-height: 1;
			font-weight: lighter;
		}
	}
	> div + div {
		margin-top: 5px;
	}
`