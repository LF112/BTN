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

import Head from './Head'
import Bottom from './Bottom'
//[ components ]

import { _secpanel_choose_data, _secpanel_show } from 'store/status'

import { simplifyTime } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { data } = props

	const { title, taking, level, check_time, ignore, m_name } = data

	const chooseDetils = (data: object) => _secpanel_choose_data.set(data)

	return (
		<Main>
			<Head
				level={level}
				title={title}
				checkTime={
					taking > 1
						? taking.toFixed(2) + 's'
						: (taking * 1000).toFixed(2) + 'ms'
				}
			/>
			<Bottom
				checkTime={simplifyTime(check_time)}
				ignore={ignore}
				m_name={m_name}
				title={title}
				choose={() => {
					chooseDetils(data)
					_secpanel_show.set(true)
				}}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 100%;
	height: 90px;
	border-radius: 4px;
	background: #2b2f37;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
		0 2px 4px -1px rgba(0, 0, 0, 0.06);
	overflow: hidden;
`
