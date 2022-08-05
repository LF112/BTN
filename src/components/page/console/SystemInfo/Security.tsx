import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SafetyCertificateOutlined } from '@ant-design/icons'
//[ package ]

import { useApiState, $ } from 'state2/api'
import { useUpdateLoadId } from 'state/popupbox/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const { riskList } = useApiState('security')
	const updateLoadId = useUpdateLoadId()

	const [riskCount, setRiskCount] = useState<number>(0)
	const _RiskList = $(riskList)
	useEffect(() => {
		const count = _RiskList?.length || 0
		if (count !== riskCount) setRiskCount(count)
	}, [_RiskList])

	return (
		<Main onClick={() => updateLoadId('SecurityPanel', '安全风险')}>
			<SecCount
				color0={riskCount > 0 ? '#ff5d2d' : '#36d794'}
				color={riskCount > 0 ? '#ca4324' : '#36d7ae'}>
				{riskCount}
			</SecCount>
			<h1>安全风险</h1>
			<SafetyCertificateOutlined />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: 5px;
	background: #22252c;
	box-shadow: 0 0 #0000, 0 0 #0000, inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
	overflow: hidden;
	display: flex;
	align-items: center;
	padding: 0 15px;
	cursor: pointer;
	> h1 {
		font-family: 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
		font-size: 16px;
		color: #fff;
	}
	> span {
		position: absolute;
		font-size: 42px !important;
		right: -10px;
		bottom: -20px;
		color: #333842 !important;
	}
	&:hover {
		transform: scale(0.98);
		background: #282c34;
	}
`

const SecCount = styled.div<{ color0: string; color: string }>`
	width: 25px;
	height: 18px;
	text-align: center;
	color: #fff;
	font-family: 'Teko';
	font-weight: bold;
	font-size: 14px;
	border-radius: 4px;
	background: ${({ color0, color }) =>
		`linear-gradient(90deg, ${color0} 2%, ${color} 105%)`};
	margin-right: 15px;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`
