/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import {
	ControlOutlined,
	SafetyOutlined,
	RobotOutlined,
	MessageOutlined
} from '@ant-design/icons'
//[ package ]

export const settingChooseList = [
	{
		name: '面板设置',
		path: 'panel',
		icon: <ControlOutlined />
	},
	{
		name: '安全设置',
		path: 'security',
		icon: <SafetyOutlined />
	},
	{
		name: '临时访问',
		path: 'temporaryAccess',
		icon: <RobotOutlined />
	},
	{
		name: '通知渠道',
		path: 'notificationChannel',
		icon: <MessageOutlined />
	}
]
