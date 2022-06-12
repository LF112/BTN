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
import _ from 'lodash'
//[ package ]

import { updater, apiIndexUpdater, urlMappingTable } from './index'
//[ state / hooks ]

import $fetch from 'utils/btFetch'
//[ utils ]

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

/**
 * 获取 state
 * @param aims state 名字
 * @returns state object / undefined
 */
export function useApiState(aims: string): any {
	//=> READ STATE
	const state = useAppSelector(
		(state: AppState) => state[aims] /* state name */
	)

	//=> MAIN
	return useMemo(() => state, [state])
}

/**
 * 更新 state
 * @returns ({...}) => void | ↓
 * @param queue 更新索引 | ↓
 * 更新多个 => [[{ type }, ...{ child }], [{ type }, ...{ child }]] / 更新一个 => [{ type }, ...{ child }]
 */
export function useUpdateApi(): (queue: any) => void {
	const dispatch = useAppDispatch()

	//=> READ CONFIG | '此处仅供给 BtFetch 工具使用'
	const STATE = useAppSelector((state: AppState) => state)
	const { connect } = STATE.btnconfig

	//=> MAIN
	//=> 当 API 未被限制可用时
	return useCallback(
		(queue: any) => sendRequest(connect, dispatch, FitRequestQueue(queue)),
		[dispatch]
	)
}

/**
 * 拟合请求队列
 * @param queue 请求索引列表
 */
const FitRequestQueue = (queue: string[]): any[] => {
	const FitArr = []
	queue.forEach((aims: string) => FitArr.push(apiIndexUpdater[aims]))
	return FitArr
}

/**
 * 发出请求 Fetch
 * @param connect 面板连接信息 | '从 state 传入'
 * @param dispatch state dispatch 方法
 * @param FitRequestQueue 请求索引队列
 */
const sendRequest = (connect: any, dispatch: any, FitRequestQueue: any[]) => {
	//console.log(FitRequestQueue)
	FitRequestQueue.forEach(async (URL: string) => {
		const resultArr = await $fetch(connect, URL)
		if (resultArr) {
			const [result, pureDispatch] = resultArr //=> 取出请求返回数据
			if (!pureDispatch) {
				//=> 取出 Url 映射 dispatch 表
				urlMappingTable[URL].forEach(([apiQuery, updaterName, updaterAims]) => {
					//=> 索引对应值并 dispatch 更新 state
					dispatch(
						updater[updaterName].update({
							apiType: updaterAims,
							value: apiQuery === '' ? result : _.get(result, apiQuery)
						})
					)
				})
				// '此处可合并 action，对于相同的 API 类型，可以合并到一起再发送，节省 action 开销。'
			} else dispatch(result) //=> 直接打回 dispatch
		}
	})
}
