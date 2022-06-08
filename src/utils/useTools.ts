/*
 * BTN Tools 工具库
 *
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import loadStatus from 'constants/loadStatus'
//[ constants ]

/**
 * 随机打乱数组
 * @param  Array
 * @return []
 */
export const Rand = (arr: any[]): any => {
	const result = []
	let arrI = arr
	for (let i = 0; i < arr.length; i++) {
		let ran = Math.floor(Math.random() * arrI.length),
			center = arrI[ran]
		result.push(arrI[ran])
		arrI[ran] = arrI[arrI.length - 1]
		arrI[arrI.length - 1] = center
		arrI = arrI.slice(0, arrI.length - 1)
	}
	return result
}

/**
 * 根据值获取对应状态显示
 */
export const getStatusDisplay = (value: number, updater: any): any => {
	const Len = loadStatus.length
	for (var i = 0; i < Len; i++) {
		if (value >= loadStatus[i].val) {
			updater(loadStatus[i])
			break
		} else {
			updater(loadStatus[3])
			break
		}
	}
}

/**
 * 字节转换
 * @param bytes 字节
 * @param is_unit 是否显示单位
 * @param fixed 小数点位置
 * @param end_unit 结束单位
 */
export const bytesToSize = (
	bytes: number,
	is_unit: boolean = true,
	fixed: number = 2,
	end_unit: string = ''
) => {
	const unit = [' B', ' KB', ' MB', ' GB', 'TB']
	const c = 1024
	for (let i = 0; i < unit.length; i++) {
		const cUnit = unit[i]

		if (cUnit.trim() == end_unit.trim()) {
			let val =
				i == 0 ? bytes : fixed == 0 ? bytes : (bytes.toFixed(fixed) as any)
			if (is_unit) return val + cUnit
			else {
				val = parseFloat(val)
				return val
			}
		} else if (bytes < c) {
			let val =
				i == 0 ? bytes : fixed == 0 ? bytes : (bytes.toFixed(fixed) as any)
			if (is_unit) return val + cUnit
			else {
				val = parseFloat(val)
				return val
			}
		}

		bytes /= c
	}
}

/**
 * 字符串日志转换数组
 * @param str 日志 ( string )
 * @returns any[]
 */
export const strLogsToArr = (str: string): any[] => {
	const Pretreatment = str
		.split(/^【(.{1,2})】(.*)<br>/gm)
		.filter((v: string) => v !== '')
		.map((v: string) => v.replace('<br>', ''))

	const LogsArr = []
	if (Pretreatment.length > 0) {
		let index = 0
		let next = false
		Pretreatment.forEach((v: string) => {
			if (v === '\n') index++
			else if (!next) {
				LogsArr[index] = { type: v }
				next = true
			} else {
				LogsArr[index].content = v
				next = false
			}
		})
	}
	return LogsArr
}

/**
 * 文本逐个清除
 * @param next 文本
 */
export const clearText = (next: string, setText: (text: string) => void) => {
	if ([...next].length > 0) {
		setText(next)
		setTimeout(() => clearText(next.slice(0, -1), setText), 10)
	} else setText('')
}
