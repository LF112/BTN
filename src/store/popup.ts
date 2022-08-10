/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { useCallback } from 'react'
import { atom } from 'nanostores'
//[ package ]

//=> STORE
export const popups = atom<any[]>([])
export const closeList = atom<string>('')

//=> FUNCTIONS
//=> 存储 choose popup CALLBACK 方法
const chooseFn: {
	[key: string]: (close: () => void, choose?: boolean) => void
} = {}
/**
 * 添加 popup
 * @example
 * //=> 弹出普通类型的 popup
 * addPopup('{ content }', '{ success, error, warning, info }')
 * //=> 弹出选择型 popup
 * addPopup('{ content }', 'choose', (close: () => void, choose: boolean) => { ... })
 * @param content popup 内容
 * @param type popup 类型 { success, error, warning, info, choose }
 * @param callback  choose popup 用户选择时回调
 * @param icon popup 图标
 * @returns {Function}
 */
export const useAddPopup = (): ((
	content: string,
	type: string,
	callback: any,
	icon?: any
) => void | string) => {
	return useCallback(
		(content: string, type: string, callback: any, icon: any) => {
			const popupObj = {
				close: false
			} as any
			const callbackType = typeof callback
			const CBID = Math.random().toString(36).slice(-8)
			if (callback === -1) {
				popupObj.id = CBID
				popupObj.type = type
				popupObj.content = content
			} else if (callbackType === 'function') {
				//=> 仅支持选择回调
				chooseFn[CBID] = callback

				popupObj.id = CBID
				popupObj.type = type
				popupObj.content = content
			} else if (callbackType === 'number') {
				//=> 仅支持时长
				const timeout = callback

				popupObj.id = CBID
				popupObj.type = type
				popupObj.content = content
				popupObj.timeout = timeout
			} else {
				//=> 仅支持图标 / 显示时长
				const mIcon = callback
				const timeout = icon

				popupObj.id = CBID
				popupObj.type = type
				popupObj.content = content
				popupObj.timeout = timeout
				popupObj.icon = mIcon
			}
			popups.set([...popups.get(), popupObj])
			return CBID
		},
		[]
	)
}

/**
 * 触发选择型 popup 对应的回调
 * @param id popup id
 * @param choose popup 用户选择
 * @param close popup item 传入的关闭方法
 * @returns {Function}
 */
export const useTriggerChoose = (): ((
	id: string,
	choose: boolean,
	close: () => void
) => void) => {
	return useCallback((id: string, choose: boolean, close: () => void) => {
		if (chooseFn[id] !== undefined) {
			//=> 触发
			chooseFn[id](close, choose)
			delete chooseFn[id]
		} else close() // 此处应弹出异常
	}, [])
}

/**
 * 带动画关闭弹窗
 * @param id popup id
 * @returns void
 */
export const closePopup = (id: string) =>
	closeList.set(`${closeList.get()}.${id}`)

/**
 * 移除弹窗
 * @param id popup id
 * @returns void
 */
export const removePopup = (id: string) => {
	const PopupsArr = popups.get()
	PopupsArr.splice(
		PopupsArr.findIndex(item => item.id === id),
		1
	)
	popups.set(PopupsArr)
}
