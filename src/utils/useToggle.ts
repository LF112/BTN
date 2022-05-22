/*
 * @Author: LF112 (futiwolf) <lf@lf112.net>
 * @License: GNU Affero General Public License v3.0
 *
 * Copyright (c) 2022 LF112 (futiwolf), All Rights Reserved.
 * 请注意，本项目使用 AGPL v3 开源协议开源，请严格依照开源协议进行不限于编辑、分发等操作。详见 https://www.chinasona.org/gnu/agpl-3.0-cn.html
 */
import { useCallback, useState } from 'react'

export default function useToggle(
	initialState = false
): [boolean, (specify?: boolean) => void] {
	const [state, setState] = useState(initialState)
	const toggle = useCallback(
		(specify?: boolean) =>
			setState(state => (specify !== undefined ? specify : !state)),
		[]
	)
	return [state, toggle]
}
