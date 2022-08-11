import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { title, show = false, onClick = () => {} } = props

	return (
		<Main onClick={onClick}>
			<Switch show={show}>
				<div />
			</Switch>
			<p>{title}</p>
			<FrameStrip show={show} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	height: 35px;
	background: #2f353d;
	padding: 0 15px;
	border-radius: 5px;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	cursor: pointer;
	> p {
		color: #fff;
		font-size: 14px;
		font-family: 'HarmonyOS';
		margin-top: 2px;
	}
	&:hover {
		transform: scale(0.98);
		background: #323840;
		> nav {
			> div {
				transform: scale(0.9);
				background: #3d454f;
			}
		}
	}
`

const Switch = styled.nav<{ show: boolean }>`
	width: 20px;
	height: 20px;
	padding: 4px;
	margin-right: 15px;
	border-radius: 4px;
	background: #272b32;
	box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
	display: flex;
	align-items: center;
	justify-content: center;
	> div {
		width: 12px;
		height: 12px;
		border-radius: 2px;
		background: ${({ show }) => (show ? '#3d454f' : 'transparent')};
	}
`

const FrameStrip = styled.nav<{ show: boolean }>`
	position: absolute;
	left: 0;
	width: ${({ show }) => (show ? '4px' : '0')};
	height: 68%;
	border-radius: 0 4px 4px 0;
	background: #26292e;
	z-index: 10;
	box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`
