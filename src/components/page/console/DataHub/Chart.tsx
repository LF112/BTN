import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import ApexCharts from 'apexcharts'
//[ package ]

//=> DOM
export default (props: any) => {
	const { up, down } = props

	const node = useRef<HTMLDivElement>()
	const [Charts, newCharts] = useState(null) as any
	const [maxUpdate, setMaxUpdate] = useState(-1)

	useEffect(() => {
		const { current: el } = node

		const Chart = new ApexCharts(el, {
			series: [
				{
					name: 'up',
					data: []
				},
				{
					name: 'down',
					data: []
				}
			],
			colors: ['#d3d336', '#36d1aa'],
			chart: {
				type: 'area',
				height: 245,
				toolbar: {
					show: false
				},
				animations: {
					speed: 250
				},
				zoom: {
					enabled: false
				}
			},
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'straight',
				width: 2
			},
			grid: {
				borderColor: '#333842',
				xaxis: {
					lines: {
						show: true
					}
				}
			},
			xaxis: {
				tickAmount: 'dataPoints',
				type: 'datetime',
				labels: {
					style: {
						colors: '#79869c',
						fontFamily: 'Russo One',
						fontWeight: 'bold',
						fontSize: '12px'
					}
				},
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				}
			},
			yaxis: {
				forceNiceScale: true,
				labels: {
					formatter: (val: number) => val.toFixed(0),
					style: {
						colors: '#79869c',
						fontFamily: 'Russo One',
						fontWeight: 'bold',
						fontSize: '12px'
					}
				}
			},
			legend: { show: false },
			tooltip: {
				x: {
					show: false
				},
				y: {
					formatter: (value: string) => {
						return `${value} Kb/s`
					}
				}
			}
		})
		newCharts(Chart)
		Chart.render()
		return () => Chart.destroy()
	}, [])

	useEffect(() => {
		if (Charts) {
			const DATA = new Date().getTime()
			Charts.appendData([
				{
					name: 'up',
					data: [{ x: DATA, y: up }]
				},
				{
					name: 'down',
					data: [{ x: DATA, y: down }]
				}
			])
			Charts.updateOptions({
				xaxis: {
					min: new Date().getTime() - 16000,
					max: new Date().getTime()
				}
			})
		}
	}, [up, down])
	return (
		<Main>
			<div ref={node as any} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	/* * {
		transition: auto;
	} */
`
