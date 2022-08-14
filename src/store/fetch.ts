/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { useCallback } from 'react'
import { DateTime } from 'luxon'
import axios from 'axios'
import { MD5 } from 'crypto-js'
import qs from 'qs'
//[ package ]

import { _connect } from './btnconfig'
import { setNetwork } from 'store/status'
//[ state ]

//=> FUNCTIONS
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
	const { baseUrl, apiUse, apiKey } = _connect.get()

	//=> Main
	return useCallback(async (url, param = {}, type = 'post', options = {}) => {
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
					setNetwork(false, data, 'msg')
					return null
				}

			//=> 打回数据
			return data
		} else {
			setNetwork(false, { status: false, msg: err.message }, 'msg')
			return { status: false, msg: err.message }
		}
	}, [])
}
