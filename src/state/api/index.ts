/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
//[ package ]

import {
	initialState as _system,
	stateApiUpdateIndex as $_system
} from './system' //=> 系统 STATE
import { initialState as _panel, stateApiUpdateIndex as $_panel } from './panel' //=> 面板 STATE
import {
	initialState as _config,
	stateApiUpdateIndex as $_config
} from './config' //=> CONFIG
import {
	initialState as _cpu,
	stateApiUpdateIndex as $_cpu
} from './system/cpu' //=> CPU信息
import {
	initialState as _memory,
	stateApiUpdateIndex as $_memory
} from './system/memory' //=> 内存信息
import {
	initialState as _security,
	stateApiUpdateIndex as $_security
} from './panel/security' //=> 安全信息
//[ api state ] | '导出格式 STATE: _{ state name } 、 INDEX: $_{ state name }'

//=> Slice 创建队列 | ' [ { slice name }, { slice } ] '
const sliceQueue: any[] = [
	['system', _system, $_system],
	['panel', _panel, $_panel],
	['cpu', _cpu, $_cpu],
	['memory', _memory, $_memory],
	['config', _config, $_config],
	['security', _security, $_security]
]

//=> Create SLICE ARR
const exportArr = {} // 导出 SLICE 列表
const updateArr = {} // 导出 SLICE update 列表
const apiUpdateIndexArr = {} // 导出 slice fetch 列表
const urlMapping = {} // 导出 Url 映射表
//=> 遍历 SLICE 队列，创建 SLICE
sliceQueue.forEach((sliceObj: any[]) => {
	const [name, initialState, fetchUpdate] = sliceObj

	//=> SLICE CREATE
	const SLICE = createSlice({
		name: `$${name}`, //=> State Name | '一般为 state 名字'
		initialState,
		reducers: {
			// FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
			//=> 更新 STATE 的 update 方法
			update: (
				state,
				action: PayloadAction<{ apiType: string; value: string }>
			) => {
				const { apiType, value } = action.payload //=> 取得参数 ↑ | '一般从这取回 hooks 传来的参数'
				//=> 更新 state
				state[apiType] = value
			}
		}
	})

	//=> 推入导出队列
	updateArr[name] = SLICE.actions
	exportArr[name] = SLICE.reducer

	Object.keys(fetchUpdate).forEach((key: string) => {
		const [URL, updateParamQuery] = fetchUpdate[key]

		apiUpdateIndexArr[`${name}.${key}`] = URL
		if (!urlMapping[URL]) urlMapping[URL] = [[updateParamQuery, name, key]]
		else urlMapping[URL].push([updateParamQuery, name, key])
	})
})

//=> 导出 Slice Arr
export const updater = updateArr
//=> 导出 Api Update Index Arr
export const apiIndexUpdater = apiUpdateIndexArr
//=> 导出 Url 映射表
export const urlMappingTable = urlMapping
//=> 导出 reducer Arr
export default { ...exportArr }
