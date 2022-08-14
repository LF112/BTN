/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { setRafInterval, clearRafInterval } from 'setRafTimeout'
import Countdown from 'react-countdown'
//[ package ]

import Button from 'components/reusable/Button'
//[ components ]

import { ReloadOutlined } from '@ant-design/icons'
//[ assets ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { apiStatus } = props

	const [text, setText] = useState<string>('即将自动重试')
	const [reConnectCountdown, setReConnectCountdown] = useState<number>(0)
	const [reConnectCount, setReConnectCount] = useState<number>(0)
	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		setText,
		setButtonStatus,
		setReConnectCountdown
	})

	useEffect(() => {
		if (!apiStatus) {
			setText('即将自动重试')
			setReConnectCountdown(1)
		}
	}, [apiStatus])

	return (
		<Main>
			<div>
				<h1>{text}</h1>
				{reConnectCountdown > 0 ? (
					<Countdown
						date={Date.now() + 1000 * reConnectCountdown}
						renderer={({ seconds }) => <h2>「 {seconds}s 」</h2>}
						onComplete={() => {
							//=> 仅自动重试 10 次
							if (reConnectCount <= 10) {
								//=> 首次自动重连
								if (reConnectCountdown === 1) CLICK.check()
								else if (reConnectCountdown === 5) {
									CLICK.check()
									//=> 第一次自动重试失败后
									if (!apiStatus && buttonStatus !== -1)
										setTimeout(() => {
											setReConnectCountdown(5)
										}, 5000)
								}

								setReConnectCount(reConnectCount + 1)
							} else setText('即将达到面板限制阈值，已停止自动重试。')

							setReConnectCountdown(0)
						}}
					/>
				) : (
					<></>
				)}
			</div>
			<Button
				text={'重新连接'}
				first={<ReloadOutlined />}
				status={buttonStatus}
				onClick={() => CLICK.check()}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div {
		display: flex;
		> h1,
		h2 {
			color: #525a6a;
			font-size: 14px;
			font-family: 'HarmonyOS';
			line-height: 1;
		}
		> h2 {
			color: #5d6576;
		}
	}
`
