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
export const popupAims = atom<string>(null) //=> 展开弹窗 ID
export const popupTitle = atom<string>('') //=> 弹窗标题
export const popupShow = atom<boolean>(false) //=> 弹窗展开状态
export const popupLoaded = atom<string[]>([]) //=> 弹窗已加载的 ID

//=> FUNCTIONS
// 打开指定弹窗
export const popupOpen = (aims: string, title: string) => {
	popupAims.set(aims)
	popupTitle.set(title)
}
// 弹窗展示状态
export const updateShow = (show: boolean) => popupShow.set(show)
// 缓存弹窗已加载的弹窗
export const addLoaded = (id: string) => {
	const Loaded = popupLoaded.get()
	if (!Loaded.includes(id)) popupLoaded.set([...Loaded, id])
}
