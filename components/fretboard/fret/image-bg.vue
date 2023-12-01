<template>
  <div class="fret-img">
    <img :src="image" alt="" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
// FRET BACKGROUND COMPONENT
// This component will handle the background style for
// fret dot. The img will be loaded from the server in the future

import fs from 'node:fs/promises'

const props = defineProps({
  src: { type: String },
  width: { type: Number || String || null, default: null }
})

const image = computed(() => {
  return getSources()
})

const imageStyle = computed(() => {
  return {
    width: props.width !== null ? useToCssPixels(useToNumber(props.width)).value : 'intrinsicWidth'  
  }
})

const getSources = () => {
  const filesPath = `/img/${props.src}.png`
  return filesPath
}
</script>

<style lang="sass" scoped>
.fret-img
  position: absolute
  top: 0
  left: 0
  max-width: intrinsicWidth
  </style>
