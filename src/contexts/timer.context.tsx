import React, { Dispatch, SetStateAction, useState } from 'react'
import noop from 'lodash/noop'

import { useInterval } from '../hooks'

interface TimerProviderProps {
  children: JSX.Element
}

interface TimerState {
  count: number,
  delay: number,
  isActive: boolean,
  isVisible: boolean,
  setDelay: Dispatch<SetStateAction<number>>
  setActive: Dispatch<SetStateAction<boolean>>
  setVisibility: Dispatch<SetStateAction<boolean>>
}

const initialState: TimerState = {
  count: 0,
  delay: 0,
  isActive: false,
  isVisible: false,
  setDelay: noop,
  setActive: noop,
  setVisibility: noop,
}

const TimerContext = React.createContext(initialState)

const DELAY = 10000

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [count, setCount] = useState(1)
  const [delay, setDelay] = useState(DELAY)
  const [isActive, setActive] = useState(true)
  const [isVisible, setVisibility] = useState(false)

  useInterval(() => {
    setCount(current => current + 1)
  }, delay, isActive)

  return (
    <TimerContext.Provider value={{ count, delay, isActive, isVisible, setDelay, setActive, setVisibility }}>
      {children}
    </TimerContext.Provider>
  )
}

const TimerConsumer = TimerContext.Consumer

export { TimerContext, TimerProvider, TimerConsumer }
