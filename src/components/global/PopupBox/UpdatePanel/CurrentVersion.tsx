/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import Button from 'components/reusable/Button'
//[ components ]

import { useAddPopup } from 'state/popup/hooks'
import { BTFetch } from 'state2/fetch'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { isNew, Beta, version } = props
	const addPopup = useAddPopup()
	const $fetch = BTFetch()

	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		$fetch: $fetch,
		isNew: isNew,
		setButtonStatus: setButtonStatus,
		addPopup: addPopup,
		Beta: Beta
	})

	return (
		<Main>
			<h1>
				<i className='el-icon-finished'></i>
				已安装{isNew ? '' : '最新'}
				{Beta ? '测试版' : '正式版'} <span>V{version}</span>
			</h1>
			<Button
				text={`切换${!Beta ? '测试版' : '正式版'}`}
				status={buttonStatus}
				onClick={() => CLICK.SwitchVersion()}
			/>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	width: 100%;
	height: 40px;
	border-radius: 5px;
	background: #263433;
	margin-top: 8px;
	padding: 5px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> h1 {
		font-size: 14px;
		color: #56c1bc;
		font-family: 'Saira', 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
		> i {
			margin-right: 5px;
		}
		> span {
			margin-left: 5px;
			font-size: 14px;
			color: #6fe5ca;
			font-family: 'Saira', 'HarmonyOS';
			font-weight: bold;
		}
	}
	> button {
		background: #56c1bc;
		transform: scale(0.8);
		margin-right: -10px;
		&:hover {
			background: #469d99;
			transform: scale(0.76);
		}
	}
`
