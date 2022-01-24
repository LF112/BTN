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
