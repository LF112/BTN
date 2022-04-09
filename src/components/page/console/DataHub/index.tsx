import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import Network from './Network'
import Iostat from './Iostat'
import OverflowMask from 'components/reusable/Mask/Overflow'
//[ component ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

import { bytesToSize } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	const { up, down, upTotal, downTotal, iostat } = useApiState('system')

	//=> 显示遮罩
	const cardBoxNode = useRef<HTMLDivElement>(null)
	const [showMask, updateShowMask] = useState<boolean>(false)
	useEffect(() => {
		if (cardBoxNode) {
			const DOM = cardBoxNode.current
			if (DOM.scrollHeight > DOM.clientHeight) updateShowMask(!showMask)
		}
	}, [cardBoxNode])

	return (
		<Main showMask={showMask}>
			<nav ref={cardBoxNode}>
				<Network
					up={up}
					down={down}
					upTotal={bytesToSize(upTotal)}
					downTotal={bytesToSize(downTotal)}
				/>
				<Iostat data={iostat} />
			</nav>
			<OverflowMask showMask={showMask} bottom={true} />
		</Main>
	)
}

//=> Style
const Main = styled.main<{ showMask: boolean }>`
	position: relative;
	width: 100%;
	height: calc(100% - 202px);
	overflow: auto;
	> nav {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		${(props: any) => (props.showMask ? 'padding-bottom: 30px;' : '')}
	}
`
