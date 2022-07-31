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
// 页面载入状态
export const _pageLoad = atom<boolean>(false)
// 水波纹遮罩状态
export const _ripplesMask = atom<$ripplesMask>({
	show: false,
	x: 0,
	y: 0
})

//=> FUNCTIONS
// 更新页面载入状态
export const setPageLoad = (status: boolean): void => _pageLoad.set(status)
// 更新水波纹状态
export const setRipplesMask = (show: boolean, el: HTMLElement): void => {
	const { x, y } = el.getBoundingClientRect()
	_ripplesMask.set({ show, x, y })
}

//=> Types
export type $ripplesMask = { show: boolean; x: number; y: number }
