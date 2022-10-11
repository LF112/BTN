/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { onClick, text, last, first, tag, status = -3, style = {} } = props
	const [clicked, updateClicked] = useState<boolean>(false)

	//=> 描边海浪动画
	let animationTimer: any = null
	useEffect(() => {
		if (animationTimer !== null) {
			clearTimeout(animationTimer)
			updateClicked(false)
			animationTimer = null
		}
		requestAnimationFrame(() => {
			animationTimer = setTimeout(() => {
				updateClicked(false)
				animationTimer = null
			}, 500)
		})
		return () => {
			if (animationTimer !== null) clearTimeout(animationTimer)
		}
	}, [clicked])

	//=> 被动按钮动画
	const [maskReady, setMaskReady] = useState<boolean>(false)
	const [showMask, setShowMask] = useState<boolean>(false)
	const [showLoad, setShowLoad] = useState<boolean>(false)
	const [showSuccess, setShowSuccess] = useState<boolean>(false)
	const [showError, setShowError] = useState<boolean>(false)
	const [lock, setLock] = useState<boolean>(false)
	useEffect(() => {
		if (status === -2) setMaskReady(true)
		if (status === -1) {
			if (!showMask) setShowMask(true)
			if (showSuccess) setShowSuccess(false)
			if (showError) setShowError(false)
			setShowLoad(true)
			setLock(true)
		} else if (status === 1) {
			if (!showMask) setShowMask(true)
			if (showLoad) setShowLoad(false)
			if (showError) setShowError(false)
			setShowSuccess(true)
			setLock(true)
		} else if (status === 0) {
			if (!showMask) setShowMask(true)
			if (showLoad) setShowLoad(false)
			if (showSuccess) setShowSuccess(false)
			setShowError(true)
			setLock(true)
		} else {
			setShowMask(false)
			setLock(false)
		}

		if (status === 0 || status === 1)
			setTimeout(() => {
				setShowMask(false)
				if (showLoad) setShowLoad(false)
				if (showError) setShowError(false)
				if (showSuccess) setShowSuccess(false)
				setLock(false)
			}, 1500)
	}, [status])

	return (
		<Button
			style={style}
			onClick={(el: any) => {
				if (lock) el.preventDefault()
				else if (onClick) {
					onClick(el.target) as any
					//=> 触发描边波浪
					updateClicked(true)
				}
			}}>
			{first}
			<p>{text}</p>
			{last}
			{tag ? (
				<TagMark color={tag}>
					<div>
						<div />
					</div>
				</TagMark>
			) : (
				<></>
			)}
			<Diffusion
				style={{
					animationName: clicked
						? 'button-wave-spread,button-wave-opacity'
						: 'unset'
				}}
				aria-hidden='true'
			/>
			<Mask
				ready={maskReady}
				style={showMask ? { opacity: 1, pointerEvents: 'auto' } : {}}>
				<i
					style={{ opacity: showSuccess ? 1 : 0, color: '#36d7ae' }}
					className='el-icon-check'
				/>
				<i
					style={{ opacity: showError ? 1 : 0, color: '#ca4a24' }}
					className='el-icon-close'
				/>
				<i style={{ opacity: showLoad ? 1 : 0 }} className='el-icon-loading' />
			</Mask>
		</Button>
	)
}

//=> Style
const Button = styled.button`
	position: relative;
	background: #2f353d;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	padding: 8px 10px;
	font-size: 14px;
	border-radius: 4px;
	outline: none;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	> p {
		color: #fff;
		font-size: 14px;
		font-family: 'HarmonyOS';
		margin: 0 8px;
		user-select: none;
	}

	svg {
		width: 18px;
		height: 18px;
		font-size: 16px;
		fill: #fff;
	}

	&:hover {
		transform: scale(0.96);
		background: #2a2f36;
		* {
			color: hsl(0deg, 0%, 100%, 82%);
		}
	}
	&:active {
		transform: scale(1);
		background: #2c3138;
		* {
			color: #fff;
		}
	}
`

const Diffusion = styled.hr`
	position: absolute;
	pointer-events: none;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	animation-iteration-count: 1;
	animation-duration: 0.6s;
	animation-timing-function: cubic-bezier(0, 0, 0.2, 1),
		cubic-bezier(0, 0, 0.2, 1);
	border-radius: inherit;
	@keyframes button-wave-spread {
		from {
			box-shadow: 0 0 0.5px 0 #4d5766; // #30363e
		}
		to {
			box-shadow: 0 0 0.5px 4.5px #4d5766; // #3d454f
		}
	}

	@keyframes button-wave-opacity {
		from {
			opacity: 0.6;
		}
		to {
			opacity: 0;
		}
	}
`

const TagMark = styled.div<{ color: string }>`
	position: absolute;
	bottom: 0;
	height: 3px;
	width: 100%;
	> div {
		margin: 0 auto;
		width: 30px;
		height: 3px;
		border-radius: 2px 2px 0 0;
		overflow: hidden;
		background: ${props => (props.color ? '#21252b' : 'unset')};
		> div {
			width: 100%;
			height: 100%;
			background: ${props => props.color};
			animation-name: breath;
			animation-duration: 3s;
			animation-timing-function: ease-in-out;
			animation-iteration-count: infinite;
		}
	}
	@keyframes breath {
		from {
			opacity: 0.2;
		}
		50% {
			opacity: 0.8;
		}
		to {
			opacity: 0.2;
		}
	}
`

const Mask = styled.div<{ ready: boolean }>`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #2f353d;
	border-radius: 4px;
	opacity: 0;
	pointer-events: none;
	display: ${props => (props.ready ? 'flex' : 'none')};
	align-items: center;
	justify-content: center;
	> i {
		position: absolute;
		font-size: 18px;
		font-weight: bold;
		color: #fff;
		opacity: 0;
	}
`
