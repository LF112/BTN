import React from 'react'
import styled from 'styled-components'
//[ package ]

import { ReactComponent as VersionIcon } from 'assets/svg/global_version.svg'
//[ assets ]

//=> DOM
export default () => {
	return (
		<>
			<VersionTEXT>
				<VersionIcon />
				1.0.0
			</VersionTEXT>
			<Releases>正式版</Releases>
		</>
	)
}

//=> Style
const VersionTEXT = styled.h2`
	font-family: 'Saira';
	background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
	-webkit-background-clip: text;
	-webkit-box-decoration-break: clone;
	color: transparent;
	font-size: 20px;
	display: flex;
	align-items: center;
	> svg {
		width: 18px;
		height: 18px;
		margin-right: 5px;
	}
`

const Releases = styled.h2`
	background: linear-gradient(90deg, #c7cacf 0, #abb2bf 100%);
	-webkit-background-clip: text;
	-webkit-box-decoration-break: clone;
	color: transparent;
	font-size: 15px;
	line-height: 1;
	font-family: 'HarmonyOS';
	margin-left: 8px;
`
