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
