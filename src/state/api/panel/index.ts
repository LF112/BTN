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
	name: string //           面板版本名
	serverIP: string //       服务器 IP
	version: string //        面板版本号
	port: string //           面板端口
	secPath: string //        面板安全入口
	secDomain: string //      面板安全域名
	limitIP: string //        面板入口限制 IP
	Pro: number //            专业版
	Ltd: number //            企业版
	Beta: number //           测试版
	time: string //           持续运行时间
	isNew: boolean //         是否新版本
	betaVersionId: string //  测试版版本号
	VersionId: string //      正式版版本号
	betaVersionLogs: string //测试版更新日志
	VersionLogs: string //    正式版更新日志
	betaUptime: string //     测试版更新时间
	Uptime: string //         正式版更新时间
}

//=> State 表初始化 | '是这个 state 的一些默认值'
// { state name }: { state default value }
export const initialState: state = {
	name: '-',
	serverIP: '-.-.-.-',
	version: '-.-.-',
	port: '-',
	secPath: '-',
	secDomain: '-',
	limitIP: '-',
	Pro: -2, // -2 为未知 | '-1 = False / +∞ = 专业版余剩时间'
	Ltd: -2, // -2 为未知 | '-1 = False / +∞ = 企业版余剩时间'
	Beta: -2, // -2 为未知 | '0 = False / 1 = True'
	time: '-',
	isNew: false,
	betaVersionId: '-',
	VersionId: '-',
	betaVersionLogs: '',
	VersionLogs: '',
	betaUptime: '-',
	Uptime: '-'
}

const { CONFIG, GetNetWork, GetSoftList, UpdatePanel } = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	name: [GetNetWork, 'title'],
	serverIP: [GetSoftList, 'ip'],
	version: [GetNetWork, 'version'],
	port: [CONFIG, 'panel.port'],
	secPath: [CONFIG, 'panel.admin_path'],
	secDomain: [CONFIG, 'panel.domain'],
	limitIP: [CONFIG, 'panel.limitip'],
	Pro: [GetSoftList, 'pro'],
	Ltd: [GetSoftList, 'ltd'],
	Beta: [UpdatePanel, 'msg.is_beta'],
	time: [GetNetWork, 'time'],
	isNew: [UpdatePanel, 'status'],
	betaVersionId: [UpdatePanel, 'msg.beta.version'],
	VersionId: [UpdatePanel, 'msg.version'],
	betaVersionLogs: [UpdatePanel, 'msg.beta.updateMsg'],
	VersionLogs: [UpdatePanel, 'msg.updateMsg'],
	betaUptime: [UpdatePanel, 'msg.beta.uptime'],
	Uptime: [UpdatePanel, 'msg.uptime']
}
