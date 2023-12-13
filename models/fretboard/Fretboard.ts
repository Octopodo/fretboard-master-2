// TODO: Formal documentation

import _ from 'lodash'
import {
  Scale,
  Note,
  AbcNotation as Notation,
  Interval,
  Range,
  PcSet,
  type NoteLiteral,
  type ScaleType,
} from 'tonal'

import { type Note as NoteInterface } from '@tonaljs/pitch-note'
import { chromaticScale, Tunings, FlatsMap } from '~/constants/musical'
import { FretSettings, FretboardSettings as FbSettings } from '../settings'
import { isMinor } from '~/models/scales/ScaleHelpers'

//INTERFACES'

/**
 *
 */
interface FretData extends Partial<NoteInterface> {
  fret: number
  locked: boolean
  mark: number // The index in the fret sets images
  note?: NoteLiteral
  positions?: number[]
  str: number
  visible: boolean
  active: boolean
}

type GtString = Array<FretData>
type FretboardMatrix = Array<GtString>

// CLASE FRETBOARD:
// Class to manage the fretboard model

/**
 * Class to manage fretboard data. It manages the FretboardMatrix.
 * @prop positions Stores a PositionMatrix with all the finger positions.
 * @prop tuning This is th tuning of the current Fretboard. If a new tuning is needed, you must create a new Fretboard.
 * @prop fretCount Tee number of frets.
 * @prop stringCount Represent the phisical number of strings.
 * @prop matrix The main matrix to manipulate FretData.
 * @prop flats Determines if the notes must be written with b or #
 * @prop scale The scale of the current fretboard
 * @prop tone The root note of the fretboard
 * @member kls
 */
class Fretboard {
  private positions: any //
  private tuning: any // Crear clase tunning
  private fretCount: number
  private stringCount: number
  private isActive: Function
  private maxFrets: Number
  private maxStrings: Number
  public matrix: FretboardMatrix = [] // Crear clase Matrix o Interfaz

  readonly flats: boolean
  readonly scale: any //
  readonly tone: any

  /**
   * Determines
   * @param tone
   * @param scale
   * @param tuning
   * @param strings
   * @param frets
   */
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
    this.maxFrets = frets
    this.maxStrings = strings
    this.isActive = PcSet.isNoteIncludedIn(this.scale.notes)
    const toneName = Note.get(tone).letter
    const qualifiedTone = isMinor(this.scale) ? `${toneName}m` : toneName

    this.flats = FlatsMap[qualifiedTone as keyof typeof FlatsMap] //Use flats or sharpt as accidental representation
    this.generateMatrix()
  }
  // Implementation Ideas
  // generatePositions() {}
  // freeze() {}
  // snapshot() {}

  /**
   * Internal function to iterate and perform operations trough the FretboardMatrix
   * @param callback A calback function to perform on each FretData
   * @param stringCallback  A callbac
   */
  private crawl(
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

  /**
   * Generates all the chromatic notes for a string based on the string tuning
   * @param stringNumber
   * @returns An array with all the string notes in the format 'A#5'
   */
  private generateStringChromaticScale(stringNumber: number) {
    const interval = Interval.fromSemitones(this.fretCount + 1)
    const startNote = this.tuning[stringNumber as keyof typeof this.tuning]
    const lastNote = Note.transpose(startNote, interval)
    const chromaticString = Range.chromatic([startNote, lastNote], {
      sharps: !this.flats,
    })

    return chromaticString
  }

  /**
   * Generates tha fretboard matrix that contains all the frets in FretData format
   */
  public generateMatrix() {
    for (let str = 0; str < this.stringCount; str++) {
      this.matrix.push([])
      let gString = this.generateStringChromaticScale(str)
      for (let f = 0; f < gString.length; f++) {
        let fret = {
          active: false,
          fret: f,
          locked: false,
          mark: 0,
          positions: [],
          str: str,
          visible: false,
          ...Note.get(gString[f]),
        }

        fret.active = this.isActive(fret.name)
        fret.visible = fret.active

        this.matrix[str].push(fret)
      }
    }
  }

  public frets() {
    return this.fretCount
  }

  public strings() {
    return this.stringCount
  }

  public addStrings(count: number) {

  }

  public removeStrings(count: number) {
    this.matrix.splice(0, count)
  }

  public removeFrets(count: number) {
    for(let str of this.matrix) {
      str.splice(str.length - count -1) //Revisar desde donde empieza a quitar
    }
  }

  public setScale(scaleName: String) {
    const scale: Array<any> = []
    this.crawl((fret: FretData) => {
      fret.visible = scale.includes(fret)
    })
  }

  public setVisible(str: number, fret: number) {
    const fretData = this.matrix[str][fret]
    fretData.visible = !fretData.visible
  }

  /**
   * Function to pretty print the FretboardMatrix
   * @param keyOrCallback The key of FretData to prink. It can be a callback to output custom values
   * @returns Returns the string output
   */
  print(
    keyOrCallback?:
      | string
      | ((
          fret: FretData,
          fretIndex?: number,
          gString?: GtString,
          gIndex?: Number
        ) => string | undefined)
  ) {
    let out = ''
    let nut = '||'
    let frontSeparator = '-['
    let endSeparator = ']-'
    let fretInfo: any
    this.matrix.forEach((str, sIndex) => {
      out += nut
      str.forEach((fret, fIndex) => {
        if (typeof keyOrCallback === 'string') {
          fretInfo = fret[keyOrCallback as keyof typeof fret]
        } else if (typeof keyOrCallback === 'function') {
          fretInfo = keyOrCallback(fret, fIndex, str, sIndex)
        } else {
          fretInfo = fret.name
        }
        out += `${frontSeparator}${fretInfo}${endSeparator}`
      })
      out += `${nut}\n`
    })
    console.log(out)
    return out
  }
}

/**Just for testing.  */
const FretboardTest = () => {
  let message = 'Fretboard Testing'

  // Range.chromatic(['E4', ])
  const fretboard = new Fretboard('C', 'major', Tunings.STANDARD, 6, 22)

  fretboard.print((fret) => {
    return fret.active ? fret.name : 'X'
  })
  return message
}

export { type FretData, type FretboardMatrix, Fretboard, FretboardTest }
