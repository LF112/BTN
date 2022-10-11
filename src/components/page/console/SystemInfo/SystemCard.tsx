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

import SystemIcon from './SystemIcon'
import { BadgeIcon } from 'components/reusable/BadgeIcon'
//[ components ]

import { ReactComponent as PythonIcon } from 'assets/svg/global_python.svg'
//[ assets ]

//=> DOM
export default (props: any) => {
	const { OS, OSVersion, isPanelArch, OSArch } = props

	return (
		<Main>
			<SystemIcon OS={OS.toLowerCase()} OSArch={OSArch} />
			<InfoCard>
				<h1>{OS}</h1>
				<span>{OSVersion}</span>
				<PanelArch>
					<PythonIcon />
					<h2>{isPanelArch}</h2>
				</PanelArch>
			</InfoCard>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	height: calc(100% - 42px);
	display: flex;
	align-items: center;
`

const InfoCard = styled.div`
	width: calc(100% - 80px);
	height: 80px;
	padding: 8px 10px;
	> h1 {
		font-family: 'Geometos';
		color: #fff;
		line-height: 1;
		font-size: 22px;
	}
	> span {
		width: 184px;
		font-family: 'HarmonyOS';
		line-height: 1;
		font-size: 14px;
		color: #79869c;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`

const PanelArch = styled(BadgeIcon)`
	width: 165px;
	transform: scale(0.8);
	margin-top: -2px;
	margin-left: -15px;
	background: linear-gradient(
		109deg,
		rgb(77 87 102),
		rgb(68 75 88),
		rgb(61 68 79),
		rgb(61 68 79)
	);
	> h2 {
		font-family: 'Geometos', 'HarmonyOS';
		font-weight: 400;
		line-height: 1;
		font-size: 16px;
		color: #fff;
	}
`
