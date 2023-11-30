import { defineStore } from 'pinia'

const fbRatio = 0.1
export const useMyFretboardStore = defineStore({
  id: 'myFretboardStore',
  state: () => ({ 
    //DIMENSIONS
    fbRatio: fbRatio,
    fretbarWidth: 4,
    fretboardHeight: 250,
    fretboardWidth: window.innerWidth * fbRatio,
    fretDotSize: 20

  }),
  actions: {}
})
