<template>
  <div class="fret-dot-container">
    <h4 :style="contentStyle">{{ displayNote }}</h4>
    <!-- DECORATION: Any fret decoration like shadows, lights, etc... -->
    <NuxtImg
      ref="decoration"
      class="fret-decoration"
      v-if="showDecoration"
      :src="decorationImagePath" 
    />
    
    <!-- DOT: The base dot by css. Can live with image -->
    <div
      ref="dot"
      :class="dotClass"
      :style="dotStyle"
      v-if="showDot"
    ></div>

    <!-- IMAGE: The fret image itself -->
    <NuxtImg
      ref="image"
      class="fret-dot"
      v-if="showImage"
      :src="imagePath" 
    />
    
    <!-- CONTENT: The content of the fret, normaly the note  -->
    <slot></slot>
    
    <!-- SELECTED: The selection Image  -->
    <NuxtImg
      ref="selectedImage"
      class="fret-selection"
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

// const viewStore = useFretViewStore() //<-----------Todo

// INPUT PROPS:
const props = defineProps({
  borderWidth: { type: Number, default: 4 },
  dotBorderColor: { type: String, default: 'sky-950' },
  dotColor: { type: String, default: 'sky-600' },
  dotSelectedColor: { type: String, default: 'red-600' },
  fretId: {type: Number, default: 0 },
  height: { type:Number || String , default: 50 },
  hideDecoration: Boolean,
  hideDot: Boolean,
  hideImage: Boolean,
  selected: { type: Boolean, default: true },
  src: { type: String || null, default: null },
  text: null,
  width: { type:Number || String , default: 50 },
})

// COMPUTED PROPETIES:
// All the states will be changed on fretboard level
// TODO: 
const width = computed(() => {return  props.width})
const height = computed(() => {return  props.height})
const contentStyle = computed (() => { 
  return {
    cursor: 'pointer',
    position: 'absolute',
    zIndex: 100,
    userSelect: 'none'
  }
})
const decorationImagePath = computed(()=> { return '' }) 
const displayNote = computed(() => { return 'A'})
const dotClass = computed(() => `
  fret-dot 
  cursor-pointer 
  bg-${props.dotColor} 
  border-${props.dotBorderColor} 
  ${selected ? 'border-' + props.dotSelectedColor : ''}`
)

const dotStyle = computed(() => { return {
  borderWidth: useToCssPixels(props.borderWidth).value,
  borderRadius: '50px',
  width:  useToCssPixels(width.value).value,
  height: useToCssPixels(height.value).value,
}})

const imagePath = computed(()=> { return '' }) 
const selected = computed(()=> { return false })
const selectionImagePath = computed(()=> { return '' }) 
const showDecoration = computed(()=> { return false })
const showDot = computed(()=> { return true })
const showImage = computed(()=> { return false })

//METHODS
const leftClick = () => {}
const rightClick = () => {}
const shiftClick = () => {}
</script>

<style lang="sass"  scoped>

.fret-dot-container
  display: flex
  align-items: center
  justify-content: center
  margin: auto
  // position: absolute
.fret-dot
  // position: absolute
  // margin: auto
  // display: flex
  // align-items: center
  // justify-content: center
  z-index: 1
</style>

