/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
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
