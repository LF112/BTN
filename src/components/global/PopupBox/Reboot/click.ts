import { ID as _NID } from 'state/api/linkId'

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
			$fetch,
			addPopup,
			setPanelButtonStatus,
			setServerButtonStatus,
			TaskList,
			SetTaskArr,
			setLight,
			webserver,
			Close
		} = Fn
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
					this.Close()
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