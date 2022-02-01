import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> Component
export default () => {
	return (
		<Footer>
			<BTN>BTN</BTN>
		</Footer>
	)
}

//=> Style Component
const Footer = styled.nav`
	width: 100%;
	height: 42px;
	display: flex;
	align-items: center;
	border-radius: 0 0 8px 8px;
	background: #21252b;
	padding: 2px 15px;
`

const BTN = styled.h1`
	font-size: 18px;
	-webkit-background-clip: text !important;
	-webkit-box-decoration-break: clone;
	color: transparent;
	background: linear-gradient(
		109deg,
		rgb(77 87 102),
		rgb(68 75 88),
		rgb(61 68 79),
		rgb(61 68 79)
	);

	font-family: 'Russo One';
	font-weight: 400;
	line-height: 1;
	letter-spacing: 2px;
	user-select: none;
	margin-top: 2px;
`
