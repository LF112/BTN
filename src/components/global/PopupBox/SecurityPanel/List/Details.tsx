/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import styled from 'styled-components'
import { useStore } from '@nanostores/react'
//[ package ]

import {
	ShrinkOutlined,
	InfoCircleOutlined,
	RadarChartOutlined,
	AimOutlined
} from '@ant-design/icons'
//[ assets ]

import { Title, Tag } from './Item/Head'
import Button from 'components/reusable/Button'
//[ components ]

import { _secpanel_choose_data, _secpanel_show } from 'store/status'
//[ store ]

//=> DOM
export default () => {
	const show = useStore(_secpanel_show)
	const DATA = useStore(_secpanel_choose_data)
	const { level, title, msg, ps, tips } = DATA as any

	return (
		<Main show={show}>
			<Title>
				<Tag level={level}>
					{level === 3 ? '高危' : level === 2 ? '中危' : '低危'}
				</Tag>
				<h1>{title}</h1>
				<Back>
					<Button
						text='收起'
						first={<ShrinkOutlined />}
						onClick={() => _secpanel_show.set(false)}
					/>
				</Back>
			</Title>
			<nav>
				<Block>
					<div>
						<InfoCircleOutlined />
						<p>{ps}</p>
					</div>
				</Block>
				<Block>
					<div>
						<RadarChartOutlined />
						<p>风险详情</p>
					</div>
					<nav>
						<p>{msg}</p>
					</nav>
				</Block>
				<Block>
					<div>
						<AimOutlined />
						<p>解决方案</p>
					</div>
					{tips?.map((context: string, index: number) => (
						<nav key={index}>
							<div>{index + 1}</div>
							<p>{context}</p>
						</nav>
					))}
				</Block>
			</nav>
		</Main>
	)
}

//=> Style
const Main = styled.main<{ show: boolean }>`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 10;
	background: #1f2227;
	border-radius: 4px;
	padding: ${({ show }) => (show ? 15 : 22)}px;
	pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
	opacity: ${({ show }) => (show ? 1 : 0)};
	> div:first-child {
		margin-bottom: 18px;
	}
	> nav {
		overflow-y: auto;
		height: 210px;
	}
`

const Back = styled.div`
	position: absolute;
	right: 0;
	margin-top: 0 !important;
	margin-right: 0 !important;
	button {
		padding: 5px 10px;
		p {
			font-size: 14px;
		}
		span {
			transform: scale(0.92);
		}
	}
`

const Block = styled.div`
	width: 100%;
	padding: 10px 12px;
	border-radius: 4px;
	background: #282c34;
	margin: 8px 0;
	p {
		color: #fff;
		font-size: 14px;
		font-family: 'HarmonyOS';
	}
	span {
		color: #fff;
		font-size: 14px;
		margin-right: 10px;
	}
	> div {
		display: flex;
		align-items: center;
	}
	> nav {
		width: 100%;
		padding: 12px;
		background: #24282f;
		border-radius: 4px;
		margin-top: 10px;
		display: flex;
		align-items: center;
		> div {
			font-family: 'HarmonyOS';
			font-size: 12px;
			padding: 3px 7px;
			background: #2c313c;
			color: #fff;
			border-radius: 5px;
			margin-right: 8px;
		}
	}
`
