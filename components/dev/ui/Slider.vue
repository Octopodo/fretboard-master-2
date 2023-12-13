<template>
  <div class="slider-container">
    <div class="label-container">
      <label :for="name" class="inline dev-label mt-2"> {{ name }} </label >
      <label :for="name" class="inline absolute dev-label dev-label-value ">{{ modelValue }}</label>
    </div>
    
    <input 
      type="range" 
      :name="name" 
      :min="min" 
      :max="max" 
      :valueAsNumber="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
      ref="slider"
    >
  </div>
</template>

<script lang="ts" setup>
const slider = ref()

const props = defineProps({
  name: { type: String, required: true},
  modelValue: { type:  Number},
  max: { type: [String, Number], default: 100},
  min: { type: [String, Number], default: 0}
})

onMounted(() => {
  slider.value.defaultValue = props.modelValue
}) 
</script>

<style lang="sass">
.dev-label
  color: rgb(255 255 255)

.dev-label-value
  right: 12%
  // position: relative
.slider-container
  width: 50%
  position: relative
</style>