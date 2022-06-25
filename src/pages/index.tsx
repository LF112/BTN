/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { Suspense, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
//[ package ]

//=> DOM
export default () => {
	//=> LazyLoad
	const _page = new Object() // 暂存页面对象
	const pageModule = import.meta.glob('./**') //=> Vite 导入 PAGE 目录
	Object.keys(pageModule).forEach(key => {
		//=> 仅选择每个子目录下的 index.tsx
		const pageSplit = key.split('/')
		if (/index.tsx/gim.test(key) && pageSplit.length <= 3)
			_page[pageSplit[1]] = React.lazy(pageModule[key] as any)
	})

	//=> PAGE COMPONENT | '页面组件懒加载容器'
	const PAGE = (name: string) => {
		const PageComponent = _page[name] // 取出页面
		return (
			<Suspense fallback={<></>}>
				<PageComponent />
			</Suspense>
		)
	}

	//=> 更改默认路径为 /#/ | '仅 location key 为默认时'
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		const { key, pathname } = location
		if (key === 'default' && pathname === '/') navigate('/')
	}, [location.key])

	return (
		<Routes>
			<Route path={`/`} element={PAGE('Console')} />
			<Route path={`/site`} element={PAGE('Site')} />
			<Route path={`/control`} element={PAGE('Control')} />
			<Route path={`/firewall`} element={PAGE('Firewall')} />
			<Route path={`/xterm`} element={PAGE('Xterm')} />
			<Route path={`/files`} element={PAGE('Files')} />
			<Route path={`/database`} element={PAGE('Database')} />
			<Route path={`/ftp`} element={PAGE('Ftp')} />
			<Route path={`/crontab`} element={PAGE('Crontab')} />
			<Route path={`/soft`} element={PAGE('Soft')} />
			<Route path={`/config`} element={PAGE('Config')} />
		</Routes>
	)
}
