/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { createGlobalStyle } from 'styled-components'
//[ package ]

import { AnimationCSS } from './animation'
import './fonts.css'
import ElementCSS from 'assets/element-ui-icon/index.css'
//[ css ]

//=> Style | '全局样式'
export const GlobalStyle = createGlobalStyle`
/* 引入其他 CSS */
${AnimationCSS}
${ElementCSS}

*,
body,
html {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	border: 0;
	background: 0 0;
	word-wrap: break-word;
	text-decoration: none;
	-webkit-tap-highlight-color: transparent;
	font-family: Noto Sans SC, -apple-system, system-ui, BlinkMacSystemFont,
		Segoe UI, Roboto, PingFang SC, Hiragino Sans GB, Microsoft YaHei,
		Helvetica Neue, sans-serif;
}

body {
	position: relative;
	/* background: #21252b; */
	overflow: hidden;
}

a,
span {
	color: hsla(0, 0%, 100%, 0.19);
	text-decoration: none;
	font-weight: lighter;
	font-size: 12px;
}

:not(body) {
	transition: all 0.5s cubic-bezier(0.22, 0.58, 0.12, 0.98); /* 全局线性 */
    /* transition: all 0.5s cubic-bezier(0.66, 0.09, 0.49, 1.21);*//* 全局非线性 */
}

/* 滚动条 & 选中 */

::-webkit-scrollbar {
	width: 6px;
	height: 6px;
	border-radius: 6px;
	background: rgba(0, 0, 0, 0.05);
	-webkit-appearance: none;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-thumb {
	width: 4px;
	height: 4px;
	border-radius: 6px;
	background-color: rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::-webkit-scrollbar-button,
::-webkit-scrollbar-corner,
::-webkit-scrollbar-track,
::-webkit-scrollbar-track-piece {
	display: none;
	background: 0 0;
}

::selection {
	background: #3c434c;
	color: #597db7;
	border-radius: 2px;
}
`
