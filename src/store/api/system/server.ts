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
export const OS = atom<string>('-') // 内核名称
export const OSVersion = atom<string>('-') // 内核版本
export const OSArch = atom<string>('-') // 内核架构
export const systemDate = atom<string>('-') // 系统时间
export const distribution = atom<string>('-') // 发行版本
export const systemLoad = atom<number>(0) // 系统负载
export const systemLoadMax = atom<number>(0) // 系统最高负载

//=> INDEX
const { CONFIG, _ConfigInfo, _NetWork, _SystemInfo } = ID
export const stateApiUpdateIndex: any = {
	OS: [_SystemInfo, 'data.core'],
	OSVersion: [_SystemInfo, 'data.version'],
	OSArch: [_SystemInfo, 'data.architecture'],
	systemDate: [_ConfigInfo, 'systemdate'],
	distribution: [CONFIG, 'distribution'],
	systemLoad: [_NetWork, 'load']
}

//=> Interceptor
export const Interceptor = {
	systemLoad: (data: any) => {
		const { one, max } = data
		systemLoad.set(one)
		systemLoadMax.set(max)
	}
}
