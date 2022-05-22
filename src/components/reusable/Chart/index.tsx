/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import {
	TitleComponent,
	TooltipComponent,
	GridComponent
} from 'echarts/components'
//[ package ]

//=> DOM
export default (props: any) => {
	const {
		up,
		down,
		other = [],
		color = ['#d3d336', '#36d1aa'],
		areaColor = ['211, 211, 54', '54, 215, 174'],
		defSuffix = '',
		tipsWidth = '145px'
	} = props

	//=> Chart DOM
	const node = useRef<HTMLDivElement>(null) as any

	//=> Chart Data
	const [xAxisData, setXAxisData] = useState<any[]>([]) // X
	// Y ↓
	const [upData, setUpData] = useState<any[]>([])
	const [downData, setDownData] = useState<any[]>([])

	//=> 侦测更新
	useEffect(() => {
		const { current: el } = node
		if (el) {
			//=> 获取时间
			const TIME = new Date()
			//=> 最大纵向数据
			const limit = 8
			if (upData.length >= limit) setUpData(upData.splice(0, 1))
			if (downData.length >= limit) setDownData(downData.splice(0, 1))
			if (xAxisData.length >= limit) setXAxisData(xAxisData.splice(0, 1))

			//=> Update Data
			setDownData([...downData, down])
			setUpData([...upData, up])
			setXAxisData([
				...xAxisData,
				`${TIME.getHours()}:${TIME.getMinutes()}:${TIME.getSeconds()}`
			])

			//=> 绘制数据
			const Echarts = el.getEchartsInstance()
			Echarts.setOption({
				xAxis: { data: xAxisData },
				series: [
					{ name: 'up', data: upData },
					{ name: 'down', data: downData }
				]
			})
		}
	}, [up, down])

	//=> 装载 ECharts
	echarts.use([
		TitleComponent,
		TooltipComponent,
		GridComponent,
		LineChart,
		CanvasRenderer
	])

	return (
		<Main>
			<ReactEChartsCore
				ref={node}
				echarts={echarts}
				option={{
					color: color,
					grid: { top: 8, right: 8, bottom: 24, left: 36 },
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: xAxisData,
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#333842',
								width: 1,
								type: 'solid'
							}
						}
					},
					yAxis: {
						type: 'value',
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: '#333842',
								width: 1,
								type: 'solid'
							}
						}
					},
					series: [
						{
							name: 'up',
							data: upData,
							circle: 'circle',
							type: 'line',
							smooth: true,
							showSymbol: false,
							sampling: 'average',
							symbolSize: 6,
							symbol: 'circle',
							areaStyle: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: `rgba(${areaColor[0]},.6)` },
										{ offset: 1, color: `rgba(${areaColor[0]},.2)` }
									],
									false
								)
							}
						},
						{
							name: 'down',
							data: downData,
							circle: 'circle',
							type: 'line',
							smooth: true,
							showSymbol: false,
							sampling: 'average',
							symbolSize: 6,
							symbol: 'circle',
							areaStyle: {
								color: new echarts.graphic.LinearGradient(
									0,
									0,
									0,
									1,
									[
										{ offset: 0, color: `rgba(${areaColor[1]},.6)` },
										{ offset: 1, color: `rgba(${areaColor[1]},.2)` }
									],
									false
								)
							}
						}
					],
					formatter: (config: any) => {
						let DOM = `<div style="width: ${tipsWidth};display: flex;flex-direction: column;justify-content: space-evenly;">`
						config = [...config, ...other]
						for (var i = 0; i < config.length; i++) {
							if (typeof config[i].data == 'undefined') return false
							DOM += `<div style="width: 100%;height: 18px;padding: 2px 0;display: flex;justify-content: space-between;align-items: center;"><div style="display: flex;align-items: center;"><div style="width: 8px;height:8px;background:${
								config[i].color
							};border-radius: 50%;"></div><p style="font-family: 'Geometos','HarmonyOS';line-height: 1;color: #79869c;font-size: 12px;margin-left: 4px;">${
								config[i].seriesName
							}</p></div><p style="font-family: 'Geometos';line-height: 1;color: #95a6c0;font-size: 12px">${parseFloat(
								config[i].data
							).toFixed(2)} ${defSuffix}/s</p></div>`
						}
						DOM += '</div>'

						return `<h1 style="font-family: 'HarmonyOS';font-size: 14px;color: #fff;line-height: 1;margin-bottom: 10px">${config[0].axisValue}</h1>${DOM}`
					},
					tooltip: {
						trigger: 'axis',
						backgroundColor: '#2c313c',
						borderColor: '#2c313c',
						padding: 10
					}
				}}
				lazyUpdate={true}
				style={{ height: '200px', width: '100%' }}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-end;
	justify-content: center;
`
