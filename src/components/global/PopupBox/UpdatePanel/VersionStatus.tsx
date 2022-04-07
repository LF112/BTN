import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { ReactComponent as UpdateIcon } from 'assets/svg/global_update.svg'
//[ assets ]

import Button from 'components/reusable/Button'
//[ components ]

import { BTFetch } from 'state/fetch/hooks'
import { useUpdateApi } from 'state/api/hooks'
import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { isNew, Beta, UpdateTime } = props

	const updateApi = useUpdateApi()
	const $fetch = BTFetch()
	const addPopup = useAddPopup()
	const [buttonStatus, setButtonStatus] = useState<number>(-2)

	const CLICK = new ClickHandler({
		$fetch: $fetch,
		isNew: isNew,
		setButtonStatus: setButtonStatus,
		addPopup: addPopup,
		updateApi: updateApi
	})

	return (
		<VersionStatus>
			<VersionInfo>
				<FUTI>
					<UpdateIcon />
				</FUTI>
				<MadeWithLove>
					<h2>{isNew ? '有可供安装的更新' : '很好！版本都是最新的~'}</h2>
					<span>
						最新{Beta ? '测试' : '正式'}版发版时间:
						{UpdateTime}
					</span>
				</MadeWithLove>
			</VersionInfo>
			<UpdateButton>
				<Button
					text={isNew ? '立即更新' : '重新检查'}
					status={buttonStatus}
					onClick={() => CLICK.UpdatePanel()}
				/>
			</UpdateButton>
		</VersionStatus>
	)
}

//=> Style
const VersionStatus = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const VersionInfo = styled.div`
	height: 100%;
	display: flex;
`

const MadeWithLove = styled.div`
	height: 60px;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	justify-content: center;
	> h2 {
		color: #fff;
		font-size: 14px;
		line-height: 1;
		font-family: 'HarmonyOS';
	}
	> span {
		color: #6b758a;
		font-size: 12px;
		line-height: 1;
		font-family: 'Saira', 'HarmonyOS';
		font-weight: bold;
		margin-top: 4px;
	}
`

const FUTI = styled.div`
	width: 60px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	margin-left: -5px;
	> svg {
		width: 50px;
		height: 50px;
	}
`

const UpdateButton = styled.div`
	height: 30px;
`