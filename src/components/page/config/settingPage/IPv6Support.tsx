import React from 'react'
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
		<SetUpMain>
			<div>
				<Switch />
				<SetUpTitle>面板 IPv6 访问支持</SetUpTitle>
			</div>
			<SetUpDescription>
				启用后，面板服务将监听 IPv6 地址，不支持 IPv6 请不要开启！
			</SetUpDescription>
		</SetUpMain>
	)
}
