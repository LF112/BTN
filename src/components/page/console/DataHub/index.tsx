import React from 'react'
import styled from 'styled-components'
//[ package ]

import Network from './Network'

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { bytesToSize } from 'utils/useTools'

//=> DOM
export default () => {
	const { up, down, upTotal, downTotal } = useApiState('system')

	return (
		<Main>
			<Network
				up={up}
				down={down}
				upTotal={bytesToSize(upTotal)}
				downTotal={bytesToSize(downTotal)}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: calc(100% - 202px);
`
