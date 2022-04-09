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
	os: string
	systemdate: string
	distribution: string
	disk: [
		{
			filesystem: string
			type: string
			path: string
			size: string[]
			inodes: string[]
		}
	]
	iostat: {
		[propName: string]: {
			read_bytes: number
			read_count: number
			read_merged_count: number
			read_time: number
			write_bytes: number
			write_count: number
			write_merged_count: number
			write_time: number
		}
	}
	network: object
	up: number
	down: number
	downTotal: number
	upTotal: number
	load: {
		one: number
		five: number
		fifteen: number
		max: number
		limit: number
		safe: number
	}
	webserver: string
}

//=> State 表初始化 | '是这个 state 的一些默认值'
// { state name }: { state default value }
export const initialState: state = {
	os: '-',
	systemdate: '-',
	distribution: '-',
	disk: [
		{
			filesystem: '-',
			type: '-',
			path: '-',
			size: ['-', '-', '-', '-'],
			inodes: ['-', '-', '-', '-']
		}
	],
	iostat: {
		ALL: {
			read_bytes: 0,
			read_count: 0,
			read_merged_count: 0,
			read_time: 0,
			write_bytes: 0,
			write_count: 0,
			write_merged_count: 0,
			write_time: 0
		}
	},
	network: {},
	up: 0,
	down: 0,
	downTotal: 0,
	upTotal: 0,
	load: {
		one: 0,
		five: 0,
		fifteen: 0,
		max: 0,
		limit: 0,
		safe: 0
	},
	webserver: 'nginx'
}

const { CONFIG, GetConcifInfo, GetNetWork } = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	disk: [GetNetWork, 'disk'],
	iostat: [GetNetWork, 'iostat'],
	os: [GetNetWork, 'system'],
	systemdate: [GetConcifInfo, 'systemdate'],
	webserver: [GetConcifInfo, 'webserver'],
	distribution: [CONFIG, 'distribution'],
	network: [GetNetWork, 'network'],
	up: [GetNetWork, 'up'],
	down: [GetNetWork, 'down'],
	downTotal: [GetNetWork, 'downTotal'],
	upTotal: [GetNetWork, 'upTotal'],
	load: [GetNetWork, 'load']
}
