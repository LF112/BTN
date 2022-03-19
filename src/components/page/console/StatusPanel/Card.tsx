import React from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard as Main } from 'components/reusable/Card'
import Progress from 'components/reusable/Progress'
//[ components ]

//=> DOM
export default (props: any) => {
	const { title, tips, value, valueTips = '%', valueColor = null, icon } = props

	return (
		<Main>
			<Information>
				<InfoTitle>
					<h2>{title}</h2>
					<p style={valueColor ? { color: valueColor } : {}}>{tips}</p>
				</InfoTitle>
				<InfoDetail>
					<h1 style={valueColor ? { color: valueColor } : {}}>
						{value.toString()}
					</h1>
					<span style={valueColor ? { color: valueColor } : {}}>
						{valueTips}
					</span>
				</InfoDetail>
			</Information>
			<Progress
				value={value}
				style={{ height: 'calc(100% - 100px)' }}
				style2={{ width: '180px' }}
				sticky={'8px 8px 0 0'}
			/>
			<StatusICON>
				<i className={icon} />
			</StatusICON>
		</Main>
	)
}

//=> Style
const StatusICON = styled.div`
	position: absolute;
	min-height: 148px;
	bottom: -42px;
	right: -42px;
	z-index: 0;
	> i {
		color: #333842;
		font-size: 155px;
	}
`

//=> MAIN
const Information = styled.div`
	position: relative;
	width: 100%;
	height: 93px;
	padding: 0 12px;
	z-index: 10;
`

const InfoTitle = styled.div`
	height: 16px;
	margin: 8px 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	> h2,
	p {
		font-family: 'Geometos', 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
	}
	h2 {
		font-size: 16px;
		color: #fff;
	}
	p {
		font-size: 14px;
		color: #79869c;
	}
`

const InfoDetail = styled.div`
	width: 100%;
	height: calc(100% - 25px);
	display: flex;
	align-items: end;
	> h1 {
		font-size: 58px;
		line-height: 1;
		font-family: 'Russo One';
		color: #fff;
		margin-bottom: -9px;
		letter-spacing: 3px;
	}
	> span {
		font-size: 16px;
		color: #b1b7c3;
		line-height: 1;
		font-family: 'Geometos', 'HarmonyOS';
		margin-left: 8px;
	}
	user-select: none;
`
