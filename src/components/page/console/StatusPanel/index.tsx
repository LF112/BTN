/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
//[ package ]

import StatusCard from 'components/page/console/StatusPanel/Card'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ components ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { getStatusDisplay } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	const {
		load: { one, max }
	} = useApiState('system')
	const { cpu } = useApiState('cpu')
	const {
		mem: { memRealUsed, memTotal }
	} = useApiState('memory')

	//=> 处理负载状态
	const [$load, updateLoad] = useState<number>(0) // 负载状态
	const [$loadStatus, updateLoadStatus] = useState<object>({
		title: '-',
		color: null
	}) as any // 负载状态文字 / 颜色
	useEffect(() => {
		//=> 负载数值
		const newLoad =
			Math.round((one / max) * 100) > 100 ? 100 : Math.round((one / max) * 100)
		const loadIndex = Math.round((one / max) * 100)
		updateLoad(newLoad < 0 ? 0 : newLoad) // 更新负载数值
		//=> 负载状态
		getStatusDisplay(loadIndex, updateLoadStatus)
	}, [one, max])

	//=> 处理 CPU 使用率
	const [{ color: $cpuColor }, updateCpuStatus] = useState<object>({
		color: null
	}) as any // CPU 状态颜色
	useEffect(() => {
		getStatusDisplay(cpu[0], updateCpuStatus)
	}, [cpu[0]])

	//=> 处理内存使用率
	const [$mem, updateMem] = useState<number>(0)
	const [{ color: $memColor }, updateMemStatus] = useState<object>({
		color: null
	}) as any // 内存状态颜色
	useEffect(() => {
		const newMem = Math.round((memRealUsed / memTotal) * 1000) / 10
		updateMem(newMem) // 更新内存使用率
	}, [memRealUsed, memTotal])

	//=> 显示遮罩
	const cardBoxNode = useRef<HTMLDivElement>(null)
	const [showMask, updateShowMask] = useState<boolean>(false)
	useEffect(() => {
		if (cardBoxNode) {
			const DOM = cardBoxNode.current
			if (DOM.scrollWidth > DOM.clientWidth) {
				updateShowMask(!showMask)

				//=> 装载 BetterScroll
				BScroll.use(MouseWheel)
				setTimeout(
					() =>
						new BScroll(DOM, {
							scrollX: true,
							scrollY: false,
							mouseWheel: true
						}),
					516
				)
			}
		}
	}, [cardBoxNode])

	return (
		<Main>
			<CardBox ref={cardBoxNode} showMask={showMask}>
				<div style={{ width: showMask ? `${3 * 272 + 35}px` : '100%' }}>
					<StatusCard
						title={'负载状态'}
						tips={$loadStatus.title}
						value={$load || 0}
						valueColor={$loadStatus.color}
						icon={'el-icon-odometer'}
						style={{
							opacity: 0,
							animation: 'ScaleIn 0.25s forwards',
							animationDelay: '299ms'
						}}
					/>
					<StatusCard
						title={'CPU 使用率'}
						tips={`${cpu[1]} 核心`}
						value={cpu[0] || 0}
						valueColor={$cpuColor}
						icon={'el-icon-cpu'}
						style={{
							opacity: 0,
							animation: 'ScaleIn 0.25s forwards',
							animationDelay: '340ms'
						}}
					/>
					<StatusCard
						title={'内存使用率'}
						tips={`${memRealUsed} / ${memTotal} MB`}
						value={$mem || 0}
						valueColor={$memColor}
						icon={'el-icon-files'}
						style={{
							opacity: 0,
							animation: 'ScaleIn 0.25s forwards',
							animationDelay: '381ms'
						}}
					/>
				</div>
				<OverflowMask showMask={showMask} />
			</CardBox>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 152px;
	margin-top: 10px;
`

const CardBox = styled.div<{ showMask: boolean }>`
	width: 100%;
	height: 100%;
	overflow: hidden;
	white-space: nowrap;
	padding-bottom: 5px;
	> div {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		${(props: any) => (props.showMask ? 'padding-right: 35px' : '')};
		> main + main {
			margin-left: 10px;
		}
	}
`
