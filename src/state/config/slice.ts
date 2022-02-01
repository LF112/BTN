import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
export type ConfigState = {
	connect: {
		baseUrl: string
		apiUse: boolean
		apiKey: string
	}
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: ConfigState = {
	connect: {
		baseUrl: '/', // BT-PANEL URL
		apiUse: false,
		apiKey: ''
	}
}

//=> SLICE
export const configSlice = createSlice({
	name: 'config', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		// 更新配置
		updateConfig: (
			state,
			action: PayloadAction<{
				data: string | boolean | number
				type: string
				page?: string
			}>
		) => {
			const { data, type, page } = action.payload //=> 取得参数 | '一般从这取回 hooks 传来的参数'
			//=> 更新 state

			if (!page)
				//=> 第一层 | '指 state 对象深度'
				state[type] = data
			//=> 第二层
			else state[type][page] = data
			// '你在哪一层？'
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { updateConfig } = configSlice.actions
//=> export reducer
export default configSlice.reducer
