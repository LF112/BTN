import axios from 'axios'
import CryptoJS from 'crypto-js'

/**
 * @description 处理宝塔请求
 */
axios.interceptors.response.use(
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
