import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import noop from 'lodash/noop'

import { useInterval } from '../hooks'
import { TIMER_KEY } from '../constants'

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
  setActiveAndSave: (active: boolean) => void
  setVisibility: Dispatch<SetStateAction<boolean>>
  setCount: Dispatch<SetStateAction<number>>
}

const initialState: TimerState = {
  count: 0,
  delay: 0,
  isActive: false,
  isVisible: false,
  setDelay: noop,
  setActive: noop,
  setActiveAndSave: noop,
  setVisibility: noop,
  setCount: noop,
}

const TimerContext = React.createContext(initialState)

const DELAY = 10000

const TimerProvider = ({ children }: TimerProviderProps) => {
  const [count, setCount] = useState(1)
  const [delay, setDelay] = useState(DELAY)
  const [isActive, setActive] = useState(false)
  const [isVisible, setVisibility] = useState(false)

  useInterval(() => {
    setCount(current => current + 1)
  }, delay, isActive)

  const setActiveAndSave = useCallback((active: boolean) => {
    localStorage.setItem(TIMER_KEY, JSON.stringify(active))
    setActive(active)
  }, [setActive])

  return (
    <TimerContext.Provider
      value={{ count, delay, isActive, isVisible, setCount, setDelay, setActive, setActiveAndSave, setVisibility }}
    >
      {children}
    </TimerContext.Provider>
  )
}

const TimerConsumer = TimerContext.Consumer

export { TimerContext, TimerProvider, TimerConsumer }
