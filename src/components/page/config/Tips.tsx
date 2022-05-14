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
		> pre {
			background: #282c34;
			border-radius: 5px;
			padding: 8px 18px;
			margin-top: 5px;
		}
	}
`
