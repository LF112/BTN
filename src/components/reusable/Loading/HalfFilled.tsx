/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> Pure Dom
export default (props: any) => {
	const {
		size,
		width = 2,
		color = '#fff',
		linear = false,
		limit = 10,
		speed = 2,
		lineSpeed = 1.5
	} = props

	return (
		<Loader size={size}>
			<Circular viewBox='25 25 50 50' speed={speed}>
				<Path
					lineSpeed={lineSpeed}
					cx='50'
					cy='50'
					r='20'
					fill='none'
					stroke={!linear ? color : 'url(#l)'}
					strokeWidth={width}
					strokeMiterlimit={limit}
				/>
				<defs>
					<linearGradient x1='8.042%' y1='0%' x2='65.682%' y2='23.865%' id='l'>
						<stop stopColor={color} stopOpacity='0' offset='0%'></stop>
						<stop stopColor={color} stopOpacity='.631' offset='63.146%'></stop>
						<stop stopColor={color} offset='100%'></stop>
					</linearGradient>
				</defs>
			</Circular>
		</Loader>
	)
}

//=> Style
const Loader = styled.div<{ size: number }>`
	position: relative;
	width: ${el => el.size}px;
	height: ${el => el.size}px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const Circular = styled.svg<{ speed: number }>`
	height: 100%;
	width: 100%;
	transform-origin: center center;
	animation: rotate ${el => el.speed}s linear infinite;
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}
`
const Path = styled.circle<{
	strokeWidth: number
	strokeMiterlimit: number
	lineSpeed: number
}>`
	stroke-width: ${el => el.strokeWidth}px;
	stroke-miterlimit: ${el => el.strokeMiterlimit};
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	animation: dash ${el => el.lineSpeed}s ease-in-out infinite;
	stroke-linecap: round;
	@keyframes dash {
		0% {
			stroke-dasharray: 1, 200;
			stroke-dashoffset: 0;
		}
		50% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -35px;
		}
		100% {
			stroke-dasharray: 89, 200;
			stroke-dashoffset: -124px;
		}
	}
`
