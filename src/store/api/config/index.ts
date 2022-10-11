/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

import { ID } from 'store/api/linkId'
//[ API ID ]

//=> STORES
export const ipv6 = atom<boolean>(false) // IPv6 监听状态
export const overTime = atom<number>(0) // 面板登录状态过期时间

//=> INDEX
const { _OverTime, _IPv6Status } = ID
export const stateApiUpdateIndex: any = {
	ipv6: [_IPv6Status, ''],
	overTime: [_OverTime, 'data']
}
