import round from 'lodash/round'

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
  const d = 4 - length > maxD ? maxD : 4 - length

  return `${round(Number(value), d)}${unit}`
}
