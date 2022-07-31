/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { ID as _NID } from 'state/api/linkId'
//[ constants ]

import { useAddPopup } from 'state/popup/hooks'
import { BTFetch } from 'state2/fetch'
//[ hooks ]

/**
 * CLICK HANDLER
 */

export default class {
	private $fetch: any
	private addPopup: any
	private setPanelButtonStatus: any
	private setServerButtonStatus: any
	private TaskList: any
	private SetTaskArr: any
	private setLight: any
	private webserver: string
	private Close: any
	constructor(Fn: any) {
		const {
			setPanelButtonStatus,
			setServerButtonStatus,
			TaskList,
			SetTaskArr,
			setLight,
			webserver,
			Close
		} = Fn

		const addPopup = useAddPopup()
		const $fetch = BTFetch()

		this.$fetch = $fetch
		this.addPopup = addPopup
		this.setPanelButtonStatus = setPanelButtonStatus
		this.setServerButtonStatus = setServerButtonStatus
		this.TaskList = TaskList
		this.SetTaskArr = SetTaskArr
		this.setLight = setLight
		this.webserver = webserver
		this.Close = Close
	}

	/**
	 * CLICK: 重启面板服务
	 */
	public async RebootPanel(): Promise<void> {
		this.setPanelButtonStatus(-1)
		this.addPopup(
			`继续重启面板服务 ?`,
			'choose',
			async (close: () => void, choose: boolean) => {
				if (choose) {
					//=> 确认重启
					const { status, msg } = await this.$fetch(_NID['ReWeb'])
					if (status) {
						this.setPanelButtonStatus(1)
						this.addPopup(msg, 'success', 1500)
					} else {
						this.setPanelButtonStatus(0)
						this.addPopup(msg, 'error', 1500)
					}
					close()
				} else {
					//=> 取消重启
					close()
					this.setPanelButtonStatus(0)
				}
			}
		)
	}

	/**
	 * CLICK: 重启服务器
	 */
	public async RebootServer(): Promise<void> {
		this.setServerButtonStatus(-1)
		this.addPopup(
			`继续重启服务器 ?`,
			'choose',
			async (close: () => void, choose: boolean) => {
				if (choose) {
					//=> 确认重启
					this.setLight(0)
					this.TaskList[0].run = -1
					this.SetTaskArr(this.TaskList)

					await this.stopWebServer(close) // 停止 Web 服务
					await this.stopSqlServer(close) // 停止 Sql 服务
					await this.rebootServer(close) // 发送重启指令
					this.addPopup('服务器已重启！', 'success', 1500)
					close()
					setTimeout(() => this.Close(), 2000)
				} else {
					//=> 取消重启
					close()
					this.setServerButtonStatus(0)
				}
			}
		)
	}

	/**
	 *  Fn: 停止 Web 服务
	 */
	private async stopWebServer(close: any): Promise<void> {
		//=> 停止 Web 服务
		const { status, msg } = await this.$fetch(_NID['ServiceAdmin'], {
			name: this.webserver,
			type: 'stop'
		})
		if (status) {
			this.TaskList[0].run = 1
			this.TaskList[1].run = -1
			this.setLight(1)
			this.SetTaskArr(this.TaskList)
		} else {
			//=> 停止 Web 服务失败
			this.TaskList[0].run = 0
			this.SetTaskArr(this.TaskList)
			this.setServerButtonStatus(0)
			this.addPopup(msg, 'error', 1500)
			close()
		}
	}

	/**
	 *  Fn: 停止 Mysql 服务
	 */
	private async stopSqlServer(close: any): Promise<void> {
		const { status: mysqlStatus, msg: mysqlMsg } = await this.$fetch(
			_NID['ServiceAdmin'],
			{ name: 'mysqld', type: 'stop' }
		)
		if (mysqlStatus) {
			this.TaskList[1].run = 1
			this.TaskList[2].run = -1
			this.setLight(2)
			this.SetTaskArr(this.TaskList)
		} else {
			//=> 停止 Mysql 服务失败
			this.TaskList[1].run = 0
			this.SetTaskArr(this.TaskList)
			this.setServerButtonStatus(0)
			this.addPopup(mysqlMsg, 'error', 1500)
			close()
		}
	}

	/**
	 *  Fn: 重启服务器
	 */
	private async rebootServer(close: any): Promise<void> {
		const { status: rebootStatus, msg: rebootMsg } = await this.$fetch(
			_NID['RestartServer']
		)
		if (rebootStatus) {
			this.TaskList[2].run = 1
			this.SetTaskArr(this.TaskList)
		} else {
			//=> 重启服务器失败
			this.TaskList[2].run = 0
			this.SetTaskArr(this.TaskList)
			this.setServerButtonStatus(0)
			this.addPopup(rebootMsg, 'error', 1500)
			close()
		}
	}
}
