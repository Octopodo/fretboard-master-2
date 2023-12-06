import type { NoteLiteral } from 'tonal'

export const chromaticScale = {
  sharps: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
  flats: ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'],
}

export const Tunings = {
  STANDARD: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2'],
}

export const FlatsMap = {
  C: false,
  G: false,
  D: false,
  A: false,
  E: false,
  B: false,
  'F#': true,
  Db: true,
  Ab: true,
  Eb: true,
  Bb: true,
  F: true,
  'C#': true,
  'G#': true,
  'D#': true,
  'A#': true,
  Fm: true,
  Cm: true,
  Gm: true,
  Dm: true,
  Am: false,
  Em: false,
  Bm: false,
  'F#m': false,
  'C#m': false,
  'D#m': true,
  'G#m': true,
  'A#m': true,
  Gbm: false,
  Dbm: false,
  Cbm: false,
}

export const SHARP_SCALES = [
  'C',
  'G',
  'D',
  'A',
  'E',
  'B',
  'Am',
  'Em',
  'Bm',
  'F#m',
  'C#m',
  'Gbm',
  'Dbm',
  'Cbm',
]

const FLAT_SCALES = [
  'F#',
  'Db',
  'Ab',
  'Eb',
  'Bb',
  'F',
  'C#',
  'G#',
  'D#',
  'A#',
  'Fm',
  'Cm',
  'Gm',
  'Dm',
  'D#m',
  'G#m',
  'A#m',
]
