import React, { useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { RocketOutlined, ToolOutlined, ReloadOutlined } from '@ant-design/icons'
import Button from 'components/reusable/Button'
//[ components ]

import { useApiState } from 'state/api/hooks'
import { useUpdateLoadId } from 'state/popupbox/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const $panel = useApiState('panel')
	const updateLoadId = useUpdateLoadId()

	return (
		<Main>
			<Button
				tag={$panel.isNew ? '#f44336' : null}
				first={<RocketOutlined />}
				text='更新'
				onClick={() => {
					updateLoadId('UpdatePanel', '更新面板')
				}}
			/>
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
