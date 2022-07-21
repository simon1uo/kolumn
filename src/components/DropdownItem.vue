<template>
  <li class="dropdown-option"
      :class="{'is-disabled': disabled}"
  >
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownItem',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
.dropdown-option.is-disabled {
  color: #a0afbd;
  pointer-events: none;
  background-color: transparent;
}
</style>
