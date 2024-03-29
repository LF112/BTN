/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
//[ package ]

import Card from './Card'
import BetterScroll from 'components/reusable/BetterScroll'
//[ components ]

import { useApiState, $ } from 'store/api'
//[ hooks ]

//=> DOM
export default () => {
	const { disk } = useApiState('disk')

	const _Disk = $(disk)
	return (
		<DiskCardList>
			<BetterScroll height={78 * _Disk?.length || 0 + 2}>
				{_Disk.map((item: any, index: number) => (
					<Card
						key={index}
						data={item}
						style={{ animationDelay: `${340 + 25 * index}ms` }}
					/>
				))}
			</BetterScroll>
		</DiskCardList>
	)
}

//=> Style
const DiskCardList = styled.main`
	position: relative;
	width: 100%;
	margin-top: 10px;
`
