export const fretSpacingAccum =  [
  0.056126,
  0.109101,	
  0.159104,		
  0.206291,		
  0.250847,		
  0.292893,		
  0.33258,	
  0.370039,		
  0.405396,		
  0.438769,		
  0.470268,		
  0.5,
  0.528063,
  0.554551,
  0.579552,
  0.60315,
  0.625423,
  0.646447,
  0.66629,
  0.68502,
  0.702698,
  0.719385,
  0.735134,
  0.75,
]

export const fretSpacing = [
  5.6126000000000005,
  5.2975,
  5.000299999999999,
  4.718700000000001,
  4.455599999999999,
  4.204600000000003,
  3.9686999999999975,
  3.745900000000002,
  3.535699999999997,
  3.3373000000000044,
  3.1498999999999997,
  2.973199999999998,
  2.806299999999995,
  2.6488000000000067,
  2.500099999999994,
  2.359800000000001,
  2.2272999999999987,
  2.1024000000000043,
  1.9843000000000055,
  1.8729999999999913,
  1.7678000000000083,
  1.6687000000000007,
  1.5748999999999902,
  1.4866000000000046
] 

// export const fretSpacingNorm

export const fretProportionsToGaps = ( normalize: Number| Boolean | String = 100) => {
  const ratio = Number(normalize) > 0 ? normalize === true ?  100 : Number(normalize) : 1

  let gaps = fretSpacingAccum.map((proportion, i, proportions) => {
    const gap = proportions[i + 1] - proportion
    return gap * ratio
  })

  gaps.pop()
  gaps.unshift((fretSpacingAccum[0] * ratio))

  console.log(JSON.stringify (gaps), 4)
  return gaps
}