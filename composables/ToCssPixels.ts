///TODO: filter strings, numbers and strings with pc value

export const useToCssPixels = (value: Number) => {
  const val = `${value}px`
  return ref(val)
}
