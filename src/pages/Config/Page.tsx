import React, { Suspense } from 'react'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
//[ package ]

import Loader from 'components/reusable/Loading/HalfFilled'
//[ Components ]

//=> DOM
export default (props: any) => {
	const { page } = props

	//=> LazyLoad
	const _page = new Object() // 暂存页面对象
	const pageModule = import.meta.glob('./settingPage/*') //=> Vite 导入其他设置页面
	Object.keys(pageModule).forEach(key => {
		const [, , fileName] = key.split('/')
		_page[fileName.replace('.tsx', '')] = React.lazy(pageModule[key] as any)
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

	return page && _page.hasOwnProperty(page) ? PAGE(page) : null
}

//=> Style
const LoadMaskMain = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`
