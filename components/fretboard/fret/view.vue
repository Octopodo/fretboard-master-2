<template>
  <div class="relative">
    <div class="fret-flex-container absolute">
      <div class="fret" :style="fretStyle" @click.prevent="setVisible()"></div>
      <transition name="scale-transition">
        <fretboard-fret-dot></fretboard-fret-dot>    
      </transition>
  
    </div>
    
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

const setVisible = () => {
  visible.value = !visible.value
}
</script>

<style lang="sass" scoped>
.fret-flex-container
  display: flex
  align-items: center
  justify-content: center

fret-container
  position: relative

.fret
  position: absolute
  background-color: red
  display: flex
  align-items: center
  justify-content: center


.scale-transition-enter-active
  transition: all .1s ease-in

.scale-transition-leave-active
  transition: all .2s ease-in


.scale-transition-enter-from,
.scale-transition-leave-to
  transform: scale(0)
</style>
