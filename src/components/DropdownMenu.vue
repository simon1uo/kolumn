<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen"> {{ title }} </a>
    <ul class="dropdown-menu" :style="{display: 'block'}" v-if="isOpen">
      <DropdownItem><a href="#" class="dropdown-item">New Post</a></DropdownItem>
      <DropdownItem disabled><a href="#" class="dropdown-item">Edit Profile</a></DropdownItem>
      <DropdownItem><a href="#" class="dropdown-item">Logout</a></DropdownItem>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import DropdownItem from '@/components/DropdownItem.vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'DropdownMenu',
  components: { DropdownItem },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef)
    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style lang="less" scoped>

</style>
