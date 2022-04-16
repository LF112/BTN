import { ID as _NID } from 'state/api/linkId'

/**
 * CLICK HANDLER
 */

export default class {
	private $fetch: any
	private addPopup: any
	private setButtonStatus: any
	constructor(Fn: any) {
		const { $fetch, addPopup, setButtonStatus } = Fn

		this.$fetch = $fetch
		this.addPopup = addPopup
		this.setButtonStatus = setButtonStatus
	}

	/**
	 * CLICK: 修复面板
	 */
	public async RepairPanel(): Promise<void> {
		this.setButtonStatus(-1)
		this.addPopup(
			`现在进行修复面板 ?`,
			'choose',
			async (close: () => void, choose: boolean) => {
				if (choose) {
					this.addPopup('将尝试校验并修复面板程序', 'info', 1500)
					//=> 确认修复
					const status = await this.$fetch(_NID['RepairPanel'])

					if (status) {
						//=> 重启面板 Web 服务
						this.$fetch(_NID['ReWeb'])
						this.addPopup('修复完成，使用 Ctrl + F5 刷新缓存', 'success', 1500)
						this.setButtonStatus(1)
					} else {
						this.setButtonStatus(0)
						this.addPopup('修复面板失败，请重试', 'error', 1500)
					}
					close()
				} else {
					this.setButtonStatus(0)
					close()
				}
			}
		)
	}
}
