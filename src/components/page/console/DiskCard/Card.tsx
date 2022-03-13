import React from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import { BadgeIcon, Text } from 'components/reusable/BadgeIcon'
import Progress from 'components/reusable/Progress'
//[ components ]

import { ReactComponent as DriveIcon } from 'assets/svg/global_drive.svg'
//[ assets ]

//=> DOM
export default () => {
	return (
		<Card>
			<Icon>
				<DriveIcon />
			</Icon>
			<Info>
				<Title>
					<h1>/</h1>
					<NBadgeIcon>
						<NText>/dev/vda1</NText>
					</NBadgeIcon>
				</Title>
				<Progress
					value={0}
					style={{ marginTop: '6px', marginLeft: '-4px' }}
					percentage={true}
				/>
			</Info>
			<Inode>
				<div>
					<p>INODE</p>
					<Progress
						value={0}
						style={{
							transform: 'rotate(90deg)',
							right: '-18px',
							width: '55px',
							position: 'absolute'
						}}
						style2={{ padding: '6px 5px' }}
						sticky={'0 0 8px 8px'}
					/>
				</div>
			</Inode>
		</Card>
	)
}

//=> Style
const Card = styled(DefaultCard)`
	width: 100%;
	height: 75px;
	display: flex;
	align-items: center;
	padding: 10px;
`

const Icon = styled.div`
	width: 50px;
	height: 50px;
	padding: 5px;
	border-radius: 8px;
	background: #21252b;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	> svg {
		margin-top: 2px;
	}
`

const Info = styled.div`
	width: calc(100% - 80px);
	height: 100%;
	padding: 4px 5px;
	margin-left: 10px;
`

const Title = styled.header`
	width: 100%;
	height: 25px;
	display: flex;
	align-items: center;
	> h1 {
		font-family: 'Geometos', 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
		font-size: 14px;
		color: #fff;
	}
`

const NBadgeIcon = styled(BadgeIcon)`
	height: 20px;
	padding: 2px 5px;
	margin-left: 10px;
	background: #333842;
	user-select: auto;
`

const NText = styled(Text)`
	font-size: 12px;
	font-family: 'HarmonyOS';
`

const Inode = styled.div`
	position: absolute;
	right: 0;
	width: 35px;
	height: 55px;
	> div {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		> p {
			position: absolute;
			writing-mode: vertical-lr;
			font-family: 'HarmonyOS';
			line-height: 1;
			font-size: 12px;
			color: #79869c;
			margin-left: 2px;
		}
	}
	user-select: none;
`
