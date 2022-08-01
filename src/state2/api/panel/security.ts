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
export const securityList = atom<any[]>([]) // 安全列表
export const riskList = atom<any[]>([]) // 风险列表
export const ignoreList = atom<any[]>([]) // 忽略列表

//=> INDEX
const { _WarningList } = ID
export const stateApiUpdateIndex: any = {
	securityList: [_WarningList, 'security'],
	riskList: [_WarningList, 'risk'],
	ignoreList: [_WarningList, 'ignore']
}
