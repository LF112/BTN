import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
//[ package ]

import './index.css'
import 'assets/element-ui-icon/index.css'
//[ style ]

import store from 'state'
//[ store ]

import App from './App'
//[ pages ]

//=> Render | 渲染页面
ReactDOM.render(
	<React.StrictMode>
		{/* REACT REDUX */}
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('BTNEXT') //=> 绑定渲染组件
)

//=> 控制台徽章
if (process.env.NODE_ENV === 'production') {
	console.clear()
	console.log(
		'\n %c \u26a1BT NEXT %c https://www.lf112.net %c BY%c LF112  \n\n',
		'color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;',
		'background:rgba(197, 197, 197, 0.89); padding:5px 0;',
		'color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;',
		'color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;'
	)
}
