<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  emits: ['update:modelValue'],
});
</script>
<template>
  <label v-if="label" class="d-block">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    :placeholder="label"
    @input="$emit('update:modelValue', $event.target.value)"
    class="field"
  >
</template>


<style scoped lang="scss">

</style>
