import { defineStore } from 'pinia'

export const useMyDevGuiStore = defineStore({
  id: 'myDevGuiStore',
  state: () => ({
    maxStrings: 24,
    maxFrets: 24,
    stringCount:  6,
    fretCount: 24,
    stringColor: '##51526d'

   }),
  actions: {}
})
