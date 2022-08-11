/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { ID as _NID } from 'store/api/linkId'
//[ constants ]

import { useAddPopup, closePopup } from 'store/popup'
import { BTFetch } from 'store/fetch'
import { useUpdateApi } from 'store/api'
//[ hooks ]

/**
 * CLICK HANDLER
 */

export default class {
	private $fetch: any
	private addPopup: any
	private closePopup: any
	private setButtonStatus: (number: number) => void
	private setDetailButtonStatus: (number: number) => void
	private setIgnoreButtonStatus: (number: number) => void
	private setReCheckButtonStatus: (number: number) => void
	private updateApi: (queue: any) => void

	constructor(Fn: any) {
		const {
			setButtonStatus,
			setDetailButtonStatus,
			setIgnoreButtonStatus,
			setReCheckButtonStatus
		} = Fn

		const addPopup = useAddPopup()
		const $fetch = BTFetch()
		const updateApi = useUpdateApi()

		this.setButtonStatus = setButtonStatus // 更新按钮状态
		this.setDetailButtonStatus = setDetailButtonStatus
		this.setIgnoreButtonStatus = setIgnoreButtonStatus
		this.setReCheckButtonStatus = setReCheckButtonStatus
		this.updateApi = updateApi // 内置更新数据方法
		this.$fetch = $fetch
		this.addPopup = addPopup
		this.closePopup = closePopup
	}

	/**
	 * CLICK: 重新安全检测
	 */
	public async SecurityCheck(): Promise<void> {
		this.setButtonStatus(-1)
		const CBID = this.addPopup('正在进行安全检查...', 'load', -1)
		//=> 刷新数据
		const { ignore } = (await this.$fetch(_NID['_WarningList'])) as any
		if (ignore) {
			this.closePopup(CBID)
			this.setButtonStatus(1)
			this.addPopup('检查完毕', 'success', 1500)
		} else {
			//=> 检测失败
			this.closePopup(CBID)
			this.setButtonStatus(0)
			this.addPopup('API 异常', 'warn', 1500)
		}
	}

	/**
	 * CLICK: 忽略条目
	 */
	public async SaladForked(
		aims: string,
		title: string,
		ignore: boolean = false
	): Promise<void> {
		this.setIgnoreButtonStatus(-1)
		const CBID = this.addPopup('正在处理...', 'load', -1)
		const { status, msg } = await this.$fetch(_NID['SetWaringIgnore'], {
			m_name: aims
		})
		if (status) {
			this.updateApi([
				'security.riskList',
				'security.securityList',
				'security.ignoreList'
			])
			this.closePopup(CBID)
			this.setIgnoreButtonStatus(1)
			this.addPopup(`已${ignore ? '取消' : ''}忽略${title}`, 'success', 1500)
		} else {
			//=> 忽略失败
			this.closePopup(CBID)
			this.setIgnoreButtonStatus(0)
			this.addPopup(msg, 'warn', 1500)
		}
	}
}
