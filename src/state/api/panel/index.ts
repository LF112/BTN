/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
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
	Local: boolean //         面板离线模式
	DevMode: boolean //       面板开发模式
	LocalIP: string //        服务器本地 IP
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
	Uptime: '-',
	Local: false,
	DevMode: false,
	LocalIP: '-'
}

const {
	CONFIG,
	GetNetWork,
	GetSoftList,
	UpdatePanel,
	GetPanelLocal,
	GetDevMode,
	GetServerLocalIP
} = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	name: [GetNetWork, 'title'],
	serverIP: [GetServerLocalIP, 'data'],
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
	Uptime: [UpdatePanel, 'msg.uptime'],
	Local: [GetPanelLocal, 'msg'],
	DevMode: [GetDevMode, 'msg']
}
