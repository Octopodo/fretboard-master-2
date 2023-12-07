// TODO: Formal documentation

import _ from 'lodash'
import {
  Scale,
  Note,
  AbcNotation as Notation,
  Interval,
  Range,
  type NoteLiteral,
  type ScaleType,
} from 'tonal'

import { type Note as NoteInterface } from '@tonaljs/pitch-note'
import { chromaticScale, Tunings, FlatsMap } from '~/constants/musical'
import { FretSettings, FretboardSettings as FbSettings } from '../settings'
import { isMinor } from '~/models/scales/ScaleHelpers'

//INTERFACES'
export interface FretData extends Partial<NoteInterface> {
  fret: number
  locked: boolean
  mark: number // The index in the fret sets images
  note?: NoteLiteral
  positions?: number[]
  str: number
  visible: boolean
}

type GtString = Array<FretData>
type FretboardMatrix = Array<GtString>

// CLASE FRETBOARD:
// Class to manage the fretboard model

export class Fretboard {
  private positions: any //
  private tuning: any // Crear clase tunning
  private fretCount: number
  private stringCount: number

  public matrix: FretboardMatrix = [] // Crear clase Matrix o Interfaz

  readonly flats: boolean
  readonly scale: any //
  readonly tone: any

  constructor(
    tone: string = FbSettings.TONE,
    scale: string = FbSettings.SCALE,
    tuning: string[] = FbSettings.TUNING,
    strings: number = FbSettings.STRING_COUNT,
    frets: number = FbSettings.FRET_COUNT
  ) {
    this.scale = Scale.get(`${tone} ${scale}`)
    this.tone = Note.get(this.scale.notes[0])
    this.tuning = tuning
    this.fretCount = frets
    this.stringCount = strings

    const toneName = Note.get(tone).letter
    const qualifiedTone = isMinor(this.scale) ? `${toneName}m` : toneName

    this.flats = FlatsMap[qualifiedTone as keyof typeof FlatsMap] //Use flats or sharpt as accidental representation
    this.generateMatrix()
  }
  // Implementation Ideas
  // generatePositions() {}
  // freeze() {}
  // snapshot() {}
  crawl(
    callback: (
      fret: FretData,
      index?: number,
      stringIndex?: number,
      gtString?: GtString
    ) => void,
    stringCallback = (
      str: GtString,
      ind?: number,
      matrix?: FretboardMatrix
    ) => {}
  ) {
    this.matrix.forEach((gtString, index) => {
      stringCallback(gtString, index, this.matrix)
      gtString.forEach((fret, fretIndex) => {
        callback(fret, fretIndex, index, gtString)
      })
    })
  }

  public generateStringChromaticScale(stringNumber: number) {
    const interval = Interval.fromSemitones(22)
    const startNote = this.tuning[stringNumber as keyof typeof this.tuning]
    const lastNote = Note.transpose(startNote, interval)
    const chromaticString = Range.chromatic([startNote, lastNote], {
      sharps: !this.flats,
    })

    return chromaticString
  }

  public generateMatrix() {
    for (let str = 0; str < this.stringCount; str++) {
      this.matrix.push([])
      let gString = this.generateStringChromaticScale(str)
      for (let f = 0; f < gString.length; f++) {
        let fret = {
          fret: f,
          locked: false,
          mark: 0,
          positions: [],
          str: str,
          visible: FretSettings.VISIBLE_AT_START,
          ...Note.get(gString[f]),
        }
        this.matrix[str].push(fret)
      }
    }
  }

  setScale(scaleName: String) {
    const scale: Array<any> = []
    this.crawl((fret: FretData) => {
      fret.visible = scale.includes(fret)
    })
  }

  setVisible(str: number, fret: number) {
    const fretData = this.matrix[str][fret]
    fretData.visible = !fretData.visible
  }

  // PRINT:
  // Accepts a key to print each fret
  // in a formated fretboard
  print(key = 'tone') {
    let out = ''
    this.matrix.forEach((str, sIndex) => {
      out += '||'
      str.forEach((fret, fIndex) => {
        out += `[${fret[key as keyof typeof fret]}]--`
      })
      out += '||\n'
    })
    console.log(out)
  }
}

export const FretboardTest = () => {
  let message = 'Fretboard Testing'

  // Range.chromatic(['E4', ])
  const fretboard = new Fretboard(
    'G4',
    "messiaen's mode #3",
    Tunings.STANDARD,
    6,
    22
  )

  fretboard.print('name')
  return message
}
