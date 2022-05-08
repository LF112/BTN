import React from 'react'
import styled from 'styled-components'
//[ package ]

import Switch from 'components/reusable/Switch'
import {
	SetUpMain,
	SetUpTitle,
	SetUpDescription
} from 'components/page/config/ReusableComponents'
//[ Components ]

//=> DOM
export default () => {
	return (
		<Main>
			<div>
				<Switch />
				<SetUpTitle>关闭面板</SetUpTitle>
			</div>
			<SetUpDescription>
				仅关闭当前面板的 WEB 端服务，不影响服务器其他业务的正常运行
			</SetUpDescription>
		</Main>
	)
}

//=> Style
const Main = styled(SetUpMain)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
`
