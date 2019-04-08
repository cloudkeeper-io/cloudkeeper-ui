import map from 'lodash/map'
import forEach from 'lodash/forEach'
import min from 'lodash/min'
import max from 'lodash/max'
import indexOf from 'lodash/indexOf'

export const processDataPoints = (dataPoints: any [], units: string[]) => {
  const minValue = min(map(units, unit => min(map(dataPoints, d => d[unit]))))
  const maxValue = max(map(units, unit => max(map(dataPoints, d => d[unit]))))
  const totalRange = maxValue - minValue
  forEach(units, (unit) => {
    const points = map(dataPoints, x => x[unit])
    const range = max(points) - min(points)
    if ((1 - (totalRange - range) / totalRange) < 0.0075) { // less than 0.75%
      const index = indexOf(points, max(points))
      const additionalWeight = totalRange * 0.0075
      // eslint-disable-next-line no-param-reassign
      dataPoints[index][unit] += additionalWeight
    }
  })

  return dataPoints
}
