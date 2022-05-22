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
export type PopupBoxState = {
	aims: string
	title: string
	show: boolean
	loaded: string[]
}

//=> State 表初始化 | '是这个 state 的一些默认值'
export const initialState: PopupBoxState = {
	aims: null,
	title: '',
	show: false,
	loaded: []
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
		},
		addLoaded: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload
			//=> 更新 state
			if (!state.loaded.includes(id)) state.loaded.push(id)
		}
	}
})

//=> 导出 Slice | '一般直接填写注册的 FUNCTIONS'
export const { updateAims, updateShow, addLoaded } = popupBoxSlice.actions
//=> export reducer
export default popupBoxSlice.reducer
