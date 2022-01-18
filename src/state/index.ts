import { configureStore } from '@reduxjs/toolkit'
//[ package ]

//
import animation from './animation/slice'
//[ 导入 state ]

//=> 启用 state 缓存
//import { save, load } from 'redux-localstorage-simple'
//const PERSISTED_KEYS: string[] = [] //=> 指定要缓存的 state 键名

const store = configureStore({
	//=> 绑定 state
	reducer: {
		animation
	}

	//=> 插入缓存 state 中间件
	// middleware: getDefaultMiddleware =>
	// 	getDefaultMiddleware({ thunk: true }).concat(
	// 		save({ states: PERSISTED_KEYS, debounce: 500 })
	// 	),
	// preloadedState: load({ states: PERSISTED_KEYS }) // 配置缓存的 state
})

//=> export State
export default store

//=> 导出 dispatch 和 selector Types
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
