import { useEffect, useRef } from 'react'

export function useInterval(callback: () => void, delay: number, isActive = true) {
  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current!()
    }

    if (delay !== null && isActive) {
      const interval = setInterval(tick, delay)
      return () => clearInterval(interval)
    }

    return () => {}
  }, [isActive, delay])
}
