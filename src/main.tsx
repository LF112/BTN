/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
//[ package ]

import './index.less'
import 'assets/element-ui-icon/index.css'
//[ style ]

import store from 'state'
//[ store ]

import App from './App'
//[ pages ]

import 'utils/fetchAnit' //=> AXIOS | '流程拦截器'
//[ utils ]

//=> Render | 渲染页面
//=> 绑定渲染组件↓
createRoot(document.getElementById('BTNEXT')).render(
	<React.StrictMode>
		{/* REACT REDUX */}
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)

//=> 控制台徽章
if (process.env.NODE_ENV === 'production') console.clear()
console.log(
	'\n %c \u26a1BT NEXT %c https://www.lf112.net %c BY%c LF112  \n\n',
	'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;',
	'background:rgba(197, 197, 197, 0.89); padding:5px 0;',
	'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;',
	'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;'
)
