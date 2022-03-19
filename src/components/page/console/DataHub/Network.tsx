import React from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import LegendCard from 'components/reusable/LegendCard'
//[ components ]

//=> DOM
export default (props: any) => {
	const { up, down, upTotal, downTotal } = props
	return (
		<Main>
			<Left>
				<Text>流量</Text>
				<LegendContainer>
					<LegendCard text={'上行'} data={`${up} KB`} color={'#d3d336'} />
					<LegendCard text={'下行'} data={`${down} KB`} color={'#36d7ae'} />
					<LegendCard
						text={'总发送'}
						data={upTotal}
						color={'#16a3a8'}
						noPoint={true}
					/>
					<LegendCard
						text={'总接收'}
						data={downTotal}
						color={'#ca4a24'}
						noPoint={true}
					/>
				</LegendContainer>
			</Left>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	height: 50%;
	width: 100%;
	margin-bottom: 10px;
	padding: 15px;
	user-select: none;
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

const LegendContainer = styled.div`
	width: 100%;
	height: calc(100% - 25px);
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`
