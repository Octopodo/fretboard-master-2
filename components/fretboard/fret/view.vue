<template>
  <div class="relative inline-block cursor-pointer">
    <div class="fret" :style="fretStyle" @click.prevent="setVisible()"></div>
    <transition name="show-fret">
      <fretboard-fret-dot v-if="visible" @click.prevent="leftClick()"></fretboard-fret-dot>    
    </transition>
    
  </div>
</template>

<script lang="ts" setup>
// FRET VIEW COMPONENT
// BAse component for fret in fretboard
// Is composed by the base fret square and
// the display dot.

const props = defineProps({
  tone: { type: Number, default: 0 }, //Must be a unmutable value
  width: { type: Number, default: 100 },
  height: { type: Number, default: 100 },
  dotSize: { type: Number, default: 30 },
  image: { type: String || null, default: null },
})

const visible = ref(true)
const dotColor = ref('#ff0')
const dotOutlineColor = ref('#00f')
const dotDecoration = ref()

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


const fretStyle = computed(() => {
  return {
    width: useToCssPixels(props.width).value,
    height: useToCssPixels(props.height).value,
    border: '4px solid blue'
  }
})


// METHODS:
const leftClick = () => {
  visible.value = !visible.value
}

const setVisible = () => {
  visible.value = !visible.value
}
</script>

<style lang="sass" scoped>


.fret
  position: relative
  background-color: red
</style>
