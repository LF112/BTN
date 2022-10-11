/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import {
	LayoutFilled,
	FundFilled,
	SecurityScanFilled,
	FolderFilled,
	SettingFilled
} from '@ant-design/icons'
//[ package ]

import { ReactComponent as IconXterm } from 'assets/svg/sidebar_xterm.svg'
import { ReactComponent as IconFTP } from 'assets/svg/sidebar_ftp.svg'
//[ assets ]

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
