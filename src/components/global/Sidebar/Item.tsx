/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useUpdatePageLoadStatus } from 'state/animation/hooks'
//[ package ]

//=> Component
export default (props: any) => {
	const { text, icon, path, location } = props.data

	const navigate = useNavigate()
	const setPageLoad = useUpdatePageLoadStatus()

	const clicked = location === path
	return (
		<MenuItem
			style={clicked ? { background: '#21242c', pointerEvents: 'none' } : {}}
			onClick={() => {
				setPageLoad(false)
				setTimeout(() => navigate(path), 250)
			}}>
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
			user-select: none;
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
