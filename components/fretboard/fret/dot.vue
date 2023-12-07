<template>
  <div class="fret-dot-container" :style="[sizeStyle]">
    <!-- DECORATION: Any fret decoration like shadows, lights, etc... -->
    <NuxtImg
      ref="decoration"
      class="fret-dot-content absolute"
      v-if="showDecoration"
      :src="decorationImagePath"
    />

    <!-- DOT: The base dot by css. Can live with image -->
    <div
      ref="dot absolute"
      :class="dotClass"
      :style="[dotStyle, sizeStyle]"
      v-if="showDot"
    ></div>

    <!-- IMAGE: The fret image itself -->
    <div v-for="path in paths">
      <NuxtImg
        ref="image absolute"
        class="fret-dot-content"
        v-if="showImage"
        :src="path"
      />
    </div>

    <!-- CONTENT: The content of the fret, normaly the note  -->
    <slot></slot>
    <h4
      :style="contentStyle"
      class="cursor-pointer select-none fret-dot-content"
    >
      {{ displayNote }}
    </h4>
    <!-- SELECTED: The selection Image  -->
    <NuxtImg
      ref="selectedImage absolute"
      class="fret-dot-content"
      v-if="selected"
      :src="selectionImagePath"
    />
  </div>
</template>

<script lang="ts" setup>
// FRETBOARD FRET DOT:
// Component to manage the dot visualization

// REFS:
const decoration = ref(null)
const dot = ref(null)
const image = ref(null)
const selectedImage = ref(null)
// const visible = ref(true)

// const viewStore = useFretViewStore() //<-----------Todo

// INPUT PROPS:
const props = defineProps({
  borderWidth: { type: Number, default: 4 },
  dotBorderColor: { type: String, default: 'sky-950' },
  dotColor: { type: String, default: 'sky-600' },
  dotSelectedColor: { type: String, default: 'red-600' },
  fretId: { type: Number, default: 0 },
  height: { type: Number || String, default: 25 },
  tone: { type: undefined },
  hideDecoration: Boolean,
  hideDot: Boolean,
  hideImage: Boolean,
  selected: { type: Boolean, default: true },
  src: { type: String || null, default: null },
  text: null,
  width: { type: Number || String, default: 25 },
})

// COMPUTED PROPETIES:
// All the states will be changed on fretboard level
// TODO:
const width = computed(() => {
  return props.width
})
const height = computed(() => {
  return props.height
})
const contentStyle = computed(() => {
  return {}
})
const decorationImagePath = computed(() => {
  return ''
})
const displayNote = computed(() => {
  return props.tone
})
const dotClass = computed(
  () => `
  fret-dot 
  fret-dot-content
  cursor-pointer 
  bg-${props.dotColor} 
  border-${props.dotBorderColor} 
  ${selected ? 'border-' + props.dotSelectedColor : ''}`
)
const sizeStyle = computed(() => {
  return {
    width: useToCssPixels(width.value).value,
    height: useToCssPixels(height.value).value,
  }
})
const dotStyle = computed(() => {
  return {
    borderWidth: useToCssPixels(props.borderWidth).value,
    borderRadius: '50px',
  }
})

const imagePath = computed(() => {
  return ''
})
const paths = computed(() => {
  return ['']
})
const selected = computed(() => {
  return false
})
const selectionImagePath = computed(() => {
  return ''
})
const showDecoration = computed(() => {
  return false
})
const showDot = computed(() => {
  return true
})
const showImage = computed(() => {
  return false
})

//METHODS
const leftClick = () => {}

const shiftClick = () => {}
</script>

<style lang="sass" scoped>

dot-content
  display: grid
  place-content: center
  // self-align: center
  position: absolute
</style>
