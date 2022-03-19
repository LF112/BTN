import React from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ components ]

//=> DOM
export default (props: any) => {
	const { text, color = '#fff', data, noPoint } = props

	return (
		<LegendCard>
			<LegendInfo color={color}>
				{noPoint ? <></> : <div />}
				<p>{text}</p>
			</LegendInfo>
			<LegendData>
				<p>{data}</p>
			</LegendData>
		</LegendCard>
	)
}

//=> Style
const LegendCard = styled(DefaultCard)`
	width: 100%;
	min-width: auto;
	height: 45px;
	background: #2c313c;
	padding: 8px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`

const LegendInfo = styled.div<{ color: string }>`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	> div {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: ${props => props.color};
	}
	> p {
		font-size: 12px;
		color: ${props => props.color};
		font-family: 'HarmonyOS';
		line-height: 1;
	}
`

const LegendData = styled.div`
	width: 100%;
	text-align: center;
	margin-top: 5px;
	> p {
		font-size: 12px;
		color: #79869c;
		font-family: 'Russo One';
		line-height: 1;
	}
`
