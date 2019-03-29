import React, { Dispatch, SetStateAction, memo, useState } from 'react'
import noop from 'lodash/noop'

import { useInterval } from '../hooks'

interface TimerProviderProps {
  children: JSX.Element
}

interface TimerState {
  count: number,
  delay: number,
  isTimerEnabled: boolean,
  setDelay: Dispatch<SetStateAction<number>>
  setTimerStatus: Dispatch<SetStateAction<boolean>>
}

const initialState: TimerState = {
  count: 0,
  delay: 0,
  isTimerEnabled: false,
  setDelay: noop,
  setTimerStatus: noop,
}

const TimerContext = React.createContext(initialState)

const DELAY = 10000

const TimerProvider = memo(({ children }: TimerProviderProps) => {
  const [count, setCount] = useState(1)
  const [delay, setDelay] = useState(DELAY)
  const [isTimerEnabled, setTimerStatus] = useState(true)

  useInterval(() => {
    setCount(current => current + 1)
  }, delay, isTimerEnabled)

  return (
    <TimerContext.Provider value={{ count, delay, isTimerEnabled, setDelay, setTimerStatus }}>
      {children}
    </TimerContext.Provider>
  )
})

const TimerConsumer = TimerContext.Consumer

export { TimerContext, TimerProvider, TimerConsumer }
