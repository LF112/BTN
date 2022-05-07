import React from 'react'
import styled from 'styled-components'
//[ package ]

import Card from './Card'
//[ components ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const { disk } = useApiState('system')

	return (
		<DiskCardList>
			{disk.map((item: any, index: number) => (
				<Card
					key={index}
					data={item}
					style={{ animationDelay: `${340 + 25 * index}ms` }}
				/>
			))}
		</DiskCardList>
	)
}

//=> Style
const DiskCardList = styled.main`
	position: relative;
	width: 100%;
	margin-top: 10px;
`
