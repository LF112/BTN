/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'
import { useStore } from '@nanostores/react'
//[ package ]

import WarnPane from 'components/reusable/WarnPane'
import Taskbar from 'components/reusable/Taskbar'
//[ components ]

import { ReactComponent as ICON_HeartRate } from 'assets/svg/global_heartrate.svg'

import { _apiStatus, _aimsJson, _rawJson } from 'state2/status'
import { setRipplesMask } from 'state2/animation'
//[ hooks ]

//=> DOM
export default () => {
	const apiStatus = useStore(_apiStatus)
	const aimsJson = useStore(_aimsJson)
	const rawJson = useStore(_rawJson)

	const node = useRef<HTMLElement>()

	const [UpdateNow, setUpdateNow] = useState(null)

	//=> API 请求异常时
	useEffect(() => {
		if (!apiStatus) {
			fastdom.measure(() => {
				const DOM = node.current
				const { style } = DOM

				//=> 展开遮罩 | '此处可做成根据鼠标位置展开，暂未实现'
				setRipplesMask(true, DOM)

				setTimeout(() => {
					style.opacity = '1'
					style.transform = 'scale(1)'
				}, 250)
			})
		}
		setUpdateNow(apiStatus)
	}, [apiStatus])

	return (
		<Main>
			<div ref={node as any}>
				<WarnPane
					icon={<ICON_HeartRate />}
					title={'喔唷，API 请求失败！'}
					content={
						<>
							<p>
								侦测到近一次请求中返回了异常的结果，已停用面板相关功能，待解决后将自动恢复。
							</p>
							<Taskbar
								rawJson={rawJson}
								aimsJson={aimsJson}
								UpdateNow={UpdateNow}
							/>
						</>
					}
				/>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-left: 225px;
	z-index: 1;
	> div {
		opacity: 0;
		transform: scale(0.8);
	}
`
