/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import hljs from 'highlight.js'
import _ from 'lodash'
import jsonFormat from 'json-beautify'
//[ package ]

import './oneDark.css'
//[ css ]

import { ReactComponent as ICON_Triangle } from 'assets/svg/global_triangle.svg'
//[ assets ]

import useToggle from 'utils/useToggle'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { rawJson, aimsJson, UpdateNow } = props
	const [Unfold, toggle] = useToggle()

	const node = useRef<HTMLElement>()
	const [FoldHeight, updateFoldHeight] = useState<number>(-1)
	const [text, setText] = useState<string>('')
	const [lineHeight, setLineHeight] = useState<number>(0)
	const [foucsLock, setFoucsLock] = useState<boolean>(true)

	useEffect(() => {
		const { value } = hljs.highlight(jsonFormat(rawJson, null, 4, 20), {
			language: 'json'
		})
		setText(value)

		//=> 计算代码行高
		const valueLen = value.match(/\n/g)?.length || 0
		setLineHeight(valueLen === 0 ? 0 : valueLen * 20 + 38)
		//=> 無代码时锁定展开条
		setFoucsLock(valueLen === 0)

		if (FoldHeight !== -1) {
			node.current.style.height = 'unset'
			setTimeout(() => {
				const DOM = node.current
				updateFoldHeight(DOM.clientHeight + 4)
				DOM.style.height = '0'
			}, 16)
		}
	}, [UpdateNow])

	return (
		<Main
			style={{ padding: Unfold && !foucsLock ? '10px' : '5px 10px' }}
			onMouseEnter={() => toggle()}
			onMouseLeave={() => toggle()}>
			<div style={{ pointerEvents: foucsLock ? 'none' : 'auto' }}>
				<Context>
					<ICON_Triangle style={{ width: foucsLock ? 0 : 16 }} />
					<p>{_.get(rawJson, aimsJson) || '-'}</p>
				</Context>
				<Fold style={{ height: Unfold ? lineHeight : 0 }}>
					<pre className='hljs'>
						<code dangerouslySetInnerHTML={{ __html: text }} />
					</pre>
				</Fold>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	min-height: 40px;
	background: #1b1f26;
	border-radius: 5px;
	margin-top: 12px;
	padding: 5px 10px;
	box-shadow: inset 0 1px 0 rgba(27, 31, 35, 12%);
	cursor: pointer;
	display: flex;
	align-items: center;
	> div {
		width: 100%;
		height: 100%;
		:hover {
			> div {
				> svg {
					transform: rotate(90deg);
				}
				> p {
					margin-left: 5px;
				}
			}
		}
	}
`

const Context = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
	> p {
		color: #fff;
		font-weight: lighter;
		font-size: 14px;
		font-family: 'MiSans';
	}
`

const Fold = styled.main`
	width: 100%;
	overflow: hidden;
	cursor: auto;
	> pre {
		background: #282c34;
		border-radius: 5px;
		padding: 8px 18px;
		margin-top: 5px;
	}
`
