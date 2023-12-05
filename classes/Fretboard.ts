import _ from 'lodash'
import { Scale, Note, AbcNotation as Notation, 
  type NoteLiteral, type ScaleType } 
  from 'tonal'
import { chromaticScale, standardTunning } from '~/constants/musical'
import { FretSettings } from './settings'

//Import types
import  { Fret, type FretId, type FretInterface, FRET_ID_SPLITTER } from './Fret';

function getPureNote(note: String) {
  return note.replace(/[0-9]/g, '');
}

function getOctave(note: String) {
  return note.replace(/\D/g, '')
}

type FretboardMatrix = Array<Array<FretInterface>>

export class Fretboard {
  private spine:  any      // Crear clase Spine o Interfaz
  public matrix: FretboardMatrix = [[]]    // Crear clase Matrix o Interfaz
  private root: any       // ver claves 
  private tunning: any    // Crear clase tunning
  private scale: any      //
  private positions: any  // 

  constructor (
    strings=6,
    frets=12
  ) {

  }

  crawl (callback: Function) {
    this.matrix.forEach((string, index) => {
      string.forEach((fret, fretIndex) => {
        callback(fret, fretIndex, index)
      })
    })
  }

  public createSpine(strings: Number, frets: Number) {
    return this.spine
  }

  public createMatrix(strings=6, frets=12) {

    for(let str = 0; str < strings; str++ ) {
      this.matrix.push([])
      for (let f = 0; f < frets; f++ ) {
        let fret  = {
          visible: FretSettings.VISIBLE_AT_START,
          id: `${str.toString()}-${f.toString()}` as const,
          str: str,
          fret: f
        }
        this.matrix[str].push(fret)

      }
    }
  }

  generatePositions () {}

  freeze () {}

  setScale (scaleName: String ) {
    const scale: Array<any> = []
    this.crawl((fret:any) => {
      fret.visible = scale.includes(fret) 
    })
  }

  setVisible(str: number, fret: number) {
    const fretData = this.matrix[str][fret]
    fretData.visible = !fretData.visible
  }
  snapshot() {}
  print () {}
}

