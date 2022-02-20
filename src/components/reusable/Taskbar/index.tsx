import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Highlight from 'react-highlight'
//[ package ]

import './oneDark.less'
//[ css ]

import { ReactComponent as ICON_Triangle } from 'assets/svg/global_triangle.svg'
//[ assets ]

import useToggle from 'utils/useToggle'
import { queueObj } from 'utils/useTools'
//[ utils ]

//=> DOM
export default (props: any) => {
	const { rawJson, aimsJson } = props
	const [Unfold, toggle] = useToggle()

	const node = useRef<HTMLElement>()
	const [FoldHeight, updateFoldHeight] = useState<number>(-1)
	useEffect(() => {
		setTimeout(() => {
			const DOM = node.current
			updateFoldHeight(DOM.clientHeight + 4)
			DOM.style.height = '0'
		})
	}, [node])

	useEffect(() => {
		if (FoldHeight > 0)
			node.current.style.height = Unfold ? `${FoldHeight}px` : '0'
	}, [Unfold])

	return (
		<Main
			style={{ padding: Unfold ? '10px' : '5px 10px' }}
			onMouseEnter={toggle}
			onMouseLeave={toggle}>
			<div>
				<Context>
					<ICON_Triangle />
					<p>{queueObj(rawJson, aimsJson) || '-'}</p>
				</Context>
				<Fold ref={node as any}>
					<PackageHighlight className='json'>
						{JSON.stringify(rawJson)}
					</PackageHighlight>
				</Fold>
			</div>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	min-height: 40px;
	background: #1b1f26;
	border-radius: 5px;
	margin-top: 12px;
	padding: 5px 10px;
	box-shadow: inset 0 1px 0 rgba(27, 31, 35, 12%);
	cursor: pointer;
	display: flex;
	align-items: center;
	> div {
		width: 100%;
		height: 100%;
		:hover {
			> div {
				> svg {
					transform: rotate(90deg);
				}
				> p {
					margin-left: 5px;
				}
			}
		}
	}
`

const Context = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	> svg {
		width: 16px;
		height: 16px;
		margin-right: 8px;
	}
	> p {
		color: #fff;
		font-weight: lighter;
		font-size: 14px;
		font-family: 'MiSans';
	}
`

const Fold = styled.div`
	width: 100%;
	overflow: hidden;
	cursor: auto;
`

const PackageHighlight = styled(Highlight)`
	background: #282c34;
	border-radius: 5px;
	padding: 8px 18px;
	margin-top: 5px;
`
