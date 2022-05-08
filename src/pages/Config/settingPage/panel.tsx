import React from 'react'
import styled from 'styled-components'
//[ package ]

import ClosePanel from 'components/page/config/settingPage/ClosePanel'
import IPv6Support from 'components/page/config/settingPage/IPv6Support'
import OfflineMode from 'components/page/config/settingPage/OfflineMode'
//[ components ]

//=> DOM
export default () => {
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
