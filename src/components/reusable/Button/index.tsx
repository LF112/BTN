import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { onClick, text, last, first } = props
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

	return (
		<Button
			onClick={() => {
				if (onClick) onClick()
				//=> 触发描边海浪
				updateClicked(true)
			}}>
			{first}
			<p>{text}</p>
			{last}
			<Diffusion
				style={{
					animationName: clicked
						? 'button-wave-spread,button-wave-opacity'
						: 'unset'
				}}
				aria-hidden='true'
			/>
		</Button>
	)
}

//=> Style
const Button = styled.button`
	position: relative;
	background: #2f353d;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	padding: 8px 12px;
	font-size: 14px;
	border-radius: 4px;
	outline: none;
	line-height: 1;
	white-space: nowrap;
	cursor: pointer;
	> p {
		color: #fff;
		font-size: 14px;
		font-family: 'HarmonyOS';
		margin: 0 5px;
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
