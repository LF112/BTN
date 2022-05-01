import React from 'react'
import styled from 'styled-components'
//[ package ]

import Menu from 'components/reusable/Menu/Breadboard'
//[ components ]

//=> DOM
export default () => {
	return (
		<Main>
			<Menu
				list={[
					{ name: '面板设置', to: 'index' },
					{ name: 'BTN 设置', to: 'btn' }
				]}
				setChoose={() => {}}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	min-width: 230px;
	margin-bottom: 10px;
	> main {
		width: 100%;
		min-width: 230px;
	}
`
