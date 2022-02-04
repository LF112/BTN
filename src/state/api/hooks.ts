import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import _ from 'lodash'
//[ package ]

import { updater, apiIndexUpdater } from './index'
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
export function useApiState(aims: string): object | undefined {
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
 *  @param queue 更新索引 | ↓
 * 更新多个 => [[{ type }, ...{ child }], [{ type }, ...{ child }]] / 更新一个 => [{ type }, ...{ child }]
 */
export function useUpdateApi(): (queue: any) => void {
	const dispatch = useAppDispatch()

	//=> READ CONFIG | '此处仅供给 BtFetch 工具使用'
	const { connect } = useAppSelector((state: AppState) => state.config)

	//=> MAIN
	return useCallback(
		(queue: any) => {
			//=> 仅需要更新一个
			if (typeof queue[0] === 'string') {
				const [aims, ...args] = queue

				//=> 拟合请求
				const [fetchUpdateParam] = FitRequestQueue(aims, args)
				sendRequest(connect, dispatch, fetchUpdateParam, aims)
			} //=> 更新多个
			else {
				let fetchUpdateParam = {}
				let fetchParamArr = {}
				queue.forEach((childQueue: any) => {
					const [aims, ...args] = childQueue

					//=> 拟合请求队列
					const [fitRequestQueue, fitFetchParamArr] = FitRequestQueue(
						aims,
						args
					)
					//=> 合并更新索引
					fetchParamArr = { ...fetchParamArr, ...fitFetchParamArr }
					//=> 合并请求队列
					fetchUpdateParam = _.merge(fitRequestQueue, fetchUpdateParam)
				})
				sendRequest(connect, dispatch, fetchUpdateParam, fetchParamArr)
			}
		},
		[dispatch]
	)
}

/**
 * 拟合请求队列
 * @param aims 需要更新的 API 类型
 * @param args 需要更新的 API 索引
 */
const FitRequestQueue = (aims: any, args: any): [any, any] => {
	const fetchUpdateParam = {}
	const fetchParamArr = {}
	args.forEach((arg: string) => {
		const update = apiIndexUpdater[aims][arg]
		if (update !== undefined) {
			const [URL, updateParamArr] = update
			if (!fetchUpdateParam[URL]) fetchUpdateParam[URL] = {}
			fetchUpdateParam[URL][arg] = updateParamArr
			fetchParamArr[arg] = aims
		}
	})
	return [fetchUpdateParam, fetchParamArr]
}

/**
 * 发出请求 Fetch
 * @param connect 面板连接信息 | '从 state 传入'
 * @param dispatch state dispatch 方法
 * @param fitRequestQueue 传入 拟合请求队列 的返回
 * @param aims 需要更新的 API 类型
 */
const sendRequest = (
	connect: any,
	dispatch: any,
	fitRequestQueue: any,
	aims: any
) => {
	const queryAims = typeof aims === 'object' ? true : false
	Object.keys(fitRequestQueue).forEach((URL: string) => {
		$fetch(
			connect,
			(data: any) => {
				const fetchParamArr = fitRequestQueue[URL]
				const aimsObj = Object.keys(fetchParamArr)
				aimsObj.forEach((isAims: string) => {
					//=> 索引对应值并 dispatch 更新 state
					dispatch(
						updater[!queryAims ? aims : aims[isAims]].update({
							apiType: isAims,
							value: queueObj(data, fetchParamArr[isAims])
						})
					)
					// '此处可合并 action，对于相同的 API 类型，可以合并到一起再发送，节省 action 开销。'
				})
				//console.log(data)
			},
			URL
		)
	})
}

/**
 * 索引对象
 * @param obj 对象
 * @param indexArr 索引数组
 * @returns 值
 */
const queueObj = (obj: Object, queue: string[], count = 1, endCount = 0) => {
	if (count === 1)
		if (queue.length === 1) return obj[queue[0]]
		else return queueObj(obj[queue[0]], queue, count + 1, queue.length)
	else {
		queue.shift()
		if (count === endCount) return obj[queue[0]]
		else return queueObj(obj[queue[0]], queue, count + 1, endCount)
	}
}
