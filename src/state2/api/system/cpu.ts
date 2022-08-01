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
export const cpuUseRate = atom<number>(0) // CPU 使用率
export const cpuCount = atom<number>(0) // CPU 数量
export const cpuInfo = atom<number[]>([]) // CPU 逻辑核心占用
export const cpuModel = atom<string>('') // CPU 型号
export const cpuThreads = atom<number>(0) // CPU 线程数
export const cpuCores = atom<number>(0) // CPU 核心数

//=> INDEX
const { _NetWork } = ID
export const stateApiUpdateIndex: any = {
	cpu: [_NetWork, 'cpu']
}

export const Interceptor = {
	cpu: (data: any) => {
		const [
			_cpuUseRate,
			_cpuCount,
			_cpuInfo,
			_cpuModel,
			_cpuThreads,
			_cpuCores
		] = data
		cpuUseRate.set(_cpuUseRate)
		cpuCount.set(_cpuCount)
		cpuInfo.set(_cpuInfo)
		cpuModel.set(_cpuModel)
		cpuThreads.set(_cpuThreads)
		cpuCores.set(_cpuCores)
	}
}
