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
//[ components ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const { os, systemdate } = useApiState('system')

	const [OS, setOS] = useState('Linux')
	const [OSVersion, setOSVersion] = useState('-.-.-')
	const [OSArch, setOSArch] = useState('x-')
	const [isPanelArch, setPanelArch] = useState('-')
	useEffect(() => {
		if (os !== '-') {
			const [osName, osVersion, FitArch] = os.split(' ').filter((v: any) => v)
			setOS(osName) //=> 系统名称
			setOSVersion(osVersion) //=> 系统版本
			const [osArch, pyVersion] = FitArch.split('(')
			if (pyVersion) setPanelArch(`独立 ${pyVersion.replace(')', '')} 版`)
			setOSArch(osArch) //=> 系统架构
		}
	}, [os])

	const [SysTime, setSysTime] = useState<string>('---- -- -- --:--:--')
	useEffect(() => {
		if (systemdate !== '-')
			setSysTime(date.format(new Date(systemdate), 'YYYY-MM-DD HH:mm:ss'))
	}, [systemdate])

	return (
		<Main>
			<SystemCard
				OS={OS}
				OSVersion={OSVersion}
				OSArch={OSArch}
				isPanelArch={isPanelArch}
			/>
			<FooInfo>
				<FieldTimeOutlined />
				<h1>系统时间 {SysTime}</h1>
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
