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
import { BTFetch } from 'state/fetch/hooks'
//[ hooks ]

/**
 * CLICK HANDLER
 */

export default class {
	private $fetch: any
	private addPopup: any
	constructor(Fn: any) {
		const {} = Fn

		const addPopup = useAddPopup()
		const $fetch = BTFetch()

		this.$fetch = $fetch
		this.addPopup = addPopup
	}
}
