/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { useCallback, useMemo } from 'react'
import { Atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import _ from 'lodash'
//[ package ]

import $fetch from 'utils/btFetch'
//[ utils ]

import { _connect } from 'store/btnconfig'

import * as config from './config'
import * as panel from './panel'
import * as security from './panel/security'
import * as system from './system'
import * as cpu from './system/cpu'
import * as memory from './system/memory'
import * as disk from './system/disk'
import * as network from './system/network'
import * as server from './system/server'
const _API = {
	config,
	panel,
	security,
	system,
	cpu,
	memory,
	disk,
	network,
	server
}
//[ store ]

//=> FUNCTIONS
export const $ = (Store: Atom, pureValue: boolean = false) =>
	pureValue ? Store.get() : useStore(Store)

export const useApiState = (aims: string): any =>
	useMemo(() => _API[aims], [_API])

export const useUpdateApi = (): ((queue: any) => void) => {
	const connect = _connect.get()

	return useCallback(
		(queue: any) => sendRequest(connect, FitRequestQueue(queue)),
		[]
	)
}

//=> 预处理
const apiUpdateIndexArr = {} // fetch 表
const urlMapping = {} // Url 映射表
const interceptorArr = {} // 数据拦截器表
Object.keys(_API).forEach((aimsApi: string) => {
	//=> 抽取 URL 索引
	const { stateApiUpdateIndex, Interceptor } = _API[aimsApi]

	//=> 遍历索引，拟合 URL 映射表
	Object.keys(stateApiUpdateIndex).forEach((key: string) => {
		const [URL, updateParamQuery] = stateApiUpdateIndex[key]

		apiUpdateIndexArr[`${aimsApi}.${key}`] = URL
		if (!urlMapping[URL]) urlMapping[URL] = [[updateParamQuery, aimsApi, key]]
		else urlMapping[URL].push([updateParamQuery, aimsApi, key])
	})

	//=> 遍历拦截器，拟合拦截器表
	if (Interceptor)
		Object.keys(Interceptor).forEach((key: string) => {
			const InterceptorName = `${aimsApi}.${key}`
			if (!interceptorArr.hasOwnProperty(InterceptorName))
				interceptorArr[InterceptorName] = Interceptor[key]
		})
})

/**
 * 拟合请求队列
 * @param queue 请求索引列表
 */
const FitRequestQueue = (queue: string[]): any[] => {
	const FitArr = []
	queue.forEach((aims: string) => {
		const QUERY = apiUpdateIndexArr[aims]
		if (QUERY) FitArr.push(QUERY)
		else console.log('API 索引错误:', aims)
	})
	return FitArr
}

/**
 * 发出请求 Fetch
 * @param connect 面板连接信息 | '从 state 传入'
 * @param dispatch state dispatch 方法
 * @param FitRequestQueue 请求索引队列
 */
const sendRequest = (connect: any, FitRequestQueue: any[]) => {
	FitRequestQueue.forEach(async (URL: string) => {
		const result = await $fetch(connect, URL)
		//=> 取出 Url 映射 store 表
		if (result)
			urlMapping[URL].forEach(([apiQuery, updaterName, updaterAims]) => {
				//=> UPDATE!
				const DATA = apiQuery === '' ? result : _.get(result, apiQuery)
				//=> 是否使用拦截器
				const InterceptorName = `${updaterName}.${updaterAims}`
				if (interceptorArr.hasOwnProperty(InterceptorName))
					interceptorArr[InterceptorName](DATA)
				else _API[updaterName][updaterAims].set(DATA)
			})
	})
}
