import { createSlice, PayloadAction } from '@reduxjs/toolkit'
//[ package ]

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
export type PopupBoxState = {
	aims: string
	title: string
	show: boolean
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: PopupBoxState = {
	aims: null,
	title: '',
	show: false
}

//=> SLICE
export const popupBoxSlice = createSlice({
	name: 'popupbox', //=> State name | '一般为 state 名字'
	initialState,
	reducers: {
		//=> FUNCTIONS | 'state hooks 的一些处理方法 CRUD 等'
		updateAims: (
			state,
			action: PayloadAction<{ aims: string; title: string }>
		) => {
			const { aims, title } = action.payload //=> 取得参数 | '一般从这取回 hooks 传来的参数'
			//=> 更新 state
			state.aims = aims
			state.title = title
		},
		updateShow: (state, action: PayloadAction<{ show: boolean }>) => {
			const { show } = action.payload
			//=> 更新 state
			state.show = show
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { updateAims, updateShow } = popupBoxSlice.actions
//=> export reducer
export default popupBoxSlice.reducer
