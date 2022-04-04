import React, { useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import { useUpdateShow } from 'state/popupbox/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const updateShow = useUpdateShow()

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
	})

	return <Main>Hello world!</Main>
}

//=> Style
const Main = styled.main`
	height: 500px;
	width: 500px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
`
