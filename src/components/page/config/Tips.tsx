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

import CodeShow from 'components/reusable/CodeShow'
//[ components ]

//=> DOM
export default (props: any) => {
	const { text = '', code = '' } = props

	return (
		<Main>
			<div>
				<CodeShow codeType='bash' rawCode={code} noFormat={true} />
			</div>
			<div>
				<i className='el-icon-warning-outline' />
				<span>{text}</span>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.div`
	width: 100%;
	padding: 0 10px 15px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> div {
		> i {
			color: #e5c07b;
		}
		> span {
			font-family: 'MiSans';
			color: #e5c07b;
			margin-left: 8px;
			font-size: 14px;
		}
	}

	> div + div {
		margin-left: 10px;
	}
`
