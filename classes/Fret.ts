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



export interface FretInterface {
  id?: String
  active?: Boolean
  color?: any
  borderColor?: any
  decoration?: any
  finger?: Number
  index?: Number
  octave?: Number
  offset?: Boolean
  pitch?: String
  visible?: Boolean
}

