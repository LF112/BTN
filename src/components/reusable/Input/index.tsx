import React, { useEffect, useState, useRef, useCallback } from 'react'
import styled from 'styled-components'
import {
	CloseCircleOutlined,
	CheckOutlined,
	LoadingOutlined
} from '@ant-design/icons'
import _ from 'lodash'
//[ package ]

import SmallButton from 'components/reusable/Button/small'
//[ components ]

import { clearText } from 'utils/useTools'
//[ utils ]

//=> DOM
export default () => {
	const node = useRef<HTMLElement>(null) as any

	const [text, setText] = useState<string>('')
	const [textLength, setTextLength] = useState<number>(0)
	const [cleanIcon, showCleanIcon] = useState<boolean>(true)
	const [focus, setFocus] = useState<boolean>(false)
	const [typing, setTyping] = useState<boolean>(false)
	const [update, setUpdate] = useState<boolean>(false)
	const [updated, setUpdated] = useState<boolean>(false)
	const [showSuccess, setShowSuccess] = useState<boolean>(false)
	const [typingLock, setTypingLock] = useState<boolean>(false)

	useEffect(() => {
		const textLen = [...text].length
		showCleanIcon(textLen > 0)
		setTextLength(textLen)
		if (textLen === 0) {
			setTyping(false)
			setUpdate(false)
		}
	}, [text])

	const StopTyping = useCallback(
		_.debounce(() => {
			setUpdate(true)
		}, 1000),
		[]
	)

	useEffect(() => {
		if (update)
			if (textLength === 0)
				//=> 防止上传前输入框被清空 | '基于防抖函数问题，无法在函数内直接阻止状态改变，此方法有概率不生效'
				setUpdate(false)
			else {
				setTimeout(() => {
					isUpdated()
				}, 500)
			}
	}, [update])

	//=> 解决中文输入
	const handleComposition = (event: any) => {
		if (event.type === 'compositionupdate' || event.type === 'compositionstart')
			setTypingLock(true)
		if (event.type === 'compositionend') {
			setTypingLock(false)
			StopTyping()
		}
	}

	const isUpdated = () => {
		setUpdate(false)
		setTyping(false)
		setUpdated(true)
		setTimeout(() => setShowSuccess(true), 150)
		setTimeout(() => {
			setShowSuccess(false)
			setTimeout(() => {
				setUpdated(false)
			}, 500)
		}, 850)
	}

	return (
		<Main updated={updated}>
			<input
				ref={node}
				value={text}
				onChange={el => {
					setText(el.target.value)
					if (focus && !typing) setTyping(true)
					if (!typingLock) StopTyping()
				}}
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				onCompositionStart={handleComposition}
				onCompositionEnd={handleComposition}
				onCompositionUpdate={handleComposition}
				disabled={update}
			/>
			<CheckOutMask show={showSuccess}>
				<CheckOutlined />
			</CheckOutMask>
			<InputPrompt hide={focus || update}>
				<nav
					style={
						typing && !update
							? {
									animation: 'Flickering 1s infinite alternate'
							  }
							: { opacity: focus && !update ? 1 : 0 }
					}
				/>
				<LoadingOutlined style={{ opacity: update ? 1 : 0 }} />
			</InputPrompt>
			<SmallButton
				style={
					cleanIcon && !update
						? { opacity: 1, pointerEvent: 'pointer', cursor: 'pointer' }
						: { opacity: 0, pointerEvent: 'none', cursor: 'text' }
				}
				icon={<CloseCircleOutlined />}
				onClick={() => {
					//=> 上传时禁止使用清空按钮
					if (!update) {
						//=> 保持输入框焦点
						if (node?.current) node.current.focus()
						clearText(text, setText)
					}
				}}
			/>
		</Main>
	)
}

//=> Style
const Main = styled.main<{ updated: boolean }>`
	position: relative;
	width: 258px;
	height: 40px;
	border-radius: 5px;
	background: #323842;
	box-shadow: 0 1px 3px rgba(26, 26, 26, 45%);
	border: 2px solid rgb(68 75 88);
	display: flex;
	align-items: center;
	overflow: hidden;
	> input {
		position: relative;
		width: 100%;
		height: 100%;
		margin-bottom: ${({ updated }) => (updated ? '-55px' : '0')};
		outline: none;
		padding: 0;
		font-weight: 500;
		font-size: 14px;
		line-height: 25px;
		text-overflow: ellipsis;
		font-family: 'HarmonyOS';
		color: #abb2bf;
		caret-color: #528bff;
		padding: 0 30px;
		z-index: 10;
	}
	> button {
		position: absolute;
		right: 5px;
		z-index: 10;
	}
`

const InputPrompt = styled.div<{ hide: boolean }>`
	position: absolute;
	left: ${(props: any) => (props.hide ? '5px' : '-16px')};
	width: 20px;
	height: ${(props: any) => (props.hide ? '15px' : '25px')};
	background: #444b58;
	border-radius: ${(props: any) => (props.hide ? '4px' : '2px')};
	display: flex;
	align-items: center;
	justify-content: center;
	> nav {
		width: 8px;
		height: 5px;
		background: #646c7b;
		border-radius: 2px;
	}
	> span {
		position: absolute;
		color: #646c7b;
	}
	@keyframes Flickering {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
`

const CheckOutMask = styled.div<{ show: boolean }>`
	position: absolute;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 100;
	pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
	opacity: ${({ show }) => (show ? 1 : 0)};
	> span {
		color: #36d7ae;
		font-size: 16px;
	}
`

//TODO: 改善输入光标体验
// const MouseCursor = styled.div`
// 	position: absolute;
// 	top: 0;
// 	height: 100%;
// 	width: 100%;
// 	z-index: 0;
// 	display: flex;
// 	align-items: center;
// 	padding: 0 8px;
// 	> div {
// 		position: relative;
// 		width: 2px;
// 		height: 19px;
// 		top: 0;
// 		left: 0;
// 		background-color: #528bff;
// 		border-color: #528bff;
// 		border-radius: 5px;
// 		animation: Flickering 1s infinite forwards;
// 		transition: unset;
// 		@keyframes Flickering {
// 			from {
// 				visibility: hidden;
// 			}
// 			50% {
// 				visibility: hidden;
// 			}
// 			to {
// 				visibility: visible;
// 			}
// 		}
// 	}
// `
