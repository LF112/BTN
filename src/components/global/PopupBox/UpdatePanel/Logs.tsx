import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import Button from 'components/reusable/Button'
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
			<Container>
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
`

const LogsBox = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	overflow-y: auto;
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
			font-weight: 400;
			line-height: 1;
			font-size: 12px;
			color: #fff;
		}
	}
	> div + div {
		margin-top: 10px;
	}
`
