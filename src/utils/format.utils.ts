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

export const bytesToSize = (bytes: number) => {
  const sizes = ['b', 'kB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 b'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)) as any, 10)
  return i ? `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}` : `${bytes} ${sizes[i]}`
}

export const msToSeconds = (x: string | number) => Duration.fromObject({ milliseconds: Number(x) }).toFormat('s')

// eslint-disable-next-line max-len,no-nested-ternary
export const toOrdinal = (n: number) => n + (n % 10 === 1 && n % 100 !== 11 ? 'st' : n % 10 === 2 && n % 100 !== 12 ? 'nd' : n % 10 === 3 && n % 100 !== 13 ? 'rd' : 'th')