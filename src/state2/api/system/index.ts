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
export const pythonVersion = atom<string>('-') // Python 版本
export const webServer = atom<string>('-') // Web 服务器

//=> INDEX
const { _ConfigInfo, _SystemInfo } = ID
export const stateApiUpdateIndex: any = {
	pythonVersion: [_SystemInfo, 'data.py'],
	webServer: [_ConfigInfo, 'webserver']
}
