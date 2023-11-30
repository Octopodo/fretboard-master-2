import { Key, Chord, Note } from 'tonal'
import type { NoteLiteral } from 'tonal'
import _ from 'lodash'


export const useGetKey = ( pitch: NoteLiteral, type: String, ) => {
  const note = Note.pitchClass(pitch)
  let key = {}
  if( type.toLowerCase() === 'major' )  {
    let keySubClass = {}
    const keyClass = type.split(' ')[0].toLowerCase()
    const minorKey = Key.minorKey(note)
    key = _.pickBy(minorKey, function( value, prop,) {
      if( prop == 'natural' || prop == 'harmonic' || prop == 'melodic') {
        if(prop === keyClass) {
          keySubClass = value
        } 
      } else {
        return prop + value
      }
    })
    key = _.merge(key, keySubClass)
  }
  return ref(key)
}
