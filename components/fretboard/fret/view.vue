<template>
  <span class="fret cursor-pointer" :style="fretStyle" @click.prevent="setVisible()">
    <transition name="scale-transition">
      <div class="select-none fret-dot" :style=dotStyle v-if=visible>
        <fretboard-fret-image-bg
          v-if="image !== null"
          :src="props.image"
        ></fretboard-fret-image-bg>
        <div class="fret-dot-content">{{ displayTone }}</div>
      </div>
    </transition>
  </span>
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
  image: { type: String || null, default: 'fret-fire/fret-fire' },
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

const dotStyle = computed(() => {
  return {
    backgroundColor: dotColor.value,
    borderRadius: '50px',
    borderColor: dotOutlineColor.value,
    borderWidth: '3px',
    width: useToCssPixels(contentSize.value).value,
    height: useToCssPixels(contentSize.value).value,
  }
})

const fretStyle = computed(() => {
  return {
    width: useToCssPixels(props.width).value,
    height: useToCssPixels(props.height).value,
  }
})

const setVisible = () => {
  visible.value = !visible.value
}
</script>

<style lang="sass" scoped>
.fret-dot
  // position: absolute

  margin: auto
  display: flex
  align-items: center
  justify-content: center


.fret
  position: relative
  background-color: red
  display: flex
  align-items: center
  justify-content: center

.fret-dot-content
  position: relative
  margin: auto
  text-align: center

.scale-transition-enter-active
  transition: all .1s ease-in

.scale-transition-leave-active
  transition: all .2s ease-in


.scale-transition-enter-from,
.scale-transition-leave-to
  transform: scale(0)
</style>
