import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateAims, updateShow } from './slice'
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 获取载入 ID
export function useLoadId(): [string, string] {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) => state.popupbox /* state name */
	)

	//=> MAIN
	return useMemo(() => [state.aims, state.title], [state])
}

//=> 更新载入 ID
export function useUpdateLoadId(): (aims: string, title: string) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(aims: string, title: string) =>
			dispatch(updateAims({ aims: aims, title: title })),
		[dispatch]
	)
}

//=> 获取弹窗显示状态
export function useShow() {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) => state.popupbox /* state name */
	)

	//=> MAIN
	return useMemo(() => state.show, [state])
}

//=> 显示弹窗
export function useUpdateShow(): (show: boolean) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(show: boolean) => dispatch(updateShow({ show: show })),
		[dispatch]
	)
}
