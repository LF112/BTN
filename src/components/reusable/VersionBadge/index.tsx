import React from 'react'
import styled from 'styled-components'
//[ package ]

import { ReactComponent as FreeIcon } from 'assets/svg/global_link.svg'
//[ assets ]

//=> DOM
export default () => {
	return (
		<Icon>
			<FreeIcon />
			<VersionText>Free</VersionText>
		</Icon>
	)
}

//=> Style
const Icon = styled.div`
	position: relative;
	height: 30px;
	border-radius: 5px;
	background: #21252b;
	box-shadow: inset 0 -1px 0 rgba(27, 31, 35, 12%);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px 10px;
	user-select: none;
	> svg {
		width: 22px;
		height: 22px;
		margin-right: 5px;
	}
`

const VersionText = styled.h2`
	font-family: 'Geometos';
	font-weight: 400;
	line-height: 1;
	font-size: 16px;
	color: #fff;
	margin-top: -2px;
`
