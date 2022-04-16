import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import LegendCard from 'components/reusable/LegendCard'
import Chart from 'components/reusable/Chart'
//[ components ]

import { bytesToSize } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { data } = props
	const _mb = 1048576

	const [readBytes, setReadBytes] = useState<number>(0)
	const [writeBytes, setWriteBytes] = useState<number>(0)
	const [RWEC, setRWEC] = useState<number>(0)
	const [ioTime, setIoTime] = useState<number>(0)
	const [up, setUp] = useState<string>('0')
	const [down, setDown] = useState<string>('0')
	const [other, setOther] = useState<any[]>([
		{ seriesName: '读取次数', data: '0 次/秒', color: 'transparent' },
		{ seriesName: '写入次数', data: '0 次/秒', color: 'transparent' },
		{ seriesName: '合并读取次数', data: '0 次/秒', color: 'transparent' },
		{ seriesName: '合并写入次数', data: '0 次/秒', color: 'transparent' },
		{ seriesName: '读取延迟', data: '0 ms', color: 'transparent' },
		{ seriesName: '写入延迟', data: '0 ms', color: 'transparent' }
	])
	useEffect(() => {
		const {
			read_bytes,
			read_count,
			read_time,
			write_bytes,
			write_count,
			write_time,
			read_merged_count,
			write_merged_count
		} = data['ALL']
		setReadBytes(bytesToSize(read_bytes))
		setWriteBytes(bytesToSize(write_bytes))
		setRWEC(read_count + write_count)
		setIoTime(write_time > read_time ? write_time : read_time)
		setUp((read_bytes / _mb).toFixed(2))
		setDown((write_bytes / _mb).toFixed(2))
		other[0].data = `${read_count} 次/秒`
		other[1].data = `${write_count} 次/秒`
		other[2].data = `${read_merged_count} 次/秒`
		other[3].data = `${write_merged_count} 次/秒`
		other[4].data = `${read_time} ms`
		other[4].color = chooseColor(read_time)
		other[5].data = `${write_time} ms`
		other[5].color = chooseColor(write_time)
		setOther(other)
	}, [data])

	//=> 处理颜色
	const chooseColor = (data: number): string =>
		data > 100 && data < 1000 ? '#d79736' : data >= 1000 ? '#ca4324' : '#36d794'

	return (
		<Main>
			<Left>
				<Text>磁盘 IO</Text>
				<LegendContainer>
					<LegendCard
						text={'读取'}
						data={readBytes}
						color={'#36d7ae'}
						icon={'el-icon-view'}
					/>
					<LegendCard
						text={'写入'}
						data={writeBytes}
						color={'#ca4a24'}
						icon={'el-icon-edit'}
					/>
					<LegendCard
						text={'每秒读写'}
						data={`${RWEC} 次`}
						color={'#16a3a8'}
						noPoint={true}
						icon={'el-icon-folder-opened'}
					/>
					<LegendCard
						text={'IO 延迟'}
						data={`${ioTime} ms`}
						color={'#d3d336'}
						noPoint={true}
						icon={'el-icon-link'}
						textColor={chooseColor(ioTime)}
					/>
				</LegendContainer>
			</Left>
			<Right>
				<Chart
					up={up}
					down={down}
					color={['#36d794', '#ca4324']}
					areaColor={['54, 211, 146', '211, 61, 54']}
					defSuffix={'MB'}
					other={other}
					tipsWidth={'175px'}
				/>
			</Right>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	height: 270px;
	width: 100%;
	margin-top: 5px;
	margin-bottom: 10px;
	padding: 15px;
	user-select: none;
	display: flex;
`

const Text = styled.h1`
	font-size: 16px;
	color: #fff;
	font-family: 'Geometos', 'HarmonyOS';
	line-height: 1;
	font-weight: lighter;
`

const Left = styled.main`
	width: 75px;
	height: 100%;
`

const Right = styled.main`
	width: calc(100% - 85px);
	height: 100%;
	margin-left: 10px;
`

const LegendContainer = styled.div`
	width: 100%;
	height: calc(100% - 25px);
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`
