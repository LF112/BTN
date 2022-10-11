import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
//[ package ]

//=> DOM
export default (props: any) => {
	const { children, height, style, hide = false } = props

	const node = useRef<HTMLDivElement>(null)
	const [BScrollCore, setBScroll] = useState<BScroll | null>(null)
	useEffect(() => {
		if (node) {
			const DOM = node.current
			//=> 装载 BetterScroll
			BScroll.use(MouseWheel)
			setTimeout(
				() =>
					setBScroll(
						new BScroll(DOM, {
							scrollX: false,
							scrollY: true,
							mouseWheel: true
						})
					),
				1516
			)
		}
	}, [node])

	useEffect(() => {
		if (BScrollCore) {
			BScrollCore.refresh()
			BScrollCore.scrollTo(0, 0)
		}
	}, [height])

	return (
		<Main ref={node} style={style} hide={hide}>
			<div style={{ height: height }}>{children}</div>
		</Main>
	)
}

//=> Style
const Main = styled.main<{ hide: boolean }>`
	position: relative;
	width: 100%;
	height: 100%;
	overflow: hidden;
	pointer-events: ${({ hide }) => (hide ? 'none' : 'auto')};
	opacity: ${({ hide }) => (hide ? 0 : 1)};
`
