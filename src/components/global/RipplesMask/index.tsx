import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { useRipplesMask } from 'state/animation/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const [show, x, y] = useRipplesMask()
	const [_style, updateStyle] = useState<object>({})

	useEffect(() => {
		if (show)
			setTimeout(() => {
				updateStyle({
					transform: `scale(1000)`
				})
			}, 10)
		else updateStyle({})
	}, [show])

	return (
		<Main style={{ display: show ? 'block' : 'none' }}>
			<div>
				<div
					style={{
						left: `${x}px`,
						top: `${y}px`,
						opacity: show ? 1 : 0,
						..._style
					}}></div>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: 20;
	> div {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 8px 8px 0 0;
		> div {
			width: 5px;
			height: 5px;
			position: relative;
			background: #282c34;
			border-radius: 100%;
			opacity: 0;
			transition: transform 2.6s cubic-bezier(0.22, 0.58, 0.12, 0.98);
		}
	}
`
