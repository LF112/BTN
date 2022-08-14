/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

//=> STORE
// 网络状态
export const _apiStatus = atom<boolean>(false)
export const _aimsJson = atom<string>('')
export const _rawJson = atom<object>({})

//=> FUNCTIONS
// 更新网络状态
export const setNetwork = (
	status: boolean,
	rawJson: object,
	aimsJson: string
): void => {
	_rawJson.set(rawJson)
	_aimsJson.set(aimsJson)
	_apiStatus.set(status)
}
