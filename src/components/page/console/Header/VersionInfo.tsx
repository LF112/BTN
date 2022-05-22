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

import { ReactComponent as VersionIcon } from 'assets/svg/global_version.svg'
//[ assets ]

import { useApiState } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const $panel = useApiState('panel')

	return (
		<>
			<VersionTEXT>
				<VersionIcon />
				{$panel.version}
			</VersionTEXT>
			<Releases>{`${$panel.Beta ? '测试' : '正式'}版`}</Releases>
		</>
	)
}

//=> Style
const VersionTEXT = styled.h2`
	font-family: 'Saira';
	background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
	-webkit-background-clip: text;
	-webkit-box-decoration-break: clone;
	color: transparent;
	font-size: 20px;
	display: flex;
	align-items: center;
	opacity: 0;
	animation: ScaleIn 0.25s forwards;
	animation-delay: 130ms;
	> svg {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
`

const Releases = styled.h2`
	background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
	-webkit-background-clip: text;
	-webkit-box-decoration-break: clone;
	color: transparent;
	font-size: 15px;
	line-height: 1;
	font-family: 'HarmonyOS';
	margin-left: 8px;
	opacity: 0;
	animation: ScaleIn 0.25s forwards;
	animation-delay: 194ms;
`
