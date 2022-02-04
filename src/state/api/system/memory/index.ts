/**
 * API parameter
 * 1. 在 initialState 中添加对应的 api callback json 参数
 * 2. state 中注册对应的 api callback json 参数类型
 * 3. 在 fetchUpdate 中注册对应 state 的 api 地址 及 参数索引
 */
import { ID } from 'state/api/linkId'

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
// { state name }: { state type }
export type state = {
	mem: object
}

//=> State 表初始化 | '是这个 state 的一些默认值'
// { state name }: { state default value }
export const initialState: state = {
	mem: {
		memTotal: 0,
		memFree: 0,
		memBuffers: 0,
		memCached: 0,
		memRealUsed: 0
	}
}

const { GetNetWork } = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	mem: [GetNetWork, ['mem']]
}
