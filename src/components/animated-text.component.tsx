import React from 'react'

// import { useTransition, animated } from 'react-spring'

interface AnimatedTextProps {
  children: any,
  trigger: number,
  offset?: string,
  className?: string,
}

// export default ({ children, offset = '50px', className, trigger }: AnimatedTextProps) => {
//   const transitions = useTransition(trigger, p => p, {
//     from: { opacity: 0, transform: `translate3d(${offset}, 0, 0)`, position: 'absolute' },
//     enter: { opacity: 1, transform: 'translate3d(0, 0. 0)', position: 'relative' },
//     leave: { opacity: 0, transform: `translate3d(-${offset}, 0, 0)`, position: 'absolute' },
//     config: { duration: 500 },
//   })
//
//   return (
//     <div className={className}>
//       {transitions.map(({ props, key }) => (
//         <animated.div key={key} style={{ ...props }}>{children}</animated.div>
//       ))}
//     </div>
//   )
// }

export default ({ children, className }: AnimatedTextProps) => (
  <div className={className}>
    {children}
  </div>
)
