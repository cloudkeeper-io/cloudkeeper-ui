import round from 'lodash/round'
import { Duration } from 'luxon'

export const formatNumber = (x: number, maxD = 4): number | string => {
  const v = Math.abs(x)
  let unit
  let value

  if (v >= 0.9995e9) {
    value = x / 1e9
    unit = 'B'
  } else if (v >= 0.9995e6) {
    value = x / 1e6
    unit = 'M'
  } else if (v >= 0.9995e3) {
    value = x / 1e3
    unit = 'k'
  } else {
    value = x
    unit = ''
  }

  const { length } = round(Number(value)).toString()
  const d = maxD - length > maxD ? maxD : maxD - length

  return `${round(Number(value), d)}${unit}`
}


export const msToSeconds = (x: string | number) => Duration.fromObject({ milliseconds: Number(x) }).toFormat('s')
