import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import hljs from 'highlight.js'
import prettier from 'prettier'
import parserBabel from 'prettier/parser-babel'
import { CopyFilled, CopyOutlined } from '@ant-design/icons'
import * as copy from 'copy-to-clipboard'
//[ package ]

import SmallButton from 'components/reusable/Button/small'
//[ components ]

//=> DOM
export default (props: any) => {
	const { rawCode = '', codeType = 'json', noFormat = false } = props
	const [text, setText] = useState<string>('')
	const [copied, setCopied] = useState<boolean>(false)

	useEffect(() => {
		const { value } = hljs.highlight(
			codeType,
			!noFormat
				? prettier.format(rawCode, {
						parser: codeType,
						plugins: [parserBabel]
				  })
				: rawCode
		)
		setText(value)
	})

	return (
		<Main>
			<pre className='hljs'>
				{codeType === 'bash' ? <span>$ </span> : ''}
				<code dangerouslySetInnerHTML={{ __html: text }} />
			</pre>
			<SmallButton
				onClick={() => {
					setCopied(true)
					copy(rawCode)
				}}
				onMouseLeave={() => setCopied(false)}
				icon={
					<>
						{copied ? <CopyFilled /> : <CopyOutlined />}
						<CopyTips>
							<span>{copied ? '复制成功' : '点击复制'}</span>
						</CopyTips>
					</>
				}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	display: flex;
	background: #363b46;
	border-radius: 5px;
	padding: 8px 18px;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	> pre {
		margin-right: 18px;
		> span {
			user-select: none;
		}
	}
	> button:hover {
		> div {
			width: 48px;
			opacity: 1;
			margin: 0 8px;
		}
	}
`

const CopyTips = styled.div`
	position: relative;
	height: 100%;
	margin: 0;
	width: 0;
	opacity: 0;
	overflow: hidden;
	> span {
		position: absolute;
		left: 0;
		font-family: 'HarmonyOS';
		width: 48px;
		font-size: 12px;
		color: #c5c5c5;
		line-height: 1;
		margin-top: 2px;
	}
`
