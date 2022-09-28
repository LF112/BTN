/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { ID as _NID } from 'store/api/linkId'
//[ constants ]

import { useAddPopup } from 'store/popup'
import { BTFetch } from 'store/fetch'
import { setNetwork } from 'store/status'
//[ state ]

/**
 * CLICK HANDLER
 */

export default class {
	private $fetch: any
	private addPopup: any
	private setButtonStatus: any
	private setText: any
	private setReConnectCountdown: any
	constructor(Fn: any) {
		const { setButtonStatus, setText, setReConnectCountdown } = Fn

		const addPopup = useAddPopup()
		const $fetch = BTFetch()

		this.$fetch = $fetch
		this.addPopup = addPopup
		this.setButtonStatus = setButtonStatus
		this.setText = setText
		this.setReConnectCountdown = setReConnectCountdown
	}

	/**
	 * FN: 连接检测
	 */
	async check(auto: boolean = false): Promise<any> {
		this.setButtonStatus(-1)
		this.setText('正在重连...')
		const request = await this.$fetch(_NID['WhoAmI'])
		if (request?.status) {
			this.setButtonStatus(1)
			this.setText('连接成功！')
			setNetwork(true, { code: '200 OK!' }, 'code')
			this.addPopup('连接已恢复！', 'success', 1500)
			return true
		} else {
			this.setButtonStatus(0)
			if (auto) {
				this.setReConnectCountdown(5)
				this.setText('请求失败！即将自动尝试重连...')
			} else this.setText('请求失败！')
			this.addPopup('请求失败！', 'warn', 1500)
			return false
		}
	}
}
