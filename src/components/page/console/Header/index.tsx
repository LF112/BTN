import React from 'react'
import styled from 'styled-components'
//[ package ]

import { PayCircleOutlined, ThunderboltOutlined } from '@ant-design/icons'
import BadgeIcon from 'components/reusable/BadgeIcon'
import VersionInfo from 'components/page/console/Header/VersionInfo'
//[ components ]

import { ReactComponent as FreeIcon } from 'assets/svg/global_link.svg'
//[ assets ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const $panel = useApiState('panel')

	return (
		<Main>
			<PanelInfo>
				<HightTEXT>BT-Panel</HightTEXT>
				<Line />
				<VersionInfo />
			</PanelInfo>
			<BadgeList>
				<BadgeIcon
					icon={
						$panel.Pro > 0 ? (
							<ThunderboltOutlined />
						) : $panel.ltd > 0 ? (
							<PayCircleOutlined />
						) : (
							<FreeIcon />
						)
					}
					text={
						$panel.Pro > 0 ? '专业版' : $panel.Ltd > 0 ? '企业版' : '免费版'
					}
					style={{
						opacity: 0,
						animation: 'ScaleIn 0.25s forwards',
						animationDelay: '226ms'
					}}
				/>
				<BadgeIcon
					icon={<i className='el-icon-time' />}
					text={$panel.time}
					style={{
						opacity: 0,
						animation: 'ScaleIn 0.25s forwards',
						animationDelay: '258ms'
					}}
				/>
			</BadgeList>
		</Main>
	)
}

//=> Style
const Main = styled.header`
	position: relative;
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background: #282c34;
	box-shadow: rgba(26, 26, 26, 45%) 0px 1px 3px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 5px 10px;
	opacity: 0;
	animation: FadeIn 0.25s forwards;
`

const BadgeList = styled.div`
	display: flex;
	align-items: center;
	> div + div {
		margin-left: 10px;
	}
`

const PanelInfo = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	user-select: none;
`

const HightTEXT = styled.h1`
	font-family: 'Geometos';
	background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
	-webkit-background-clip: text;
	-webkit-box-decoration-break: clone;
	color: transparent;
	font-size: 20px;
	line-height: 1;
	margin-top: -4px;
	opacity: 0;
	animation: FadeIn 0.25s forwards;
	animation-delay: 41ms;
`

const Line = styled.hr`
	width: 2px;
	height: 20px;
	border-radius: 5px;
	background: #b2b7c2;
	margin: 0 15px;
	opacity: 0;
	animation: HeightIn 0.25s, FadeIn 0.25s forwards;
	animation-delay: 98ms;
`
