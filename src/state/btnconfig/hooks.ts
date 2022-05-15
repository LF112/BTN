import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateConfig } from './slice'
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 读取 CONFIG
export function useConfig(type: string, page?: string): object {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) =>
			!page
				? state.btnconfig[type]
				: state.btnconfig[type][page] /* state name */
	)

	//=> MAIN
	return useMemo(() => state, [state])
}

//=> 写入 CONFIG
export function useUpdateConfig(): (
	data: string | boolean | number,
	type: string,
	page?: string
) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(data: string | boolean | number, type: string, page?: string) =>
			dispatch(updateConfig({ data: data, type: type, page: page })),
		[dispatch]
	)
}
