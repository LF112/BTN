/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import LegendCard from 'components/reusable/LegendCard'
import Chart from 'components/reusable/Chart'
//[ components ]

//=> DOM
export default (props: any) => {
	const { up, down, upTotal, downTotal } = props

	return (
		<Main>
			<Left>
				<Text>流量</Text>
				<LegendContainer>
					<LegendCard
						text={'上行'}
						data={`${up} KB`}
						color={'#d3d336'}
						icon={'el-icon-top-right'}
					/>
					<LegendCard
						text={'下行'}
						data={`${down} KB`}
						color={'#36d7ae'}
						icon={'el-icon-bottom-left'}
					/>
					<LegendCard
						text={'总发送'}
						data={upTotal}
						color={'#16a3a8'}
						noPoint={true}
						icon={'el-icon-arrow-up'}
					/>
					<LegendCard
						text={'总接收'}
						data={downTotal}
						color={'#ca4a24'}
						noPoint={true}
						icon={'el-icon-finished'}
					/>
				</LegendContainer>
			</Left>
			<Right>
				<Chart up={up} down={down} defSuffix={'Kb'} />
			</Right>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	height: 270px;
	width: 100%;
	margin-bottom: 10px;
	padding: 15px;
	user-select: none;
	display: flex;
	opacity: 0;
	animation: ScaleIn 0.25s forwards;
	animation-delay: 422ms;
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
