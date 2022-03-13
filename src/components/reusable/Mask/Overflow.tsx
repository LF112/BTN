import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { showMask, color, style } = props

	return (
		<Overflow
			color={color}
			style={{ display: showMask ? 'block' : 'none', ...style }}
		/>
	)
}

//=> Style
const Overflow = styled.main<{ color: string }>`
	position: absolute;
	width: 30px;
	height: calc(100% - 16px);
	background: linear-gradient(
		269deg,
		${(props: any) => (props.color ? props.color : '#323842')} 1%,
		transparent
	);
	top: 0;
	right: 0;
	z-index: 10;
`
