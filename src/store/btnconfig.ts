/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

//=> STORE
export const _connect = atom<$connect>({
	baseUrl: '/', // BT-PANEL URL
	apiUse: false,
	apiKey: ''
})

//=> FUNCTIONS
export const updateConfig: $config = (data, type, page): void => {
	const state = _connect.get()

	if (!page)
		//=> 第一层 | '指 state 对象深度'
		state[type] = data
	//=> 第二层
	else state[type][page] = data
	// '你在哪一层？'

	_connect.set(state)
}

//=> Types
export type $connect = {
	baseUrl: string
	apiUse: boolean
	apiKey: string
}
export type $updateConfig = {
	data: string | boolean | number
	type: string
	page?: string
}

export interface $config {
	(data: string | boolean | number, type: string, page?: string): void
}
