/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
//[ package ]

import { ReactComponent as WinOS } from 'assets/svg/system_windows.svg'
import { ReactComponent as CentOS } from 'assets/svg/system_centos.svg'
import { ReactComponent as Ubuntu } from 'assets/svg/system_ubuntu.svg'
import { ReactComponent as Debian } from 'assets/svg/system_debian.svg'
import { ReactComponent as Fedora } from 'assets/svg/system_fedora.svg'
import { ReactComponent as Linux } from 'assets/svg/system_linux.svg'
//[ assets ]

export default {
	windows: <WinOS />,
	centos: <CentOS />,
	ubuntu: <Ubuntu />,
	debian: <Debian />,
	fedora: <Fedora />,
	linux: <Linux />
}
