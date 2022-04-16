import React from 'react'
import styled from 'styled-components'
//[ package ]

//=> DOM
export default (props: any) => {
	const { icon, title, content } = props
	return (
		<Main>
			<Title>
				{icon}
				{title}
			</Title>
			<Content>{content}</Content>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 500px;
	height: 100%;
	border-radius: 5px;
	background: #22252c;
	box-shadow: rgba(26, 26, 26, 45%) 0px 1px 3px;
	padding: 15px 20px;
`

const Title = styled.h1`
	font-size: 20px;
	color: #fff;
	font-family: 'HarmonyOS';
	line-height: 1;
	user-select: none;
	display: flex;
	align-items: center;
	> svg {
		height: 22px;
		height: 22px;
		margin-top: 2px;
		margin-right: 10px;
	}
`

const Content = styled.div`
	width: 100%;
	padding: 15px 0;
	> p {
		font-family: 'HarmonyOS';
		line-height: 1;
		color: #fff;
		font-size: 12px;
	}
`
