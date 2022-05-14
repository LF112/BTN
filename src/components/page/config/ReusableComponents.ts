import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ components ]

export const Main = styled(DefaultCard)`
	width: 100%;
	padding: 0;
	display: flex;
	flex-direction: column;
`

export const SetUpMain = styled.div`
	position: relative;
	width: 100%;
	padding: 15px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	> div {
		width: 342px;
		display: flex;
		align-items: center;
	}
`

export const SetUpTitle = styled.h2`
	color: #fff;
	font-size: 15px;
	line-height: 1;
	font-family: 'HarmonyOS';
	user-select: none;
	margin: 0 15px;
`

export const SetUpDescription = styled.p`
	color: #6e788e;
	font-family: 'HarmonyOS';
	font-size: 14px;
	font-weight: bold;
	line-height: 1.2;
`
