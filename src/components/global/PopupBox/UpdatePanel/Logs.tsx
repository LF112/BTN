/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import Button from 'components/reusable/Button'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ components ]

import useToggle from 'utils/useToggle'
import { strLogsToArr } from 'utils/useTools'
//[ utils ]

import { LogColor } from 'constants/popupBox_consts'
//[ constants ]

//=> DOM
export default (props: any) => {
	const { Beta, VersionLogs, betaVersionLogs, betaVersionId, versionId } = props

	const [Switch, toggle] = useToggle(Beta)
	const [BetaLogs, setBetaLogs] = useState<any[]>([])
	const [FormalLogs, setFormalLogs] = useState<any[]>([])
	useEffect(() => {
		if (VersionLogs && betaVersionLogs) {
			setBetaLogs(strLogsToArr(betaVersionLogs))
			setFormalLogs(strLogsToArr(VersionLogs))
		}
	}, [VersionLogs, betaVersionLogs])

	const node = useRef<HTMLDivElement>(null)
	const [BScrollCore, setBScroll] = useState<BScroll | null>(null)
	useEffect(() => {
		if (node) {
			const DOM = node.current
			//=> 装载 BetterScroll
			BScroll.use(MouseWheel)
			setTimeout(
				() =>
					setBScroll(
						new BScroll(DOM, {
							scrollX: false,
							scrollY: true,
							mouseWheel: true
						})
					),
				516
			)
		}
	}, [node])

	useEffect(() => {
		if (BScrollCore) {
			BScrollCore.refresh()
			BScrollCore.scrollTo(0, 0)
		}
	}, [Switch])

	const LogsCard = (Arr: any[]) => {
		return Arr.map((item: any, index: number) => {
			const TypeColor = LogColor[item.type]
			return (
				<div key={index}>
					<nav
						style={{
							background: TypeColor ? TypeColor : '#487abb'
						}}>
						<p>{item.type}</p>
					</nav>
					<p>{item.content}</p>
				</div>
			)
		})
	}

	return (
		<Main>
			<LtFi1t1l2e>
				<h1>
					{Switch ? '测试版' : '正式版'}
					更新日志 V{Switch ? betaVersionId : versionId}
				</h1>
				<Button
					text={`查看${!Switch ? '测试版' : '正式版'}`}
					onClick={() => toggle()}
				/>
			</LtFi1t1l2e>
			<Container ref={node}>
				<div
					style={{
						height: `${30 * (Switch ? BetaLogs : FormalLogs).length + 30}px`
					}}>
					<LogsBox
						style={{
							opacity: Switch ? 1 : 0,
							pointerEvents: Switch ? 'auto' : 'none'
						}}>
						{LogsCard(BetaLogs)}
					</LogsBox>
					<LogsBox
						style={{
							opacity: !Switch ? 1 : 0,
							pointerEvents: !Switch ? 'auto' : 'none'
						}}>
						{LogsCard(FormalLogs)}
					</LogsBox>
				</div>
				<OverflowMask
					showMask={true}
					bottom={true}
					style={{
						background: 'linear-gradient(0deg, #2b313c 1%, transparent)'
					}}
				/>
			</Container>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	width: 100%;
	height: 156px;
	border-radius: 5px;
	background: #2c313c;
	margin-top: 8px;
	padding: 10px;
`

const LtFi1t1l2e = styled.div`
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> h1 {
		color: #fff;
		font-size: 14px;
		line-height: 1;
		font-family: 'HarmonyOS';
	}
	> button {
		transform: scale(0.8);
		margin-right: -10px;
		&:hover {
			transform: scale(0.76);
		}
	}
`

const Container = styled.div`
	position: relative;
	width: 100%;
	height: 100px;
	margin-top: 10px;
	overflow: hidden;
`

const LogsBox = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	> div {
		width: 100%;
		height: 20px;
		display: flex;
		align-items: center;
		> nav {
			width: 35px;
			height: 20px;
			border-radius: 2px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-right: 10px;
			user-select: none;
		}
		p {
			font-family: 'Saira', 'Noto Sans SC';
			font-weight: 800;
			letter-spacing: 0.6px;
			line-height: 1;
			font-size: 12px;
			color: #fff;
		}
	}
	> div + div {
		margin-top: 10px;
	}
`
