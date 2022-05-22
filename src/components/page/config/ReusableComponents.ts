/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ components ]

export const Main = styled(DefaultCard)`
	width: 100%;
	padding: 0;
	display: flex;
	flex-direction: column;
`

export const SetUpMain = styled.div`
	position: relative;
	width: 100%;
	padding: 15px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div {
		width: 342px;
		display: flex;
		align-items: center;
	}
`

export const SetUpTitle = styled.h2`
	color: #fff;
	font-size: 15px;
	line-height: 1;
	font-family: 'HarmonyOS';
	user-select: none;
	margin: 0 15px;
`

export const SetUpDescription = styled.p`
	color: #6e788e;
	font-family: 'HarmonyOS';
	font-size: 14px;
	font-weight: bold;
	line-height: 1.2;
`
