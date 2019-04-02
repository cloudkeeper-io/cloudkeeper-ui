import map from 'lodash/map'
import forEach from 'lodash/forEach'
import uniq from 'lodash/uniq'

export const processDataPoints = (dataPoints: any [], units: string[]) => {
  forEach(units, (unit) => {
    const points = map(dataPoints, x => x[unit])
    if (uniq(points).length === 1) {
      // eslint-disable-next-line no-param-reassign
      dataPoints[0][unit] = dataPoints[0][unit] === 0 ? 0.0000001 : dataPoints[0][unit] * 1.0001
    }
  })

  return dataPoints
}
