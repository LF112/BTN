import React from 'react'
import {
	LayoutFilled,
	FundFilled,
	SecurityScanFilled,
	FolderFilled,
	SettingFilled
} from '@ant-design/icons'

import { ReactComponent as IconXterm } from 'assets/svg/sidebar_xterm.svg'
import { ReactComponent as IconFTP } from 'assets/svg/sidebar_ftp.svg'

export default [
	{
		text: '控制台',
		icon: <i className='el-icon-menu'></i>,
		path: '/'
	},
	{
		text: '站点',
		icon: <LayoutFilled />,
		path: '/site'
	},
	{
		text: '监控',
		icon: <FundFilled />,
		path: '/control'
	},
	{
		text: '防火墙',
		icon: <SecurityScanFilled />,
		path: '/firewall'
	},
	{
		text: '终端',
		icon: <IconXterm />,
		path: '/xterm'
	},
	{
		text: '文件',
		icon: <FolderFilled />,
		path: '/files'
	},
	{
		text: '数据库',
		icon: <i className='el-icon-s-help' style={{ fontSize: '18px' }}></i>,
		path: '/database'
	},
	{
		text: 'FTP',
		icon: <IconFTP />,
		path: '/ftp'
	},
	{
		text: '计划任务',
		icon: <i className='el-icon-s-order' style={{ fontSize: '18px' }}></i>,
		path: '/crontab'
	},
	{
		text: '软件商店',
		icon: <i className='el-icon-s-grid'></i>,
		path: '/soft'
	},
	{
		text: '设置',
		icon: <SettingFilled />,
		path: '/config'
	}
]
