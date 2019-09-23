import React, { memo, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'
import times from 'lodash/times'

const Canvas = styled.canvas`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#00111e 30%, #033d5e);
  overflow: hidden;
`

export const Stars = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const { current } = canvasRef
    if (canvasRef.current) {
      const ctx = current!.getContext('2d')
      const xMax = window.screen.availWidth
      const yMax = window.screen.availHeight
      current!.width = xMax
      current!.height = yMax

      const hmTimes = Math.round(xMax + yMax)

      times(hmTimes, () => {
        const randomX = Math.floor((Math.random() * xMax) + 1)
        const randomY = Math.floor((Math.random() * yMax) + 1)
        const randomSize = Math.floor((Math.random() * 2) + 1)
        const randomOpacityOne = Math.floor((Math.random() * 9) + 1)
        const randomOpacityTwo = Math.floor((Math.random() * 9) + 1)
        const randomHue = Math.floor((Math.random() * 360) + 1)
        if (randomSize > 1) {
          ctx!.shadowBlur = Math.floor((Math.random() * 15) + 5)
          ctx!.shadowColor = 'white'
        }
        ctx!.fillStyle = `hsla(${randomHue}, 30%, 80%, .${randomOpacityOne}${randomOpacityTwo})`
        ctx!.fillRect(randomX, randomY, randomSize, randomSize)
      })
    }
  }, [canvasRef.current])

  return (
    <Canvas ref={canvasRef} />
  )
})
