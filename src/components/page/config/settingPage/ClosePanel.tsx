import React from 'react'
import styled from 'styled-components'
//[ package ]

import Switch from 'components/reusable/Switch'
import {
	Main,
	SetUpMain,
	SetUpTitle,
	SetUpDescription
} from 'components/page/config/ReusableComponents'
import Tips from 'components/page/config/Tips'
//[ Components ]

//=> DOM
export default () => {
	return (
		<SetMain>
			<SetUpMain>
				<div>
					<Switch />
					<SetUpTitle>关闭面板</SetUpTitle>
				</div>
				<SetUpDescription>
					仅关闭当前面板的 WEB 端服务，不影响服务器其他业务的正常运行
				</SetUpDescription>
			</SetUpMain>
			<Tips text='您仍可以执行此命令来启用面板。' code={'bt 3'} />
		</SetMain>
	)
}

//=> Style
const SetMain = styled(Main)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
`
