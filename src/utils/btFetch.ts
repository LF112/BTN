import { DateTime } from 'luxon'
import axios from 'axios'
import { MD5 } from 'crypto-js'
import qs from 'qs'
//[ package ]

/**
 * BT fetch | '站点安排的网络请求任务罢了。'
 * @connectState connect state
 * @param callback Callback
 * @param url URL 地址，不含有域名等
 * @param type 请求类型，默认为 get
 * @param param 参数，默认为 {}
 * @param options 额外参数，默认为 {}
 */
export default (
	connectState: any,
	callback: any,
	url: string,
	type = 'get',
	param = {} as any,
	options = {} as any
): any => {
	//=> 读取 CONFIG
	const { baseUrl, apiUse, apiKey } = connectState

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

	//=> Main
	axios[apiUse ? 'post' : type](url, qs.stringify(param), {
		baseURL: baseUrl,
		...options
	})
		.then((result: any) => callback(result.data))
		.catch((error: any) => callback(error))
}
