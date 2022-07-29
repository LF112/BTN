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

import Button from 'components/reusable/Button'
//[ components ]

import ClickHandler from './../../click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { checkTime, ignore, m_name, title } = props

	const [DetailButtonStatus, setDetailButtonStatus] = useState<number>(-2)
	const [IgnoreButtonStatus, setIgnoreButtonStatus] = useState<number>(-2)
	const [ReCheckButtonStatus, setReCheckButtonStatus] = useState<number>(-2)
	const CLICK = new ClickHandler({
		setDetailButtonStatus: setDetailButtonStatus,
		setIgnoreButtonStatus: setIgnoreButtonStatus,
		setReCheckButtonStatus: setReCheckButtonStatus
	})

	return (
		<Main>
			<p>检测时间：{checkTime}</p>
			<div>
				<Button
					first={<i className='el-icon-warning-outline' />}
					text={'详情'}
					status={DetailButtonStatus}
				/>
				<Button
					onClick={() => CLICK.SaladForked(m_name, title, ignore)}
					first={<i className='el-icon-magic-stick' />}
					text={`${ignore ? '取消' : ''}忽略`}
					status={IgnoreButtonStatus}
				/>
				<Button
					first={<i className='el-icon-aim' />}
					text={'重新检测'}
					status={ReCheckButtonStatus}
				/>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.footer`
	width: 100%;
	height: 35px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 14px 0 16px;
	> p {
		color: #fff;
		font-weight: bold;
		font-size: 14px;
		font-family: 'HarmonyOS';
	}
	> div {
		display: flex;
		> button {
			background: #353c44;
			padding: 4px 0 4px 8px;
			> p {
				font-size: 12px;
				margin-top: 0;
				margin-left: 4px;
			}
			i {
				color: #fff;
			}
		}
		> button + button {
			margin-left: 8px;
		}
	}
`
