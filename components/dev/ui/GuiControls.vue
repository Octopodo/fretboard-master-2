<template>
  <div class="dev-controls-container">
    <input type="range" name="strings" :min="0" :max="store.maxStrings">
    <input type="range" name="frets" :min="0" :max="store.maxFrets">
  </div>
</template>

<script lang="ts" setup>
import { useMyDevGuiStore } from '~/stores/DevGui'
const store = useMyDevGuiStore()
store

</script>

<style lang="sass">
.dev-controls-container
  background-color: rgb( 0 0 0 / 50%)
</style>