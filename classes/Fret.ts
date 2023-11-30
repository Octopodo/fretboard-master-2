class Fret {
  private active: Boolean = true
  private color: any = null
  private decoration: any = null
  private finger: Number = 0
  private index: Number = 0
  private octave: Number = 4
  private offset: Boolean = false
  private pitch: String = 'C'

  constructor(
    active?: Boolean,
    color?: any,
    decoration?: any,
    finger?: Number,
    index?: Number,
    octave?: Number,
    offset?: Boolean,
    pitch?: String
  ) {
    // No es necesario asignar valores en el constructor
  }
}

export { Fret }
