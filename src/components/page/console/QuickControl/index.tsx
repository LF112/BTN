import React from 'react'
import styled from 'styled-components'
//[ package ]

import { RocketOutlined, ToolOutlined, ReloadOutlined } from '@ant-design/icons'
import Button from 'components/reusable/Button'
//[ components ]

//=> DOM
export default () => {
	return (
		<Main>
			<Button first={<RocketOutlined />} text='更新' />
			<Button first={<ToolOutlined />} text='修复' />
			<Button first={<ReloadOutlined />} text='重启' />
		</Main>
	)
}

//=> Style
const Main = styled.header`
	position: relative;
	width: 100%;
	height: 50px;
	border-radius: 5px;
	background: #282c34;
	box-shadow: rgba(26, 26, 26, 45%) 0px 1px 3px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 5px 10px;
`
