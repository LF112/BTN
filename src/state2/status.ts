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
// 网络状态
export const _network = atom<$network>({
	apiStatus: true,
	rawJson: {},
	aimsJson: ''
})

//=> FUNCTIONS
// 更新网络状态
export const setNetwork = (network: $setNetwork): void => {
	const { data, type, aims, rawJson, aimsJson } = network
	const state = _network.get()

	if (rawJson) state[type].rawJson = rawJson
	if (aimsJson) state[type].aimsJson = aimsJson
	if (!aims)
		//=> 第一层 | '指 state 对象深度'
		state[type] = data
	//=> 第二层
	else state[type][aims] = data
	// '你在哪一层？'

	_network.set(state)
}

//=> Types
export type $network = {
	apiStatus: boolean
	rawJson: object
	aimsJson: string
}
export type $setNetwork = {
	data: string | boolean | number
	type: string
	aims?: string
	rawJson?: object
	aimsJson: string
}
