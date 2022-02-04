import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

import {
	initialState as _system,
	stateApiUpdateIndex as $_system
} from './system' //=> 系统 STATE
import { initialState as _panel, stateApiUpdateIndex as $_panel } from './panel' //=> 面板 STATE
import {
	initialState as _cpu,
	stateApiUpdateIndex as $_cpu
} from './system/cpu/' //=> CPU信息
import {
	initialState as _memory,
	stateApiUpdateIndex as $_memory
} from './system/memory' //=> 内存信息
//[ api state ] | '导出格式 STATE: _{ state name } 、 INDEX: $_{ state name }'

//=> Slice 创建队列 | ' [ { slice name }, { slice } ] '
const sliceQueue: any[] = [
	['system', _system, $_system],
	['panel', _panel, $_panel],
	['cpu', _cpu, $_cpu]
]

//=> Create SLICE ARR
const exportArr = {} // 导出 SLICE 列表
const updateArr = {} // 导出 SLICE update 列表
const apiUpdateIndexArr = {} // 导出 slice fetch 列表
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
	apiUpdateIndexArr[name] = fetchUpdate
})

//=> 导出 Slice Arr
export const updater = updateArr
//=> 导出 Api Update Index Arr
export const apiIndexUpdater = apiUpdateIndexArr
//=> 导出 reducer Arr
export default { ...exportArr }
