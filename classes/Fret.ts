import { type Ref } from 'vue'
export class Fret {
  private active: boolean = true;
  private color: any = null;
  private decoration: any = null;
  private finger: number = 0;
  private index: number = 0;
  private octave: number = 4;
  private offset: boolean = false;
  private pitch: string = 'C';
  private visible: boolean = true

  constructor({
    active = true,
    color = null,
    decoration = null,
    finger = 0,
    index = 0,
    octave = 4,
    offset = false,
    pitch = 'C',
    visible = true
  } = {}) {
    // No es necesario asignar valores en el constructor
  }
  
}

export type FretId = `${string}-${string}`
export const FRET_ID_SPLITTER = '-'



export interface FretInterface {
  id?: FretId
  active?: boolean
  color?: any
  borderColor?: any
  decoration?: any
  finger?: number
  index?: number
  octave?: number
  offset?: boolean
  pitch?: string
  str: number
  fret: number
  visible: boolean
}

