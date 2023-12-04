import _ from 'lodash'
import { Scale, Note, AbcNotation as Notation, 
  type NoteLiteral, type ScaleType } 
  from 'tonal'
import { chromaticScale, standardTunning } from '~/constants/musical'


//Import types
import  { Fret, type FretInterface } from './Fret';


function getPureNote(note: String) {
  return note.replace(/[0-9]/g, '');
}

function getOctave(note: String) {
  return note.replace(/\D/g, '')
}


// class Fretboard  {
//   private tunning:Array<String>
//   private root: NoteLiteral
//   private fretCount: Number
//   private enharmonics: String
//   private spine: Array<Fret> = []
//   private matrix: Array<Fret> = []
//   private scaleFrets: Array<any> = []
//   private scales: Array<any> = []
//   private positions: Array<any> = []
  


//   constructor(tunning=standardTunning, fretCount=22, flats=false) {
//     this.tunning = tunning
//     this.root = this.tunning[this.tunning.length -1] as NoteLiteral
//     this.fretCount = fretCount
//     this.enharmonics = flats ? 'flats' : 'sharps'
//     this.spine = this.generateSpine()
//   }

//   generateSpine() : Array<Fret> {
//     // const firstOctave = Note.octave(this.root.toString())
//     // const lastOctave = Note.octave(this.tunning[0] + Math.floor(this.fretCount))
//   }

// }

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
          visible: true,
          id: `${str}-->${f}`
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
  snapshot() {}
  print () {}
}

