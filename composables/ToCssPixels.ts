export const useToCssPixels = (value: Number) => {
  const val = `${value}px`
  return ref(val)
}
