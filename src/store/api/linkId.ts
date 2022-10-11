/*
 * API ID 索引表
 * { API ID }: { API URL }
 *
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */

export const ID = {
	WhoAmI: 'plugin?name=btnext&action=a&s=whoami', // 从 BTN BT-Panel Plugin 中获取 API 状态

	_OverTime: 'plugin?name=btnext&action=a&s=getOverTime', // 获取面板登录状态过期时间
	SetOverTime: 'plugin?name=btnext&action=a&s=setOverTime', // 设置面板登录状态过期时间
	SetPanelTitle: 'plugin?name=btnext&action=a&s=setPanelTitle', // 设置面板标题
	_PanelLocal: 'plugin?name=btnext&action=a&s=getPanelLocal', // 获取面板离线模式状态
	_DevMode: 'plugin?name=btnext&action=a&s=getPanelDevMode', // 获取面板开发者模式状态
	SetServerLocalIP: 'plugin?name=btnext&action=a&s=setServerIP', // 设置面板服务器 IP
	_ServerLocalIP: 'plugin?name=btnext&action=a&s=getPanelServerIP', // 获取面板服务器离线模式状态
	_SystemInfo: 'plugin?name=btnext&action=a&s=getSystemInfo', // 获取系统信息

	CONFIG: 'config?action=get_config', // 获取面板配置
	_IPv6Status: 'config?action=get_ipv6_listen', // 获取 IPv6 监听状态
	ClosePanel: 'config?action=ClosePanel', // 关闭面板
	ListenIPv6: 'config?action=set_ipv6_status', // 监听 IPv6
	SetLocal: 'config?action=set_local', // 设置离线模式
	SetDevMode: 'config?action=set_debug', // 设置开发者模式
	SetPanel: 'config?action=setPanel', // 设置面板信息

	_NetWork: 'system?action=GetNetWork', // 获取面板动态数据 [ 网络/磁盘/内存/CPU/... ]
	_ConfigInfo: 'system?action=GetConcifInfo', // 获取面板配置
	GetAllInfo: 'system?action=GetAllInfo', // 获取所有资料
	RepairPanel: 'system?action=RepPanel', // 修复面板
	ReMemory: 'system?action=ReMemory', // 清理系统内存
	ServiceAdmin: 'system?action=ServiceAdmin', // 服务管理
	RestartServer: 'system?action=RestartServer', // 重启服务器
	ReWeb: 'system?action=ReWeb', // 重启面板 WEB 服务

	_SoftList: 'plugin?action=get_soft_list', // 获取插件列表

	_PanelUpdate: 'ajax?action=UpdatePanel', // 获取面板更新
	to_not_beta: 'ajax?action=to_not_beta', // 切换至正式版 [ 需要 check ]
	approve_beta: 'ajax?action=apple_beta', // 切换至测试版 ( 申请 ) [ 需要 check ]
	_WarningList: 'warning?action=get_list', // 获取安全警告列表
	SetWaringIgnore: 'warning?action=set_ignore', // 安全警告条目忽略处理
	ReCheckWaring: 'warning?action=check_find' // 重新检测指定安全条目
}
