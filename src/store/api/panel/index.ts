/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

import { ID } from 'store/api/linkId'
//[ API ID ]

//=> STORES
export const serverIP = atom<string>('-.-.-.-') // 服务器 IP
export const panelName = atom<string>('-') // 面板站点名
export const panelVersion = atom<string>('-') // 面板版本号
export const panelPort = atom<string>('-') // 面板 WEB 服务监听端口号
export const panelSecurePath = atom<string>('-') // 面板 WEB 服务安全入口路径
export const panelSecureDomain = atom<string>('-') // 面板 WEB 服务绑定域名
export const panelLimitIP = atom<string>('-') // 面板 WEB 服务入口访问限制 IP
export const panelRunTime = atom<string>('-') // 面板持续运行时间
export const panelLocalMode = atom<boolean>(false) // 面板本地模式
export const panelDevMode = atom<boolean>(false) // 面板开发者模式
export const panelPro = atom<number>(-2) // 面板专业版 | -2 为未知 | '-1 = False / +∞ = 专业版余剩时间'
export const panelLtd = atom<number>(-2) // 面板企业版 | -2 为未知 | '-1 = False / +∞ = 企业版余剩时间'
export const panelBeta = atom<number>(-2) // 面板测试版 | -2 为未知 | '0 = False / 1 = True'
export const panelIsNew = atom<boolean>(false) // 面板是否是新版本
export const panelBetaVersion = atom<string>('-') // 面板测试版本号
export const panelNewVersion = atom<string>('-') // 面板正式版版本号
export const panelBetaVersionLogs = atom<string>('') // 面板测试版本日志
export const panelNewVersionLogs = atom<string>('') // 面板正式版本日志
export const panelBetaVersionUptime = atom<string>('-') // 面板测试版本更新时间
export const panelNewVersionUptime = atom<string>('-') // 面板正式版本更新时间

//=> INDEX
const {
	CONFIG,
	_NetWork,
	_SoftList,
	_PanelUpdate,
	_PanelLocal,
	_DevMode,
	_ServerLocalIP
} = ID
export const stateApiUpdateIndex: any = {
	serverIP: [_ServerLocalIP, 'data'],
	panelName: [_NetWork, 'title'],
	panelVersion: [_NetWork, 'version'],
	panelPort: [CONFIG, 'panel.port'],
	panelSecurePath: [CONFIG, 'panel.admin_path'],
	panelSecureDomain: [CONFIG, 'panel.domain'],
	panelLimitIP: [CONFIG, 'panel.limitip'],
	panelRunTime: [_NetWork, 'time'],
	panelLocalMode: [_PanelLocal, 'msg'],
	panelDevMode: [_DevMode, 'msg'],
	panelPro: [_SoftList, 'pro'],
	panelLtd: [_SoftList, 'ltd'],
	panelBeta: [_PanelUpdate, 'msg.is_beta'],
	panelIsNew: [_PanelUpdate, 'status'],
	panelBetaVersion: [_PanelUpdate, 'msg.beta.version'],
	panelNewVersion: [_PanelUpdate, 'msg.version'],
	panelBetaVersionLogs: [_PanelUpdate, 'msg.beta.updateMsg'],
	panelNewVersionLogs: [_PanelUpdate, 'msg.updateMsg'],
	panelBetaVersionUptime: [_PanelUpdate, 'msg.beta.uptime'],
	panelNewVersionUptime: [_PanelUpdate, 'msg.uptime']
}
