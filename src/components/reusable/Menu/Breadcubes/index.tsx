import React from 'react'
import styled from 'styled-components'
//[ package ]

import Item from './Item'
//[ components ]

//=> DOM
export default (props: any) => {
	const { list, choose, setChoose = () => {} } = props

	return (
		<Main>
			{list.map(({ name, to }, index: number) => (
				<Item
					key={index}
					title={name}
					show={choose === to}
					onClick={() => {
						setChoose(to)
					}}
				/>
			))}
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 48px;
	display: flex;
	align-items: center;
	main + main {
		margin-left: 15px;
	}
`
