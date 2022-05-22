import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { showMask, color, style, bottom = false } = props

	return (
		<Overflow
			color={color}
			bottom={bottom}
			style={{ display: showMask ? 'block' : 'none', ...style }}
		/>
	)
}

//=> Style
const Overflow = styled.main<{ color: string; bottom: boolean }>`
	position: absolute;
	width: ${props => (props.bottom ? '100%' : '30px')};
	height: ${props => (props.bottom ? '30px' : '100%')};
	background: linear-gradient(
		${props => (props.bottom ? '0' : '269')}deg,
		${props => (props.color ? props.color : '#323842')} 1%,
		transparent
	);
	${props => (props.bottom ? 'bottom: 0;left: 0;' : 'top: 0;right: 0;')}
	z-index: 10;
`
