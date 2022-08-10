/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React, { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import fastdom from 'fastdom'
import { useStore } from '@nanostores/react'
//[ package ]

import { DefaultCard } from 'components/reusable/Card'
//[ Components ]

import {
	popupAims,
	popupTitle,
	popupShow,
	popupLoaded,
	updateShow,
	popupOpen,
	addLoaded
} from 'store/popupbox'
import { useAddPopup, closePopup } from 'store/popup'
//[ hooks ]

import { ICONS } from 'constants/popupBox_consts'
import SmallButton from 'components/reusable/Button/small'
//[ constants ]

//=> DOM
export default () => {
	const loadId = useStore(popupAims)
	const title = useStore(popupTitle)
	const show = useStore(popupShow)

	const addPopup = useAddPopup()

	const Loaded = useStore(popupLoaded)

	const [showDom, setShowDom] = useState<boolean>(false) //=> 显示弹窗动画
	const [popupId, setPopupId] = useState<string>(null) //=> Popup ID
	const node = useRef<HTMLDivElement>(null) as any

	//=> LazyLoad
	const _msgbox = new Object() // 暂存页面对象
	const msgboxModule = import.meta.glob('./**') //=> Vite 导入 MSGBOX 目录
	Object.keys(msgboxModule).forEach(key => {
		//=> 仅选择每个子目录下的 index.tsx
		const msgboxSplit = key.split('/')
		if (/index.tsx/gim.test(key) && msgboxSplit.length <= 3)
			_msgbox[msgboxSplit[1]] = React.lazy(msgboxModule[key] as any)
	})

	//=> MSGBOX COMPONENT | '弹窗组件懒加载容器'
	const MSGBOX = (name: string) => {
		const MsgboxComponent = _msgbox[name] // 取出页面
		return (
			<Suspense fallback={<></>}>
				<MsgboxComponent Close={Close} />
			</Suspense>
		)
	}

	useEffect(() => {
		const escKey = (e: KeyboardEvent) => {
			const key = e.key || e.keyCode
			if (key === 'Escape' || key === 'Esc' || key === 27) Close()
		}
		if (loadId) {
			//=> 显示载入状态弹窗
			if (!Loaded.includes(loadId))
				setPopupId(addPopup('正在加载中...', 'load', -1) as string)
			//=> 绑定 ESC 关闭弹窗快捷键
			document.addEventListener('keydown', escKey)
		}
		return () => document.removeEventListener('keydown', escKey)
	}, [loadId])

	useEffect(() => {
		if (show) {
			//=> 移除载入状态弹窗
			if (!Loaded.includes(loadId)) closePopup(popupId)
			addLoaded(loadId)
			setTimeout(() => {
				fastdom.measure(() => {
					const DOM = node.current
					const DOMHeight = DOM.offsetHeight
					fastdom.mutate(() => {
						DOM.style.height = '0'
						setShowDom(true)
						setTimeout(() => {
							DOM.style.height = `${DOMHeight}px`
							DOM.style.opacity = '1'
						}, 16)
					})
				})
			}, 110)
		}
	}, [show])

	//=> 关闭弹窗
	const Close = () => {
		fastdom.measure(() => {
			const DOM = node.current
			if (DOM) {
				fastdom.mutate(() => {
					DOM.style.height = '0'
					setTimeout(() => setShowDom(false), 250)
					setTimeout(() => {
						DOM.removeAttribute('style')
						popupOpen(null, '')
						updateShow(false)
					}, 500)
				})
			}
		})
	}

	return (
		<Main
			style={{
				display: show ? 'flex' : 'none',
				opacity: showDom ? 1 : 0,
				pointerEvents: showDom ? 'auto' : 'none'
			}}>
			<CloseMask onClick={Close} />
			<Container ref={node}>
				<Header>
					<Title>
						{ICONS.hasOwnProperty(loadId) ? ICONS[loadId] : <></>}
						<h1>{title}</h1>
					</Title>
					<SmallButton onClick={Close} icon={<i className='el-icon-close' />} />
				</Header>
				{useMemo(() => {
					return loadId ? MSGBOX(loadId) : <></>
				}, [loadId])}
			</Container>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: absolute;
	width: 100%;
	height: 100%;
	right: 0;
	top: 0;
	z-index: 20;
	align-items: center;
	justify-content: center;
`

const Container = styled(DefaultCard)`
	opacity: 0;
	width: auto;
	height: unset;
	min-width: auto;
	padding: 0;
	background: #21252b;
	z-index: 10;
	overflow: hidden;
`

const CloseMask = styled.div`
	position: absolute;
	z-index: 0;
	width: 100%;
	height: 100%;
	border-radius: 8px 8px 0 0;
	backdrop-filter: blur(2px);
	background: linear-gradient(18deg, rgb(8 20 53 / 25%), rgb(32 33 34 / 90%)),
		linear-gradient(333deg, rgba(39, 52, 64, 0.3), rgba(180, 255, 217, 0.08)),
		radial-gradient(
			circle at 77% 89%,
			rgb(57 61 64 / 80%),
			rgba(125, 163, 169, 0) 50%
		),
		radial-gradient(
			circle at 15% 95%,
			rgb(25 31 38 / 80%),
			rgba(125, 163, 169, 0) 43%
		),
		radial-gradient(
			circle at 65% 23%,
			rgb(119 151 139 / 40%),
			rgba(137, 151, 119, 0) 70%
		),
		radial-gradient(
			circle at 10% 0,
			rgba(187, 211, 204, 0.33),
			rgba(187, 211, 204, 0) 35%
		),
		radial-gradient(
			circle at 11% 100%,
			rgb(131 166 203 / 30%),
			rgba(131, 165, 203, 0) 30%
		);
`

const Header = styled.header`
	height: 42px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 8px 12px;
`

const Title = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	user-select: none;
	> h1 {
		font-family: 'HarmonyOS';
		line-height: 1;
		font-weight: lighter;
		font-size: 16px;
		color: #fff;
	}
	> svg,
	span,
	i {
		width: 16px;
		height: 16px;
		font-size: 16px;
		color: #fff;
		margin-right: 5px;
		> path {
			fill: #fff;
		}
	}
`

const CloseButton = styled.button`
	width: 20px;
	height: 20px;
	padding: 3px;
	border-radius: 5px;
	background: #2f353d;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	> i {
		color: #c5c5c5;
		font-size: 16px;
		line-height: 1;
	}
	&:hover {
		transform: scale(0.96);
		background: #2a2f36;
	}
`
