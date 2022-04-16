import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updatePageLoad, updateRipplesMask } from './slice'
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 获取载入状态
export function usePageLoadStatus() {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) => state.animation /* state name */
	)

	//=> MAIN
	return useMemo(() => state.pageLoad, [state])
}

//=> 更新载入状态
export function useUpdatePageLoadStatus(): (status: boolean) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(status: boolean) => dispatch(updatePageLoad({ status: status })),
		[dispatch]
	)
}

export function useRipplesMask(): [boolean, number, number] {
	const animation = useAppSelector((state: AppState) => state.animation)
	const { show, x, y } = animation.ripplesMask
	return [show, x, y]
}

export function useToggleFloatTips(): (show: boolean, el: any) => void {
	const animation = useAppSelector((state: AppState) => state.animation)
	const dispatch = useAppDispatch()
	return useCallback(
		(show: boolean, el: any) => {
			const { x, y } = el.getBoundingClientRect()
			dispatch(
				updateRipplesMask({
					show: show,
					x: x,
					y: y
				})
			)
		},
		[dispatch, animation.ripplesMask.show]
	)
}
