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
				<SetUpTitle>面板 IPv6 访问支持</SetUpTitle>
			</div>
			<SetUpDescription>
				启用后，面板服务将监听 IPv6 地址，不支持 IPv6 请不要开启！
			</SetUpDescription>
		</Main>
	)
}

//=> Style
const Main = styled(SetUpMain)`
	opacity: 0;
	animation: FadeIn_Bottom 0.25s forwards;
	animation-delay: 41ms;
`