import React from 'react'
import { useTransition, animated } from 'react-spring'

interface AnimatedTextProps {
  children: string | number,
  className?: string,
}

export default ({ children, className }: AnimatedTextProps) => {
  const transitions = useTransition(children, p => p, {
    from: { opacity: 0, transform: 'translate3d(50%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0. 0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%, 0, 0)' },
    config: { duration: 500 },
  })

  return (
    <div className={className}>
      {transitions.map(({ props, key }) => (
        <animated.div key={key} style={{ ...props }}>{children}</animated.div>
      ))}
    </div>
  )
}
