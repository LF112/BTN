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
