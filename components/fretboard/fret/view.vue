<template>
  <div class="cursor-pointer fret-container" :style="[sizeStyle, bgStyle]"  @click.prevent="leftClick()">
    <div class="fret-background fret-content" :style="[sizeStyle]"></div>
    <transition name="show-fret">
      <fretboard-fret-dot class="fret-content" v-if="dotVisible" ></fretboard-fret-dot>    
    </transition>
    
  </div>
</template>

<script lang="ts" setup>
// FRET VIEW COMPONENT
// BAse component for fret in fretboard
// Is composed by the base fret square and
// the display dot.

import type { PropType } from 'vue';
import { type FretInterface } from '~/classes/Fret'


const props = defineProps({
  tone: { type: Number, default: 0 }, //Must be a unmutable value
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  dotSize: { type: Number, default: 30 },
  image: { type: String || null, default: null },
  fretData: { type: Object as PropType<FretInterface>, required: true}
})


const dotColor = ref('#ff0')
const dotOutlineColor = ref('#00f')
const dotDecoration = ref()

const dotVisible = ref(props.fretData.visible)
const contentSize = computed(() => {
  const image = new Image()
  image.src = `/img/${props.image}.png`

  const size = Math.max(image.naturalWidth, image.naturalHeight, props.dotSize)
  console.log(image.naturalWidth, image.naturalHeight, props.dotSize)
  return Math.max(image.naturalWidth, image.naturalHeight, props.dotSize)
})

const displayTone = computed(() => {
  return props.tone
})

// COMPUTED STYLES:

const bgStyle = computed(() => {
  return{
    backgroundColor: 'red',
    border: '1px solid blue'
  }
} )

const sizeStyle = computed(() => {
  return {
    width: 'auto',
    height: 'auto'
    // width: useToCssPixels(props.width).value,
    // height: useToCssPixels(props.height).value,
    // border: '4px solid blue'
  }
})


// LIFECYCLE HOOKS:
// onMounted(() => {
//   console.log(props.fretData)
// })

// METHODS:
const leftClick = () => {
  props.fretData.visible = !props.fretData.visible
  dotVisible.value = props.fretData.visible
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


<!-- <template>
  <div style="display: grid">
    <div class="celda-tiene-tamaño">
      <div clss="hijo"></div>
    </div>
  </div>

</template> -->
