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

import Button from 'components/reusable/Button/small'
//[ components ]

//=> DOM
export default (props: any) => {
	const { checkTime } = props
	return (
		<Main>
			<p>检测时间：{checkTime}</p>
			<div>
				<Button
					icon={
						<>
							<i className='el-icon-warning-outline' />
							<span>详情</span>
						</>
					}
				/>
				<Button
					icon={
						<>
							<i className='el-icon-magic-stick' />
							<span>忽略</span>
						</>
					}
				/>
				<Button
					icon={
						<>
							<i className='el-icon-aim' />
							<span>重新检测</span>
						</>
					}
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
			padding: 2px 5px;
			> span {
				font-size: 12px;
				margin-top: 0;
				margin-left: 4px;
			}
		}
		> button + button {
			margin-left: 8px;
		}
	}
`
