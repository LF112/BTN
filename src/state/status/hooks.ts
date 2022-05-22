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
import { updateStatus } from './slice'
//[ package ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

//=> 读取 STATUS
/**
 * 读取 STATUS
 * @param type status 名
 * @param aims status 目标
 * @returns status object / undefined
 */
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
	aims?: string,
	rawJson?: object,
	aimsJson?: string
) => void {
	const dispatch = useAppDispatch()

	//=> MAIN
	return useCallback(
		(
			data: string | boolean | number,
			type: string,
			aims?: string,
			rawJson?: object,
			aimsJson?: string
		) =>
			dispatch(
				updateStatus({
					data: data,
					type: type,
					aims: aims,
					rawJson: rawJson,
					aimsJson: aimsJson
				})
			),
		[dispatch]
	)
}
