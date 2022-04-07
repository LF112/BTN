/**
 * API ID 索引表
 * { API ID }: { API URL }
 */

export const ID = {
	CONFIG: 'config?action=get_config',

	GetNetWork: 'system?action=GetNetWork',
	GetConcifInfo: 'system?action=GetConcifInfo',
	GetAllInfo: 'system?action=GetAllInfo',

	GetSoftList: 'plugin?action=get_soft_list',

	UpdatePanel: 'ajax?action=UpdatePanel',

	ReWeb: 'system?action=ReWeb',
	to_not_beta: 'ajax?action=to_not_beta',
	approve_beta: 'ajax?action=apple_beta'
}
//ReMemory:'/system?action=ReMemory' //清理内存
