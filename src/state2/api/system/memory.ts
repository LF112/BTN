/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

import { ID } from 'state2/api/linkId'
//[ API ID ]

//=> STORES
export const memoryTotal = atom<number>(0) // 内存总量
export const memoryFree = atom<number>(0) // 内存空闲
export const memoryBuffers = atom<number>(0) // 内存缓冲
export const memoryCached = atom<number>(0) // 内存缓存
export const memoryRealUsed = atom<number>(0) // 内存使用

//=> INDEX
const { _NetWork } = ID
export const stateApiUpdateIndex: any = {
	mem: [_NetWork, 'mem']
}

//=> Interceptor
export const Interceptor = {
	mem: (data: any) => {
		const { memBuffers, memCached, memFree, memRealUsed, memTotal } = data
		memoryTotal.set(memTotal)
		memoryFree.set(memFree)
		memoryBuffers.set(memBuffers)
		memoryCached.set(memCached)
		memoryRealUsed.set(memRealUsed)
	}
}
