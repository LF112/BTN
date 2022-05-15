import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { onClick, icon, style = {}, onMouseLeave } = props

	return (
		<Main style={style} onClick={onClick} onMouseLeave={onMouseLeave}>
			{icon}
		</Main>
	)
}

//=> Style
const Main = styled.button`
	min-width: 20px;
	height: 20px;
	padding: 3px;
	border-radius: 5px;
	background: #2f353d;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	> i {
		color: #c5c5c5;
		font-size: 16px;
		line-height: 1;
	}
	> span {
		color: #c5c5c5;
		font-size: 14px;
		line-height: 1;
		margin-top: 3px;
	}
	&:hover {
		transform: scale(0.96);
		background: #2a2f36;
	}
`
