import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
import Button from 'components/reusable/Button'
//[ components ]

import { useAddPopup } from 'state/popup/hooks'
import { BTFetch } from 'state/fetch/hooks'
import { useUpdateApi } from 'state/api/hooks'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { isNew, Beta, version } = props
	const addPopup = useAddPopup()
	const $fetch = BTFetch()
	const updateApi = useUpdateApi()

	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		$fetch: $fetch,
		isNew: isNew,
		setButtonStatus: setButtonStatus,
		addPopup: addPopup,
		Beta: Beta,
		updateApi: updateApi
	})

	return (
		<Main>
			<h1>
				<i className='el-icon-finished'></i>
				已安装{isNew ? '' : '最新'}
				{Beta ? '测试版' : '正式版'} <span>V{version}</span>
			</h1>
			<Button
				text={`切换${!Beta ? '测试版' : '正式版'}`}
				status={buttonStatus}
				onClick={() => CLICK.SwitchVersion()}
			/>
		</Main>
	)
}

//=> Style
const Main = styled(DefaultCard)`
	width: 100%;
	height: 40px;
	border-radius: 5px;
	background: #263433;
	margin-top: 8px;
	padding: 5px 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	> h1 {
		font-size: 14px;
		color: #56c1bc;
		font-family: 'Saira', 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
		> i {
			margin-right: 5px;
		}
		> span {
			margin-left: 5px;
			font-size: 14px;
			color: #6fe5ca;
			font-family: 'Saira', 'HarmonyOS';
			font-weight: bold;
		}
	}
	> button {
		background: #56c1bc;
		transform: scale(0.8);
		margin-right: -10px;
		&:hover {
			background: #469d99;
			transform: scale(0.76);
		}
	}
`
