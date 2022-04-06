import { useCallback } from 'react'
import { AppState } from 'state'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { updateStatus } from 'state/status/slice'

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
 * @param url URL 地址，不含有域名等
 * @param type 请求类型，默认为 get
 * @param param 参数，默认为 {}
 * @param options 额外参数，默认为 {}
 */
export function BTFetch(): (
	url: string,
	param?: any,
	type?: string,
	options?: any
) => Promise<void> {
	//=> 读取 CONFIG
	const {
		connect: { baseUrl, apiUse, apiKey }
	} = useAppSelector((state: AppState) => state.config /* state name */)

	const dispatch = useAppDispatch()

	//=> Main
	return useCallback(
		async (url, param = {}, type = 'post', options = {}) => {
			//=> 使用 API 模式时
			if (apiUse) {
				const time = DateTime.now().toFormat('X')
				const format: number = JSON.parse(time)
				//=> 签名 API 密钥 | '理论上签名一次即可，宝塔面板不需要每次请求重新签名，后期可进行缓存优化。'
				param.request_token = MD5(`${format}${MD5(apiKey)}`).toString()
				param.request_time = format
			}

			//=> SET HEADER
			if (!options.headers) options.headers = {}
			//=> 解决跨域 ?
			options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
			const [err, result] = await axios[apiUse ? 'post' : type](
				url,
				qs.stringify(param),
				{
					baseURL: baseUrl,
					...options
				}
			)
				.then((data: any) => [null, data])
				.catch((err: any) => [err, null])

			if (!err) {
				const { data } = result
				const { status, msg } = data

				//=> API 请求失败校验
				if (!status && msg)
					if (/验证失败,禁止|IP校验失败,您的访问/g.test(msg)) {
						dispatch(
							updateStatus({
								data: false,
								type: 'network',
								aims: 'apiStatus',
								rawJson: data,
								aimsJson: 'msg'
							})
						)
						return null
					}

				//=> 打回数据
				return data
			} else {
				dispatch(
					updateStatus({
						data: false,
						type: 'network',
						aims: 'apiStatus',
						rawJson: { status: false, msg: err.message },
						aimsJson: 'msg'
					})
				)
				return { status: false, msg: err.message }
			}
		},
		[dispatch]
	)
}
