import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//[ package ]

import Menu from 'components/reusable/Menu/Breadboard'
//[ components ]

import { settingChooseList } from 'constants/setting_consts'

//=> DOM
export default (props: any) => {
	const { togglePage, setTogglePage } = props
	const [choose, setChoose] = useState<string>('index')

	return (
		<Main>
			<Menu
				list={[
					{ name: '设置', to: 'index' },
					{ name: 'BTN 设置', to: 'btn' }
				]}
				setChoose={setChoose}
			/>
			<MenuList>
				<div
					style={
						choose === 'index'
							? {
									pointerEvents: 'auto',
									opacity: 1,
									top: 0
							  }
							: {}
					}>
					{settingChooseList.map(({ icon, name, path }: any, index: number) => {
						const clicked = togglePage === path
						return (
							<PageItem
								style={
									clicked
										? { background: '#21242c', pointerEvents: 'none' }
										: {}
								}
								key={index}
								onClick={() => setTogglePage(path)}>
								<FrameStrip style={{ opacity: clicked ? 1 : 0 }} />
								<div>
									<Icon>{icon}</Icon>
									<h2>{name}</h2>
								</div>
							</PageItem>
						)
					})}
				</div>
			</MenuList>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	width: 100%;
	min-width: 230px;
	margin-bottom: 10px;
	> main {
		width: 100%;
		min-width: 230px;
	}
`

const MenuList = styled.div`
	position: relative;
	width: 100%;
	height: 100%;
	margin-top: 10px;
	> div {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 15px;
		opacity: 0;
		pointer-events: none;
		> div + div {
			margin-top: 10px;
		}
	}
`

const PageItem = styled.div`
	position: relative;
	width: 100%;
	height: 42px;
	border-radius: 5px;
	padding: 5px 16px;
	display: flex;
	align-items: center;
	cursor: pointer;
	> div {
		display: flex;
		align-items: center;
		> h2 {
			color: #fff;
			font-size: 15px;
			line-height: 1;
			font-family: 'HarmonyOS';
			margin-left: 20px;
			user-select: none;
		}
	}
	&:hover {
		background: #21242c;
		> nav {
			opacity: 1;
		}
		> div {
			transform: scale(0.95);
		}
	}
`

const Icon = styled.div`
	width: 24px;
	height: 24px;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	> span {
		font-size: 16px;
	}
	> i {
		font-size: 20px;
	}
`

const FrameStrip = styled.nav`
	position: absolute;
	left: 0;
	width: 4px;
	height: 68%;
	border-radius: 0 5px 5px 0;
	background: #444b58;
	opacity: 0;
`
