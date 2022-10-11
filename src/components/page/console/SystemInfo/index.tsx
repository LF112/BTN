/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import date from 'date-and-time'
import { FieldTimeOutlined } from '@ant-design/icons'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import SystemCard from './SystemCard'
import Security from './Security'
//[ components ]

import { useApiState, $ } from 'store/api'
//[ hooks ]

//=> DOM
export default () => {
	const { OS, OSVersion, OSArch } = useApiState('server')
	const { pythonVersion } = useApiState('system')

	return (
		<Main>
			<SystemCard
				OS={$(OS)}
				OSVersion={$(OSVersion)}
				OSArch={$(OSArch)}
				isPanelArch={`独立 PY${$(pythonVersion)} 版`}
			/>
			<FooInfo>
				<Security />
			</FooInfo>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	width: 100%;
	height: 142px;
	min-height: 148px;
	margin-top: 10px;
	opacity: 0;
	animation: ScaleIn 0.25s forwards;
	animation-delay: 299ms;
`
const FooInfo = styled.div`
	width: 100%;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	> span {
		margin-right: 8px;
		font-size: 18px;
		margin-top: 2px;
	}
	> h1,
	span {
		font-family: 'HarmonyOS';
		line-height: 1;
		font-size: 16px;
		color: #fff;
	}
`
