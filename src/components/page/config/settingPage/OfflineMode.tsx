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
				<SetUpTitle>离线模式</SetUpTitle>
			</div>
			<SetUpDescription>
				离线模式下，面板更新、插件安装等联网服务将无法使用
			</SetUpDescription>
		</Main>
	)
}

//=> Style
const Main = styled(SetUpMain)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 66ms;
`
