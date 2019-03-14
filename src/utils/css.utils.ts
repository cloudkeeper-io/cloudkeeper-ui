/* eslint-disable implicit-arrow-linebreak */
export const getClipPath = (x: number) =>
  `polygon(${x}px 0, 100% 0, 100% calc(100% - ${x}px), calc(100% - ${x}px) 100%, 0 100%, 0 ${x}px)`

export const getBorderClipPath = (x: number, y: number) =>
  `polygon(
     0 ${x}px,
     ${x}px 0,
     100% 0,
     100% calc(100% - ${x}px),
     calc(100% - ${x}px) 100%,
     0 100%,
  
     0 calc(100% - ${y + y}px),
     calc(100% - ${x + y}px) calc(100% - ${y + y}px),
     calc(100% - ${y + y}px) calc(100% - ${x + y}px),
     calc(100% - ${y + y}px) ${y + y}px,
     ${x + y}px ${y + y}px, 
     ${y + y}px ${x + y}px, 
     ${y + y}px calc(100% - ${y}px), 
     0 100%
)`
