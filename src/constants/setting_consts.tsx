import React from 'react'
import {
	ControlOutlined,
	SafetyOutlined,
	RobotOutlined,
	MessageOutlined
} from '@ant-design/icons'

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
