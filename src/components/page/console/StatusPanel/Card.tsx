import React from 'react'
import styled from 'styled-components'
//[ package ]

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
			<StateStrip>
				<div>
					<LineMask>
						<div style={{ width: `${value}%` }} />
					</LineMask>
				</div>
			</StateStrip>
			<StatusICON>
				<i className={icon} />
			</StatusICON>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 282px;
	height: 100%;
	padding: 8px 8px 0px 8px;
	background: #252930;
	border-radius: 10px;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	overflow: hidden;
`

const StatusICON = styled.div`
	position: absolute;
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

//=> FOOTER
const StateStrip = styled.div`
	position: relative;
	width: 100%;
	height: calc(100% - 100px);
	display: flex;
	justify-content: center;
	align-items: end;
	z-index: 10;
	> div {
		width: 180px;
		height: 18px;
		background: linear-gradient(109deg, #1f2229, #1d212b, #1f232c, #1a1d22);
		border-radius: 8px 8px 0 0;
		box-shadow: 0 -1px 2px -1px #15171c;
		padding: 6px 12px;
	}
`

const LineMask = styled.div`
	width: 100%;
	height: 100%;
	background: hsl(218deg, 13%, 17%, 85%);
	border-radius: 20px;
	> div {
		width: 0%;
		height: 100%;
		border-radius: 20px;
		background: linear-gradient(90.43deg, #33ceff 1.33%, #37d99f 105.76%);
	}
`
