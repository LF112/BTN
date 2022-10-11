/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LoadingOutlined } from '@ant-design/icons'
//[ package ]

import useToggle from 'utils/useToggle'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { toggleSwitch = () => {}, Default = false } = props

	const [Switch, toggle] = useToggle(Default)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => toggle(Default), [Default])

	return (
		<Main
			style={{ pointerEvents: loading ? 'none' : 'auto' }}
			click={!loading ? Switch : null}
			onClick={() => {
				if (!loading) {
					toggle()
					toggleSwitch(!Switch, toggle, setLoading)
				}
			}}>
			<LoadingOutlined style={{ opacity: loading ? 1 : 0 }} />
		</Main>
	)
}

//=> Style
const Main = styled.div<{ click: boolean }>`
	position: relative;
	min-width: 50px;
	height: 22px;
	border-radius: 4px;
	border: 2px solid #323842;
	background: ${(props: any) => (props.click ? '#414754' : '#323842')};
	vertical-align: middle;
	cursor: pointer;
	transition: border-color 0.3s, background-color 0.3s;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	display: flex;
	align-items: center;
	justify-content: center;
	&:after {
		position: absolute;
		top: 1px;
		left: ${(props: any) => (props.click ? '100%' : '1px')};
		width: 16px;
		height: 16px;
		border-radius: 4px;
		background-color: ${(props: any) => (props.click ? '#21242c' : '#444b58')};
		content: '';
		transition: all 0.3s;
		margin-left: ${(props: any) => (props.click ? '-17px' : '0')};
	}
	&:hover {
		&:after {
			opacity: 0.9;
			transform: scale(0.9);
		}
	}
	> span {
		position: absolute;
		z-index: 1;
		font-size: 14px;
		color: #fff;
		margin-left: ${(props: any) => (props.click ? '28px' : '-28px')};
		pointer-events: none;
	}
`
