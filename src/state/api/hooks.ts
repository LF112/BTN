import { useCallback, useMemo } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
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
export function useUpdateApi(): (queue: [string[]] | string[]) => void {
	const dispatch = useAppDispatch()

	//=> READ CONFIG | '此处仅供给 BtFetch 工具使用'
	const { connect } = useAppSelector((state: AppState) => state.config)

	//=> MAIN
	return useCallback(
		(queue: [string[]] | string[]) => {
			//=> 仅需要更新一个
			if (typeof queue[0] === 'string') {
				const [aims, ...args] = queue
				FitFetch(connect, dispatch, aims, args)
			} //=> 更新多个
			else
				queue.forEach((childQueue: any) => {
					const [aims, ...args] = childQueue
					FitFetch(connect, dispatch, aims, args)
				})
		},
		[dispatch]
	)
}

/**
 * 拟合请求
 * @param connect 面板连接信息 | '从 state 传入'
 * @param dispatch state dispatch 方法
 * @param aims 需要更新的 API 类型
 * @param queue 需要更新的 API 索引
 */
const FitFetch = (connect: any, dispatch: any, aims: any, args: any) => {
	//=> 拟合请求队列
	const fetchUpdateParam = {}
	args.forEach((arg: string) => {
		const update = apiIndexUpdater[aims][arg]
		if (update !== undefined) {
			const [URL, updateParamArr] = update
			if (!fetchUpdateParam[URL]) fetchUpdateParam[URL] = {}
			fetchUpdateParam[URL][arg] = updateParamArr
		}
	})

	//=> 历遍发出请求
	Object.keys(fetchUpdateParam).forEach((URL: string) => {
		$fetch(
			connect,
			(data: any) => {
				const fetchParamArr = fetchUpdateParam[URL]
				const aimsObj = Object.keys(fetchParamArr)
				aimsObj.forEach((isAims: string) => {
					//=> 索引对应值并 dispatch 更新 state
					dispatch(
						updater[aims].update({
							apiType: isAims,
							value: queueObj(data, fetchParamArr[isAims])
						})
					)
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
