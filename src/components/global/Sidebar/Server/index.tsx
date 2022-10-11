/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CloudServerOutlined } from '@ant-design/icons'
//[ package ]

import { useApiState, useUpdateApi, $ } from 'store/api'
//[ hooks ]

//=> Component
export default () => {
	const updateApi = useUpdateApi()
	const { serverIP } = useApiState('panel')

	useEffect(() => {
		updateApi(['panel.serverIP'])
	}, [''])

	return (
		<Server>
			<div>
				<Icon>
					<CloudServerOutlined />
				</Icon>
				<ServerInfo>
					<div>
						<h1>Server</h1>
						<p>{$(serverIP)}</p>
					</div>
					<UnfoldIcon>
						<i className='el-icon-arrow-up'></i>
						<i className='el-icon-arrow-down'></i>
					</UnfoldIcon>
				</ServerInfo>
			</div>
		</Server>
	)
}

//=> Style Component
const Server = styled.nav`
	width: 100%;
	height: 70px;
	padding: 10px;
	> div {
		width: 100%;
		height: 100%;
		padding: 2px 8px;
		background: #323842;
		border-radius: 5px;
		display: flex;
		align-items: center;
	}
`

const Icon = styled.div`
	width: 35px;
	height: 35px;
	background: #404754;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	> span {
		width: 20px;
		height: 20px;
		font-size: 20px;
		color: #fff;
		cursor: default;
	}
`

const ServerInfo = styled.div`
	width: calc(100% - 32px);
	height: 35px;
	padding: 4px 0 4px 8px;
	display: flex;
	justify-content: space-between;
	> div {
		> h1 {
			color: #fff;
			font-family: 'Orbitron';
			line-height: 1;
			font-size: 14px;
		}
		> p {
			color: hsl(0deg 0% 55%);
			font-size: 12px;
			font-family: 'Saira';
			line-height: 1;
			font-weight: lighter;
			margin-top: 2px;
		}
	}
`

const UnfoldIcon = styled.div`
	width: 14px;
	height: 28px;
	margin-right: 2px;
	display: flex;
	flex-direction: column;
	> i {
		color: hsl(0deg 0% 50%);
		font-weight: bold;
		font-size: 14px;
	}
`
