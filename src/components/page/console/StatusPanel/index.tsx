import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
//[ package ]

import StatusCard from 'components/page/console/StatusPanel/Card'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ components ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { getStatusDisplay } from 'utils/useTools'

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
			if (DOM.scrollWidth > DOM.clientWidth) updateShowMask(!showMask)
		}
	}, [cardBoxNode])

	return (
		<Main>
			<CardBox ref={cardBoxNode} showMask={showMask}>
				<StatusCard
					title={'负载状态'}
					tips={$loadStatus.title}
					value={$load || 0}
					valueColor={$loadStatus.color}
					icon={'el-icon-odometer'}
				/>
				<StatusCard
					title={'CPU 使用率'}
					tips={`${cpu[1]} 核心`}
					value={cpu[0] || 0}
					valueColor={$cpuColor}
					icon={'el-icon-cpu'}
				/>
				<StatusCard
					title={'内存使用率'}
					tips={`${memRealUsed} / ${memTotal} MB`}
					value={$mem || 0}
					valueColor={$memColor}
					icon={'el-icon-files'}
				/>
			</CardBox>
			<OverflowMask showMask={showMask} />
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
	display: flex;
	align-items: center;
	justify-content: space-between;
	overflow-x: auto;
	padding-bottom: 5px;
	${(props: any) => (props.showMask ? 'padding-right: 30px;' : '')}
	> main + main {
		margin-left: 10px;
	}
`
