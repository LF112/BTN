import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { icon, text } = props
	return (
		<BadgeIcon>
			{icon}
			<Text>{text}</Text>
		</BadgeIcon>
	)
}

//=> Style
export const BadgeIcon = styled.div`
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
	svg {
		width: 22px;
		height: 22px;
		margin-right: 5px;
		path {
			fill: #fff;
		}
	}
	i {
		color: #fff;
		margin-right: 5px;
	}
`

export const Text = styled.h2`
	font-family: 'Geometos', 'HarmonyOS';
	font-weight: 400;
	line-height: 1;
	font-size: 16px;
	color: #fff;
	margin-top: -2px;
`
