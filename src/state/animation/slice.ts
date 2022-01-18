import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
export type AnimationState = {
	pageLoad: boolean
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: AnimationState = {
	pageLoad: false
}

//=> SLICE
export const animationSlice = createSlice({
	name: 'animation', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		updatePageLoad: (state, action: PayloadAction<{ status: boolean }>) => {
			const { status } = action.payload //=> 取得参数 | '一般从这取回 hooks 传来的参数'
			//=> 更新 state
			state.pageLoad = status
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { updatePageLoad } = animationSlice.actions
//=> export reducer
export default animationSlice.reducer
