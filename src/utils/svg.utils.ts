import map from 'lodash-es/map'
import every from 'lodash-es/every'
import first from 'lodash-es/first'
import min from 'lodash-es/min'
import max from 'lodash-es/max'

export const checkDataPoints = (dataPoints: any [], units: string[]) => {
  const minValue = min(map(units, (unit) => min(map(dataPoints, (d) => d[unit]))))
  const maxValue = max(map(units, (unit) => max(map(dataPoints, (d) => d[unit]))))
  const totalRange = maxValue - minValue

  return map(units, (unit) => {
    const points = map(dataPoints, (x) => x[unit])
    const range = max(points) - min(points)
    const isAllPointsEqual = every(points, (point) => point === first(points))

    return isAllPointsEqual || (1 - (totalRange - range) / totalRange) < 0.0075 // less than 0.75%
  })
}
