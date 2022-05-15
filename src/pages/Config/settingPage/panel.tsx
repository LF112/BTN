import React, { useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import ClosePanel from 'components/page/config/settingPage/ClosePanel'
import IPv6Support from 'components/page/config/settingPage/IPv6Support'
import OfflineMode from 'components/page/config/settingPage/OfflineMode'
//[ components ]

import { useUpdateApi } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()

	useEffect(() => {
		updateApi(['config', 'ipv6'])
	}, [''])

	return (
		<Main>
			<ClosePanel />
			<IPv6Support />
			<OfflineMode />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	main + main {
		margin-top: 10px;
	}
`
