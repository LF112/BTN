import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateStatus } from './slice'
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 读取 STATUS
export function useStatus(type: string, aims?: string): object {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) =>
			!aims ? state.status[type] : state.status[type][aims] /* state name */
	)

	//=> MAIN
	return useMemo(() => state, [state])
}

//=> 写入 STATUS
export function useUpdateStatus(): (
	data: string | boolean | number,
	type: string,
	aims?: string
) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(data: string | boolean | number, type: string, aims?: string) =>
			dispatch(updateStatus({ data: data, type: type, aims: aims })),
		[dispatch]
	)
}
