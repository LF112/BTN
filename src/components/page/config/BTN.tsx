import React from 'react'
import styled from 'styled-components'
import Package from '../../../../package.json'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ Components ]

import { ReactComponent as BTN_ICON } from 'assets/svg/global_btn.svg'

//=> DOM
export default () => {
	const [BTNVersion, BTNLastCommit] = Package.version.split('-')
	return (
		<Main>
			<BTN_ICON />
			<IconBackground />
			<VersionInfo>
				<h1>BT NEXT</h1>
				<p>
					V{BTNVersion}-
					<a
						target='_blank'
						href={`https://github.com/btnext/BTN/commit/${BTNLastCommit}`}>
						{BTNLastCommit}
					</a>
				</p>
				<div />
			</VersionInfo>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	width: 100%;
	min-width: 230px;
	height: 85px;
	padding: 8px;
	display: flex;
	align-items: center;
	> svg {
		width: 65px;
		height: 65px;
		z-index: 5;
	}
`

const VersionInfo = styled.div`
	position: relative;
	width: calc(100% - 73px);
	height: 100%;
	margin-left: 8px;
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: center;
	z-index: 5;
	> h1 {
		color: #fefefe;
		font-family: 'Geometos';
		font-weight: 400;
		line-height: 1;
		font-size: 20px;
	}
	> p {
		background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
		-webkit-background-clip: text;
		-webkit-box-decoration-break: clone;
		color: transparent;
		font-family: 'Saira';
		font-size: 12px;
		font-weight: bold;
		line-height: 1;
		margin-top: 5px;
		> a:hover {
			color: #7a808a;
		}
	}
	> div {
		position: absolute;
		right: -8px;
		width: 4px;
		height: 68%;
		border-radius: 5px 0 0 5px;
		background: #444b58;
	}
`

const IconBackground = styled.div`
	position: absolute;
	width: 115px;
	height: 115px;
	border-radius: 50%;
	background: #444b58;
	z-index: 0;
	left: -30px;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
`
