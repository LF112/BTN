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
	name: string //     面板版本名
	serverIP: string // 服务器 IP
	version: string //  面板版本号
	port: string //     面板端口
	secPath: string //  面板安全入口
	secDomain: string //面板安全域名
	limitIP: string //  面板入口限制 IP
}

//=> State 表初始化 | '是这个 state 的一些默认值'
// { state name }: { state default value }
export const initialState: state = {
	name: '-',
	serverIP: '-',
	version: '-',
	port: '-',
	secPath: '-',
	secDomain: '-',
	limitIP: '-'
}

const { CONFIG, GetNetWork } = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	name: [GetNetWork, ['title']],
	serverIP: [CONFIG, ['panel', 'address']],
	version: [GetNetWork, ['version']],
	port: [CONFIG, ['panel', 'port']],
	secPath: [CONFIG, ['panel', 'admin_path']],
	secDomain: [CONFIG, ['panel', 'domain']],
	limitIP: [CONFIG, ['panel', 'limitip']]
}
