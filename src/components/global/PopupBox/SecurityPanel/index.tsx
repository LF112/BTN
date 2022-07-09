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

import Button from 'components/reusable/Button'
import Breadcubes from 'components/reusable/Menu/Breadcubes'
import List from './List'
//[ components ]

import { useUpdateShow } from 'state/popupbox/hooks'
import { useUpdateApi, useApiState } from 'state/api/hooks'
//[ hooks ]

import ClickHandler from './click'
//[ click handler ]

//=> DOM
export default (props: any) => {
	const { Close } = props
	const updateShow = useUpdateShow()
	const updateApi = useUpdateApi()

	const _list = [
		{ name: '风险项', to: 'risk' },
		{ name: '安全项', to: 'security' },
		{ name: '忽略项', to: 'ignore' }
	]
	const [choose, setChoose] = useState<string>(_list[0].to)

	useEffect(() => {
		//=> 显示弹窗 | '通知父组件子组件成功装载'
		updateShow(true)
		updateApi(['security.risk'])
	}, [''])

	const CLICK = new ClickHandler({})

	return (
		<Main>
			<Breadcubes list={_list} choose={choose} setChoose={setChoose} />
			<List />
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: 515px;
	height: 315px;
	padding: 0 15px 8px;
`
