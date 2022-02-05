import React, { useEffect } from 'react'
import styled from 'styled-components'
import { setRafInterval, clearRafInterval } from 'setRafTimeout'
//[ package ]

import Header from 'components/page/console/Header'
import QuickControl from 'components/page/console/QuickControl'
import StatusPanel from 'components/page/console/StatusPanel'
//[ components ]

import { useUpdateApi } from 'state/api/hooks'
//[ hooks ]

//=> DOM
export default () => {
	const updateApi = useUpdateApi()

	//=> 更新状态
	let Timer: any = null
	useEffect(() => {
		updateApi([
			['panel', 'version', 'name', 'Pro', 'Ltd', 'Beta', 'time'],
			['system', 'load']
		])

		//=> 持续获取面板状态
		Timer = setRafInterval(() => {
			updateApi([
				['system', 'load'],
				['cpu', 'cpu'],
				['memory', 'mem']
			])
		}, 2000)
		return () => clearRafInterval(Timer)
	}, [''])

	return (
		<Main>
			<Left>
				<Header />
				<StatusPanel />
			</Left>
			<Right>
				<QuickControl />
			</Right>
		</Main>
	)
}

//=> Style
const Main = styled.main`
	position: relative;
	width: calc(100% - 218px);
	height: calc(100% - 20px);
	margin: 10px 10px 10px auto;
	padding: 10px 0;
	display: flex;
`

const Left = styled.div`
	width: calc(100% - 310px);
	height: 100%;
	margin-right: 10px;
`

const Right = styled.div`
	width: 300px;
	height: 100%;
`
