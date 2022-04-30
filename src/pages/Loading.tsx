import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import Loader from 'components/reusable/Loading/HalfFilled'
//[ Components ]

import { usePageLoadStatus } from 'state/animation/hooks'
//[ state ]

//=> DOM
export default () => {
	const pageLoad = usePageLoadStatus()

	const [hide, sethide] = useState<boolean>(true)

	useEffect(() => {
		if (pageLoad) setTimeout(() => sethide(true), 500)
		else sethide(false)
	}, [pageLoad])

	return (
		<Main
			style={{
				display: hide ? 'none' : 'flex',
				animation: `${!pageLoad ? 'FadeIn' : 'FadeOut'} 0.25s forwards`
			}}>
			<Loader speed={1.2} lineSpeed={1.4} width={4} size={50} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: absolute;
	margin-left: 218px;
	width: calc(100% - 218px);
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
`
