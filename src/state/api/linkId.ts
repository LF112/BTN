/**
 * API ID 索引表
 * { API ID }: { API URL }
 */

export const ID = {
	CONFIG: 'config?action=get_config', // 获取面板配置
	GetIPv6Status: 'config?action=get_ipv6_listen', // 获取 IPv6 监听状态

	GetNetWork: 'system?action=GetNetWork', // 获取面板动态数据 [ 网络/磁盘/内存/CPU/... ]
	GetConcifInfo: 'system?action=GetConcifInfo', // 获取面板配置

	GetAllInfo: 'system?action=GetAllInfo', // 获取所有资料

	GetSoftList: 'plugin?action=get_soft_list', // 获取插件列表

	UpdatePanel: 'ajax?action=UpdatePanel', // 获取面板更新

	ReWeb: 'system?action=ReWeb', // 重启面板 WEB 服务
	to_not_beta: 'ajax?action=to_not_beta', // 切换至正式版 [ 需要 check ]
	approve_beta: 'ajax?action=apple_beta', // 切换至测试版 ( 申请 ) [ 需要 check ]
	RepairPanel: 'system?action=RepPanel', // 修复面板
	ReMemory: 'system?action=ReMemory', // 清理系统内存
	ServiceAdmin: 'system?action=ServiceAdmin', // 服务管理
	RestartServer: 'system?action=RestartServer', // 重启服务器
	ClosePanel: 'config?action=ClosePanel', // 关闭面板
	ListenIPv6: 'config?action=set_ipv6_status' // 监听 IPv6
}
