import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import { BadgeIcon, Text } from 'components/reusable/BadgeIcon'
import Progress from 'components/reusable/Progress'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ components ]

import { ReactComponent as DriveIcon } from 'assets/svg/global_drive.svg'
//[ assets ]

//=> DOM
export default (props: any) => {
	const { data } = props

	const {
		path,
		filesystem,
		type,
		inodes: [, , , InodesValue],
		size: [SizeNum, SizeUsed, , SizeValue]
	} = data

	//=> 显示遮罩
	const titleBoxNode = useRef<HTMLDivElement>(null)
	const [showMask, updateShowMask] = useState<boolean>(false)
	useEffect(() => {
		if (titleBoxNode && type) {
			const DOM = titleBoxNode.current
			console.log(DOM.scrollWidth, DOM.clientWidth)
			if (DOM.scrollWidth > DOM.clientWidth) updateShowMask(!showMask)
		}
	}, [titleBoxNode, type])

	return (
		<Card>
			<Icon>
				<DriveIcon />
				<div>
					{SizeUsed} / {SizeNum}
				</div>
			</Icon>
			<Info>
				<Title ref={titleBoxNode}>
					<h1>{path}</h1>
					<NBadgeIcon>
						<NText>{type}</NText>
					</NBadgeIcon>
					<NBadgeIcon>
						<NText>{filesystem}</NText>
					</NBadgeIcon>
				</Title>
				<Progress
					value={~~SizeValue.replace('%', '')}
					style={{ marginTop: '6px', marginLeft: '-4px' }}
					percentage={true}
				/>
				<OverflowMask
					showMask={showMask}
					style={{ right: '10px', height: '20px', top: '4px' }}
					color={'#252930'}
				/>
			</Info>
			<Inode>
				<div>
					<p>INODE</p>
					<Progress
						value={~~InodesValue.replace('%', '')}
						style={{
							transform: 'rotate(-90deg)',
							right: '-18px',
							width: '55px',
							position: 'absolute'
						}}
						style2={{ padding: '6px 5px' }}
						sticky={'8px 8px 0 0'}
					/>
				</div>
			</Inode>
		</Card>
	)
}

//=> Style
const Card = styled(DefaultCard)`
	width: 100%;
	height: 78px;
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
	> div {
		font-family: 'HarmonyOS';
		color: #fff;
		position: absolute;
		top: 0;
		left: 0;
		padding: 4px 8px;
		font-size: 12px;
		border-radius: 10px 0 5px 0;
		line-height: 1;
		background: #2f353d;
		opacity: 0.8;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	}
`

const Info = styled.div`
	position: relative;
	width: calc(100% - 80px);
	height: 100%;
	padding: 4px 5px;
	margin-left: 10px;
`

const Title = styled.header`
	width: 185px;
	height: 25px;
	display: flex;
	align-items: center;
	overflow-x: auto;
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
