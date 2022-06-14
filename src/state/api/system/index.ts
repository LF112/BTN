/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
/**
 * API parameter
 * 1. 在 initialState 中添加对应的 api callback json 参数
 * 2. state 中注册对应的 api callback json 参数类型
 * 3. 在 fetchUpdate 中注册对应 state 的 api 地址 及 参数索引
 */
import { ID } from 'state/api/linkId'

//=> State 默认类型表 | '由于用了 typescript，所以这里的类型表根据下面的决定'
// { state name }: { state type }
export type state = {
	os: string
	osVersion: string
	osArch: string
	pythonVersion: string
	systemdate: string
	distribution: string
	disk: [
		{
			filesystem: string
			type: string
			path: string
			size: string[]
			inodes: string[]
		}
	]
	iostat: {
		[propName: string]: {
			read_bytes: number
			read_count: number
			read_merged_count: number
			read_time: number
			write_bytes: number
			write_count: number
			write_merged_count: number
			write_time: number
		}
	}
	network: object
	up: number
	down: number
	downTotal: number
	upTotal: number
	load: {
		one: number
		five: number
		fifteen: number
		max: number
		limit: number
		safe: number
	}
	webserver: string
}

//=> State 表初始化 | '是这个 state 的一些默认值'
// { state name }: { state default value }
export const initialState: state = {
	os: '-',
	osVersion: '-',
	osArch: '-',
	pythonVersion: '-',
	systemdate: '-',
	distribution: '-',
	disk: [
		{
			filesystem: '-',
			type: '-',
			path: '-',
			size: ['-', '-', '-', '-'],
			inodes: ['-', '-', '-', '-']
		}
	],
	iostat: {
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
	},
	network: {},
	up: 0,
	down: 0,
	downTotal: 0,
	upTotal: 0,
	load: {
		one: 0,
		five: 0,
		fifteen: 0,
		max: 0,
		limit: 0,
		safe: 0
	},
	webserver: 'nginx'
}

const { CONFIG, GetConcifInfo, GetNetWork, GetSystemInfo } = ID
/**
 * API 更新索引表
 * { state name }: [{ ↑ API ID }, [...{ API Callback JSON }]]
 *   STATA 名字       API ID (url)    参数对应的 API JSON 索引
 */
export const stateApiUpdateIndex: any = {
	disk: [GetNetWork, 'disk'],
	iostat: [GetNetWork, 'iostat'],
	os: [GetSystemInfo, 'data.core'],
	osVersion: [GetSystemInfo, 'data.version'],
	osArch: [GetSystemInfo, 'data.architecture'],
	pythonVersion: [GetSystemInfo, 'data.py'],
	systemdate: [GetConcifInfo, 'systemdate'],
	webserver: [GetConcifInfo, 'webserver'],
	distribution: [CONFIG, 'distribution'],
	network: [GetNetWork, 'network'],
	up: [GetNetWork, 'up'],
	down: [GetNetWork, 'down'],
	downTotal: [GetNetWork, 'downTotal'],
	upTotal: [GetNetWork, 'upTotal'],
	load: [GetNetWork, 'load']
}
