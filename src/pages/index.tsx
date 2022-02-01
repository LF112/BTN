import React, { Suspense, useEffect } from 'react'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
//[ package ]

import Loader from 'components/reusable/Loading/HalfFilled'
//[ Components ]

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
			<Suspense
				fallback={
					<LoadMaskMain>
						<Loader speed={1.2} lineSpeed={1.4} width={4} size={50} />
					</LoadMaskMain>
				}>
				<PageComponent />
			</Suspense>
		)
	}

	//=> 更改默认路径为 /#/ | '仅 location key 为默认时'
	const navigate = useNavigate()
	const location = useLocation()
	useEffect(() => {
		const { key } = location
		if (key === 'default') navigate('/')
	}, [location.key])

	return (
		<Routes>
			<Route path={`/`} element={PAGE('Console')} />
		</Routes>
	)
}

const LoadMaskMain = styled.div`
	width: 100%;
	height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
`
