import React from 'react'
import styled from 'styled-components'
//[ package ]

import ITEM from './item'
//[ Components ]

import { useActivePopups } from 'state/popup/hooks'
//[ Hooks ]

//=> DOM
export default () => {
	//=> 取出 popup 列表
	const activePopups = useActivePopups()

	return (
		<>
			<MAIN>
				{activePopups.map((item: any) => {
					if (Object.keys(item).length > 0)
						return (
							<ITEM
								key={item.id}
								popupId={item.id}
								type={item.type}
								content={item.content}
								timeout={item.timeout}
								close={item.close}
							/>
						)
				})}
			</MAIN>
		</>
	)
}

//=> Style Component
const MAIN = styled.div`
	position: absolute;
	top: 15px;
	right: 0;
	z-index: 2000;
`
