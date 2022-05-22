/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
export type StatusState = {
	network: {
		apiStatus: boolean
		rawJson: object
		aimsJson: string
	}
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: StatusState = {
	network: {
		apiStatus: true,
		rawJson: {},
		aimsJson: ''
	}
}

//=> SLICE
export const statusSlice = createSlice({
	name: 'status', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		// 更新配置
		updateStatus: (
			state,
			action: PayloadAction<{
				data: string | boolean | number
				type: string
				aims?: string
				rawJson?: object
				aimsJson: string
			}>
		) => {
			const { data, type, aims, rawJson, aimsJson } = action.payload //=> 取得参数 | '一般从这取回 hooks 传来的参数'
			//=> 更新 state

			if (rawJson) state[type].rawJson = rawJson
			if (aimsJson) state[type].aimsJson = aimsJson
			if (!aims)
				//=> 第一层 | '指 state 对象深度'
				state[type] = data
			//=> 第二层
			else state[type][aims] = data
			// '你在哪一层？'
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { updateStatus } = statusSlice.actions
//=> export reducer
export default statusSlice.reducer
