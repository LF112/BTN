/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '@nanostores/react'
//[ package ]

import { _ripplesMask } from 'store/animation'
//[ hooks ]

//=> DOM
export default (props: any) => {
	const { child } = props
	const { show, x, y } = useStore(_ripplesMask)
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
				{child}
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
