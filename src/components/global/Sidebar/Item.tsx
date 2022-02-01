import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
//[ package ]

//=> Component
export default (props: any) => {
	const { text, icon, path, location } = props.data

	const navigate = useNavigate()

	const clicked = location === path
	return (
		<MenuItem
			style={clicked ? { background: '#21242c', pointerEvents: 'none' } : {}}
			onClick={() => navigate(path)}>
			<FrameStrip style={{ opacity: clicked ? 1 : 0 }} />
			<div>
				<Icon>{icon}</Icon>
				<h2>{text}</h2>
			</div>
		</MenuItem>
	)
}

//=> Style Component
const MenuItem = styled.div`
	position: relative;
	width: 100%;
	height: 42px;
	border-radius: 5px;
	padding: 5px 16px;
	display: flex;
	align-items: center;
	cursor: pointer;
	> div {
		display: flex;
		align-items: center;
		> h2 {
			color: #fff;
			font-size: 15px;
			line-height: 1;
			font-family: 'HarmonyOS';
			margin-left: 20px;
		}
	}
	&:hover {
		background: #21242c;
		> nav {
			opacity: 1;
		}
		> div {
			transform: scale(0.95);
		}
	}
`

const Icon = styled.div`
	width: 24px;
	height: 24px;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	> span {
		font-size: 16px;
	}
	> i {
		font-size: 20px;
	}
`

const FrameStrip = styled.nav`
	position: absolute;
	left: 0;
	width: 4px;
	height: 68%;
	border-radius: 0 5px 5px 0;
	background: #444b58;
	opacity: 0;
`
