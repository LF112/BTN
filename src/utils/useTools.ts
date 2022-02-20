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
 * 索引对象
 * @param obj 对象
 * @param indexArr 索引数组
 * @returns 值
 */
export const queueObj = (
	obj: Object,
	queue: string[],
	count = 1,
	endCount = 0
) => {
	const Len = queue.length
	if (Len > 0)
		if (count === 1)
			if (Len === 1) return obj[queue[0]]
			else return queueObj(obj[queue[0]], queue, count + 1, Len)
		else {
			queue.shift()
			if (count === endCount) return obj[queue[0]]
			else return queueObj(obj[queue[0]], queue, count + 1, endCount)
		}
}
