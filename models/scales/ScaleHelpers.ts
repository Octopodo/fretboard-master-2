import { type Scale as ScaleInterface } from '@tonaljs/scale'

export const isMinor = (scale: ScaleInterface) => {
  let isMinor = scale.intervals.indexOf('3m') !== -1
  return isMinor
}
