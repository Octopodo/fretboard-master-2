<template>
  <div class="fretboard-container">
    <NuxtImg
      v-if="showImage"
      src="/img/fretboards/fretboard_wood.png"
      class="fretboard-image"
    ></NuxtImg>
    <div class="fretboard" :style="[stringTemplate, fretboardSize]">
      <div class="string" :style="fretTemplate" v-for="str in stringCount">
        <fretboard-fret-view
          v-for="fret in fretCount"
          :fretData="fretboard.matrix[str -1][fret]"
          @user-clicked-fret="(str, fret) => fretboard.setVisible(str, fret)"
        ></fretboard-fret-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyFretboardStore } from '~/stores/FretboardStore'
import {useMyDevGuiStore } from '~/stores/DevGui'
import { fretSpacing } from '~/constants/fret-proportions'
import { Fretboard } from '~/models/fretboard/Fretboard'
import { FretboardSettings, FretSettings } from '~/models/settings'

const props = defineProps({
  strings: { type: [Number, String], default: 6 },
  frets: { type: [Number, String], default: 12 },
  fretWidth: { type: Number, default: FretSettings.FRET_DOT_SIZE },
})


const state = useMyDevGuiStore()
const fretboard = ref(new Fretboard())
const showImage = ref(false)
const fretCount = computed(() => Number(fretboard.value.frets()))
const stringCount = computed(() => Number(fretboard.value.strings()))

const fretTemplate = computed(() => {
  let fretSpacingCss = fretSpacing
    .map((space) => `minmax(10px, ${space}fr)`)
    .join(' ')
  return {
    gridTemplateColumns: fretSpacingCss,
    gidTemplateRows: 'auto',
  }
})

const stringTemplate = computed(() => {
  return {
    gridTemplateColumns: 'auto',
    gidTemplateRows: `repeat(${stringCount}, 1fr)`,
  }
})

const fretboardSize = computed(() => {
  return {
    height: useToCssPixels(FretboardSettings.MAX_HEIGHT).value,
  }
})

onBeforeMount(() => {})
</script>

<style lang="sass"></style>

~/model/Fretboard~/model/settings
~/models/fretboard/Fretboard~/models/fretboard/settings
