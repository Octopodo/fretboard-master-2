<template>
  <nav class="dev-controls-container">
    <div class="ml-4">
      <dev-ui-slider name="Strings" :min="0" :max="store.maxStrings" v-model="store.stringCount"></dev-ui-slider>
      <dev-ui-slider name="Frets" :min="0" :max="store.maxFrets" v-model="store.fretCount"></dev-ui-slider>
      
    </div>
    
  </nav>
</template>

<script lang="ts" setup>
import { useMyDevGuiStore } from '~/stores/DevGui'
const store = useMyDevGuiStore()
store

</script>

<style lang="sass">
.dev-controls-container
  background-color: rgb( 0 0 0 / 80%)
  width: 300px
  height: 100%
  right: 0
  diplay: block
  position: fixed
  user-select: none

.oprions-panel-in
  width: 300px
  transition: width 0.2s

.options-panel-out
  width: 0
  transition: width 0.2s
</style>