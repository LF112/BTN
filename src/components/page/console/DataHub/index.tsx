import React from 'react'
import styled from 'styled-components'
//[ package ]

import Network from './Network'
import Iostat from './Iostat'
//[ component ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { bytesToSize } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	const { up, down, upTotal, downTotal, iostat } = useApiState('system')

	return (
		<Main>
			<Network
				up={up}
				down={down}
				upTotal={bytesToSize(upTotal)}
				downTotal={bytesToSize(downTotal)}
			/>
			<Iostat data={iostat} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: calc(100% - 202px);
	overflow-y: auto;
`
