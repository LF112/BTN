/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { atom } from 'nanostores'
//[ package ]

import { ID } from 'state2/api/linkId'
//[ API ID ]

//=> STORES
export const disk = atom<any[]>([]) // 磁盘列表
export const iostat = atom<object>({
	ALL: {
		read_bytes: 0,
		read_count: 0,
		read_merged_count: 0,
		read_time: 0,
		write_bytes: 0,
		write_count: 0,
		write_merged_count: 0,
		write_time: 0
	}
}) // 磁盘 IO

//=> INDEX
const { _NetWork } = ID
export const stateApiUpdateIndex: any = {
	disk: [_NetWork, 'disk'],
	iostat: [_NetWork, 'iostat']
}
