import React from 'react'
import styled from 'styled-components'
//[ package ]

import SystemIcon from 'constants/systemIcon'
//[ constants ]

//=> DOM
export default (props: any) => {
	const { OS, OSArch } = props

	return (
		<SysIcon>
			{SystemIcon[OS]}
			<div>{OSArch}</div>
		</SysIcon>
	)
}

//=> Style
const SysIcon = styled.div`
	position: relative;
	width: 80px;
	height: 80px;
	border-radius: 8px;
	background: #21252b;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	display: flex;
	align-items: center;
	justify-content: center;
	> svg {
		width: 60px;
		height: 60px;
	}
	> div {
		font-family: 'Geometos';
		color: #fff;
		position: absolute;
		padding: 5px 8px;
		bottom: 5px;
		font-size: 12px;
		border-radius: 5px;
		line-height: 1;
		background: #2f353d;
		opacity: 0.8;
		box-shadow: 0px 2px 3px rgba(0, 0, 0, 15%);
	}
`
