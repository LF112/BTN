/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import axios from 'axios'

/**
 * 拦截重复请求
 */
const CancelToken = axios.CancelToken
let requestQueue = []
const HandleRequest = ({ config }) => {
	const { url, method, data = {}, params = {} } = config

	const StringData = JSON.stringify(data)
	const StringParams = JSON.stringify(params)

	const panding = requestQueue.filter(
		v =>
			v.url === url &&
			v.method === method &&
			v.data === StringData &&
			v.params === StringParams
	)

	if (panding.length) config.cancelToken = new CancelToken(c => c('repeat'))
	else
		requestQueue.push({
			url,
			data: StringData,
			params: StringParams,
			method
		})
}

const HandleResponse = ({ config }) => {
	const { url, data = JSON.stringify({}), params = JSON.stringify({}) } = config
	const reqQueue = requestQueue.filter(
		v => v.url !== url && v.data !== data && v.params !== params
	)
	requestQueue = reqQueue
}

// 请求拦截
axios.interceptors.request.use(config => {
	HandleRequest({ config })
	return config
})

// 响应拦截器
axios.interceptors.response.use(response => {
	HandleResponse({ config: response.config })
	return response
})

/**
 * @description 处理宝塔请求
 */
/*axios.interceptors.response.use(
	res => {
		//=> 从 res 中取出 data
		const { data = '' } = res
		//=> 获取 x-http-token
		const requestToken = res.config.headers['x-http-token'] as string

		//=> 拦截检测是否为 BT-CRT
		if (typeof data !== 'object')
			if (data.substring(0, 6) == 'BT-CRT' && requestToken !== undefined) {
				//=> 获取宝塔 x-http-token 密钥
				const BT_PWD =
					requestToken.substring(0, 8) + requestToken.substring(40, 48)
				//=> 解密请求的数据
				const Crypto_KEY = CryptoJS.enc.Utf8.parse(BT_PWD)
				const Decrypt_data = CryptoJS.AES.decrypt(
					data.substring(6),
					Crypto_KEY,
					{
						mode: CryptoJS.mode.ECB,
						padding: CryptoJS.pad.ZeroPadding
					}
				)

				//=> 写入 res
				// 直接写入
				res.data = Decrypt_data.toString(CryptoJS.enc.Utf8)

				//=> 解析 JSON
				try {
					const toJson = JSON.parse(res.data)
					if (typeof toJson === 'object') res.data = toJson
				} catch (e) {}
			} else return res
		else return res
		//=> 原路打回数据
	},
	error => Promise.reject(error)
)
*/
