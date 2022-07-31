/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { ID as _NID } from 'state/api/linkId'
//[ constants ]

import { BTFetch } from 'state2/fetch'
import { useUpdateApi } from 'state/api/hooks'
import { useAddPopup } from 'state/popup/hooks'
//[ hooks ]

/**
 * CLICK HANDLER
 */
export default class {
	private $fetch: any
	private isNew: boolean
	private Beta: boolean
	private setButtonStatus: (number: number) => void
	private addPopup: (
		content: string,
		type: string,
		callback: any,
		icon?: any
	) => void
	private updateApi: (queue: any) => void

	constructor(Fn: any) {
		const { setButtonStatus, Beta, isNew } = Fn

		const updateApi = useUpdateApi()
		const $fetch = BTFetch()
		const addPopup = useAddPopup()

		this.$fetch = $fetch // BT FETCH 网络请求
		this.isNew = isNew // 是否有新版本
		this.Beta = Beta // 是否为测试版
		this.setButtonStatus = setButtonStatus // 更新按钮状态
		this.addPopup = addPopup // 弹窗
		this.updateApi = updateApi // 内置更新数据方法
	}

	/**
	 * CLICK: 更新面板
	 */
	public async UpdatePanel(): Promise<void> {
		if (this.isNew) {
			//=> 仅有新版本更新时
			this.setButtonStatus(-1)
			if (await this._UpdatePanel()) this.setButtonStatus(1)
			else this.setButtonStatus(0)
		} else {
			//=> 無新版本，检测更新
			this.setButtonStatus(-1)
			setTimeout(() => {
				this.setButtonStatus(1)
				this.addPopup('检查完毕', 'success', 1500)
			}, 500)
			//=> 刷新数据
			this.updateApi([
				'panel.isNew',
				'panel.betaVersionId',
				'panel.VersionId',
				'panel.betaVersionLogs',
				'panel.VersionLogs',
				'panel.betaUptime',
				'panel.Uptime'
			])
		}
	}

	/**
	 * Fn: 更新面板
	 */
	public async _UpdatePanel(): Promise<boolean> {
		//=> 升级面板
		const { msg, status } = (await this.$fetch(_NID['UpdatePanel'], {
			toUpdate: true
		})) as any
		if (status) {
			this.addPopup(msg, 'success', 1500)

			//=> 重启面板 Web 服务 | '也不知道谁惯的，请求了一直不响应，爱咋咋咋咋'
			this.$fetch(_NID['ReWeb']) // ¿你是摆设吗

			setTimeout(() => window.location.reload(), 2500)

			return true
		} else {
			this.addPopup(msg, 'warn', 1500)
			return false
		}
	}

	/**
	 * Click: 切换正式/测试版
	 */
	public async SwitchVersion(): Promise<void> {
		this.setButtonStatus(-1)
		this.addPopup(
			`真的要切换${!this.Beta ? '测试版' : '正式版'}吗`,
			'choose',
			async (close: () => void, choose: boolean) => {
				if (choose) {
					//=> 确认升级
					//=> 切换版本状态
					const { msg, status } = (await this.$fetch(
						_NID[this.Beta ? 'to_not_beta' : 'approve_beta']
					)) as any
					if (status) {
						this.addPopup('切换成功，正在更新面板...', 'load', 2000)

						//=> 检查面板升级状态 | '宝塔切换测试/正式版后的必备流程'
						await this.$fetch(_NID['UpdatePanel'], {
							check: true
						})

						//=> 升级面板 | '切换版本只是切换了状态，还需要升级才会更新'
						setTimeout(async () => {
							if (await this._UpdatePanel()) this.setButtonStatus(1)
							else {
								this.addPopup('自动升级失败，请重新升级', 'warn', 1500)
								this.setButtonStatus(0)
							}
							close()
						}, 1000)
					} else {
						//=> 版本切换失败
						close()
						this.setButtonStatus(0)
						this.addPopup(msg, 'warn', 1500)
					}
				} else {
					//=> 取消升级
					close()
					this.setButtonStatus(0)
				}
			}
		)
	}
}
