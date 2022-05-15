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
