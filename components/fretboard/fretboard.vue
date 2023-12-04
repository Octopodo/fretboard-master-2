<template>
  <div class="fretboard" :style="stringTemplate">
    <div class="string" :style="fretTemplate" v-for="str in fretboard.matrix" >
      <fretboard-fret-view  v-for="fret in str" :fret-data="fret"></fretboard-fret-view>
    </div>
  </div>

</template>

<script lang="ts" setup>
import { useMyFretboardStore } from '~/stores/FretboardStore'
import {  fretSpacing } from '~/constants/fret-proportions'
import { Fretboard } from '~/classes/Fretboard'

const props = defineProps({
  strings: { type: [Number, String], default: 6 },
  frets: { type: [Number, String], default: 12}
})


const fretCount = computed(() => Number(props.frets))
const stringCount = computed(() => Number(props.strings))
const state = useMyFretboardStore()
const fretboard = computed(() => new Fretboard(stringCount.value, fretCount.value))

fretboard.value.createMatrix(stringCount.value, fretCount.value)


const fretTemplate = computed(()=> {
  let fretSpacingCss = fretSpacing.map(space => `${space}fr`).join(' ')
  return {
    gridTemplateColumns: fretSpacingCss,
    gidTemplateRows: 'auto'
  }
})

const stringTemplate = computed(() => {
  return {
    gridTemplateColumns: 'auto',
    gidTemplateRows: `repeat(${stringCount}, 1fr)`
  }
})

onBeforeMount(() => {
  
})
</script>

<style lang="sass">

</style>

