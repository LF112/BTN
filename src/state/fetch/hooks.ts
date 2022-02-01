import { useCallback } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { DateTime } from 'luxon'
import axios from 'axios'
import { MD5 } from 'crypto-js'
import qs from 'qs'

/***
 * 导出该 HOOKS 的方法 | '一般在组件直接引入这个文件，使用里面提供的方法'
 *
 * use{{ function name }} => 读取 state
 * useUpdate{{ function name }} => 更新 state
 */

/**
 * Default fetch | '站点安排的网络请求任务罢了。'
 * @param slice 要更新的 state slice
 * @param url URL 地址，不含有域名等
 * @param type 请求类型，默认为 get
 * @param polling 轮询时间，默认为 0 则不开启
 * @param param 参数，默认为 {}
 * @param options 额外参数，默认为 {}
 */
export function $fetch(
	slice: any,
	url: string,
	type = 'get',
	polling = 0,
	param = {} as any,
	options = {} as any
): () => void {
	//=> 读取 CONFIG
	const {
		connect: { baseUrl, apiUse, apiKey }
	} = useAppSelector((state: AppState) => state.config /* state name */)

	//=> 使用 API 模式时
	if (apiUse) {
		const time = DateTime.now().toFormat('X')
		const format: number = JSON.parse(time)
		param.request_token = MD5(`${format}${MD5(apiKey)}`).toString()
		param.request_time = format
	}
	//=> 解决跨域
	if (!options.headers) options.headers = {}
	options.headers['Content-Type'] = 'application/x-www-form-urlencoded'

	//=> Main
	//=> READ STATE
	const dispatch = useAppDispatch()
	if (!polling && polling === 0)
		//=> 仅为请求时

		return useCallback(
			() =>
				axios[apiUse ? 'post' : type](url, qs.stringify(param), {
					baseURL: baseUrl,
					...options
				})
					.then((result: any) => dispatch(slice(result.data)))
					.catch((error: any) => dispatch(slice(error))),
			[dispatch]
		)
	else {
		//=> 轮询
	}
}
