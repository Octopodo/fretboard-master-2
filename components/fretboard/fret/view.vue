<template>
  <div
    class="cursor-pointer fret-container fret-background"
    :style="[sizeStyle]"
    @click.prevent="leftClick()"
  >
    <!-- <transition name="show-fret"> -->
      <fretboard-fret-dot
        class="fret-content"
        :visible="props.fretData.visible"
        :width="dotSize"
        :height="dotSize"
        :tone="fretData.name"
      ></fretboard-fret-dot>
    <!-- </transition> -->
    <div class="fretboard-string"></div>
  </div>
</template>

<script lang="ts" setup>
// FRET VIEW COMPONENT
// BAse component for fret in fretboard
// Is composed by the base fret square and
// the display dot.

import { FretSettings } from '~/models/settings'

import type { PropType } from 'vue'
import { type FretData } from '~/models/fretboard/Fretboard'

// PROPS:
const props = defineProps({
  tone: { type: Number, default: 0 }, //Must be a unmutable value
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  dotSize: { type: Number, default: FretSettings.FRET_DOT_SIZE },
  image: { type: String || null, default: null },
  fretData: { type: Object as PropType<FretData>, required: true },
})

//REFS:
// The color system must be extracted outside
//This ar just temporal refs
const dotColor = ref('#ff0')
const dotOutlineColor = ref('#00f')
const dotDecoration = ref()

const fretContentClass = computed(() => {
  return props.tone
})

// COMPUTED STYLES:
const sizeStyle = computed(() => {
  return {
    width: 'auto',
    height: 'auto',
  }
})


// EMITTERS:
const emit = defineEmits(['userClickedFret'])

const leftClick = () => {
  emit('userClickedFret', props.fretData.str, props.fretData.fret)
}
</script>

<style lang="sass" scoped>


.fret
  position: absolute
  background-color: red


.fret-container
  display: grid
  place-content: center
  height: 10px
</style>
~/model/settings~/model/Fretboard
