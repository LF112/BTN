/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
//[ package ]

import { AimOutlined } from '@ant-design/icons'
//[ assets ]

import Button from 'components/reusable/Button'
import Breadcubes from 'components/reusable/Menu/Breadcubes'
import List from './List'
//[ components ]

import { useUpdateShow } from 'state/popupbox/hooks'
import { useUpdateApi, useApiState, $ } from 'store/api'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { Close } = props
	const updateShow = useUpdateShow()
	const updateApi = useUpdateApi()
	const { riskList, securityList, ignoreList } = useApiState('security')

	const _list = [
		{ name: '风险项', to: 'risk' },
		{ name: '安全项', to: 'security' },
		{ name: '忽略项', to: 'ignore' }
	]
	const [choose, setChoose] = useState<string>(_list[0].to)

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
		updateApi([
			'security.riskList',
			'security.securityList',
			'security.ignoreList'
		])
	}, [''])

	const [buttonStatus, setButtonStatus] = useState<number>(-2)
	const CLICK = new ClickHandler({
		setButtonStatus: setButtonStatus
	})

	const $security = {
		risk: $(riskList),
		security: $(securityList),
		ignore: $(ignoreList)
	}
	return (
		<Main>
			<div>
				<Breadcubes list={_list} choose={choose} setChoose={setChoose} />
				<Button
					text='重新检测'
					first={<AimOutlined />}
					status={buttonStatus}
					onClick={() => CLICK.SecurityCheck()}
				/>
			</div>
			<List data={$security} choose={choose} />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 515px;
	height: 350px;
	padding: 0 15px 8px;
	> div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}
`
