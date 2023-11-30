<template>
  <div
  :style="fretStyle"
  class="place-content-center"
  @click.prevent="toogleSelection"
  @contextmenu.prevent="toggleStyleMenu"
  >
  <transition name="scale-transition">
    <div
      v-if="visible"
      :style="[toneStyle]"
      class="place-content-center"
    >
    <div class="unselectable">
      {{ displayTone }}
    </div>

    </div>
  </transition>
    
  </div>
</template>

<script lang="ts" setup>

const store = useFretStore()
const visible = computed(()=>false)
const displayTone = computed(() => 'A3')
const decoration = computed(() => false)
const ghosted = computed(() => false)
const color = computed(() => '')
</script>

<style>

</style>