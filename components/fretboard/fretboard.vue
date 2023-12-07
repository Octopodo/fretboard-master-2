<template>
  <div class="fretboard-container">
    <NuxtImg
      src="/img/fretboards/fretboard_wood.png"
      class="fretboard-image"
    ></NuxtImg>
    <div class="fretboard" :style="[stringTemplate, fretboardSize]">
      <div class="string" :style="fretTemplate" v-for="str in fretboard.matrix">
        <fretboard-fret-view
          v-for="fret in str"
          :fretData="fret"
          @user-clicked-fret="(str, fret) => fretboard.setVisible(str, fret)"
        ></fretboard-fret-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMyFretboardStore } from '~/stores/FretboardStore'
import { fretSpacing } from '~/constants/fret-proportions'
import { Fretboard } from '~/models/fretboard/Fretboard'
import { FretboardSettings, FretSettings } from '~/models/settings'

const props = defineProps({
  strings: { type: [Number, String], default: 6 },
  frets: { type: [Number, String], default: 12 },
  fretWidth: { type: Number, default: FretSettings.FRET_DOT_SIZE },
})

const fretCount = computed(() => Number(props.frets))
const stringCount = computed(() => Number(props.strings))
const state = useMyFretboardStore()
const fretboard = ref(new Fretboard(stringCount.value, fretCount.value))

fretboard.value.createMatrix(stringCount.value, fretCount.value)

const fretTemplate = computed(() => {
  let fretSpacingCss = fretSpacing
    .map((space) => `minmax(10px, ${space}fr)`)
    .join(' ')
  console.log(fretSpacingCss)
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
