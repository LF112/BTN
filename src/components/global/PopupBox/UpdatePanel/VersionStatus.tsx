import React, { useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { ReactComponent as UpdateIcon } from 'assets/svg/global_update.svg'
//[ assets ]

import Button from 'components/reusable/Button'
//[ components ]

import { BTFetch } from 'state/fetch/hooks'
import { ID as _NID } from 'state/api/linkId'
import { useUpdateApi } from 'state/api/hooks'
import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

//=> DOM
export default (props: any) => {
	const { isNew, Beta, UpdateTime } = props

	const updateApi = useUpdateApi()
	const $fetch = BTFetch()
	const addPopup = useAddPopup()
	const [buttonStatus, setButtonStatus] = useState<number>(-2)

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
					onClick={async () => {
						if (isNew) {
							setButtonStatus(-1)
							const { msg, status } = (await $fetch(_NID['UpdatePanel'], {
								toUpdate: true
							})) as any
							if (status) {
								setButtonStatus(1)
								addPopup(msg, 'success', 1500)
								if ((await $fetch(_NID['ReWeb'])) as any)
									window.location.reload()
							} else {
								setButtonStatus(0)
								addPopup(msg, 'warn', 1500)
							}
						} else {
							setButtonStatus(-1)
							setTimeout(() => {
								setButtonStatus(1)
								addPopup('检查完毕', 'success', 1500)
							}, 500)
							updateApi([
								'panel',
								'isNew',
								'betaVersionId',
								'VersionId',
								'betaVersionLogs',
								'VersionLogs',
								'betaUptime',
								'Uptime'
							])
						}
					}}
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
