/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import {
	RocketOutlined,
	ReloadOutlined,
	SafetyCertificateOutlined
} from '@ant-design/icons'
//[ package ]

export const ICONS = {
	UpdatePanel: <RocketOutlined />,
	Reboot: <ReloadOutlined />,
	SecurityPanel: <SafetyCertificateOutlined />
}

export const LogColor = {
	增加: '#56c1bc',
	优化: '#b2c156',
	修复: '#c15656',
	重构: '#6056c1',
	调整: '#c17d56'
}
