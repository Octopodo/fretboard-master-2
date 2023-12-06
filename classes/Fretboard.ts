import _ from 'lodash'
import {
  Scale,
  Note,
  AbcNotation as Notation,
  type NoteLiteral,
  type ScaleType,
} from 'tonal'
import { chromaticScale, Tunings, FlatsMap } from '~/constants/musical'
import { FretSettings } from './settings'

//INTERFACES'
export interface FretData {
  fret: number
  locked: boolean
  mark: number // The index in the fret sets images
  note?: typeof Note
  positions?: number[]
  str: number
  visible: boolean
}

type GtString = Array<FretData>
type FretboardMatrix = Array<GtString>

function getPureNote(note: String) {
  return note.replace(/[0-9]/g, '')
}

function getOctave(note: String) {
  return note.replace(/\D/g, '')
}

// CLASE FRETBOARD:
// Class to manage the fretboard model
export class Fretboard {
  private spine: any // Crear clase Spine o Interfaz
  public matrix: FretboardMatrix = [[]] // Crear clase Matrix o Interfaz
  private root: any // ver claves
  private tunning: any // Crear clase tunning
  readonly scale: any //
  // readonly flats: boolean
  private positions: any //
  readonly tone: any

  constructor(
    strings: number = 6,
    frets: number = 12,
    tunning: string[] = Tunings.STANDARD,
    tone: string = 'C4',
    scale: string = 'major'
  ) {
    this.scale = Scale.get(`${tone} ${scale}`)
    this.tone = Note.get(tone)
    // this.flats = FlatsMap[]
  }

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

  public createSpine(strings: Number, frets: Number) {
    return this.spine
  }

  public createMatrix(strings = 6, frets = 12) {
    for (let str = 0; str < strings; str++) {
      this.matrix.push([])
      for (let f = 0; f < frets; f++) {
        let fret = {
          fret: f,
          locked: false,
          mark: 0,
          positions: [],
          str: str,
          visible: FretSettings.VISIBLE_AT_START,

        }
        this.matrix[str].push(fret)
      }
    }
  }

  generatePositions() {}

  freeze() {}

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
  snapshot() {}

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

  const fretboard = new Fretboard()
  console.log(fretboard.tone)
  fretboard.print()
  return message
}
