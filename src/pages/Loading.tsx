/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStore } from '@nanostores/react'
//[ package ]

import Loader from 'components/reusable/Loading/HalfFilled'
//[ Components ]

import { _pageLoad } from 'state2/animation'
//[ state ]

//=> DOM
export default () => {
	const pageLoad = useStore(_pageLoad)
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
