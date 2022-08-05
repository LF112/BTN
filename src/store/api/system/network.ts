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
export const network = atom<object>({}) // 网络列表
export const networkUp = atom<number>(0) // 网络上行
export const networkDown = atom<number>(0) // 网络下行
export const networkUpTotal = atom<number>(0) // 网络上行总计
export const networkDownTotal = atom<number>(0) // 网络下行总计

//=> INDEX
const { _NetWork } = ID
export const stateApiUpdateIndex: any = {
	network: [_NetWork, 'network'],
	networkUp: [_NetWork, 'up'],
	networkDown: [_NetWork, 'down'],
	networkUpTotal: [_NetWork, 'upTotal'],
	networkDownTotal: [_NetWork, 'downTotal']
}
