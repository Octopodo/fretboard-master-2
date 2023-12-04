<template>
  <div>
    <div v-for="gString in 6">
      a
    </div>
  </div>
string/temstrings>

<script lang="ts" setup>
import { useMyFretboardStore } from '~/stores/FretboardStore';

const frets = ref(22)
const stringCount = computed(() => {return 6})

const state = useMyFretboardStore()
</script>

<style>

</style>

