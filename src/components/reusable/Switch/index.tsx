import React from 'react'
import styled from 'styled-components'
//[ package ]

import useToggle from 'utils/useToggle'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { toggleSwitch = () => {} } = props

	const [Switch, toggle] = useToggle()
	const [locked, setLock] = useToggle()

	return (
		<Main
			click={!locked ? Switch : null}
			onClick={() => {
				toggle()
				toggleSwitch(!Switch, toggle, setLock)
			}}></Main>
	)
}

//=> Style
const Main = styled.div<{ click: boolean }>`
	position: relative;
	min-width: 50px;
	height: 22px;
	border-radius: 4px;
	border: 2px solid #323842;
	background: ${(props: any) => (props.click ? '#414754' : '#323842')};
	vertical-align: middle;
	cursor: pointer;
	transition: border-color 0.3s, background-color 0.3s;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	&:after {
		position: absolute;
		top: 1px;
		left: ${(props: any) => (props.click ? '100%' : '1px')};
		width: 16px;
		height: 16px;
		border-radius: 4px;
		background-color: ${(props: any) => (props.click ? '#21242c' : '#444b58')};
		content: '';
		transition: all 0.3s;
		margin-left: ${(props: any) => (props.click ? '-17px' : '0')};
	}
	&:hover {
		&:after {
			opacity: 0.9;
			transform: scale(0.9);
		}
	}
`
