<template>
  <teleport to="#message">
    <div class="alert message-info fixed-top w-50 mx-auto d-flex justify-content-between mt-3" :class="classObject">
      <span>{{ message }}</span>
      <button class="btn-close" type="button" data-bs-dismiss="alert" aria-label="Close" @click.prevent="close">
      </button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, PropType, ref } from 'vue'
import { MessageType } from '@/store/types'
import useDOMCreate from '@/hooks/useDOMCreate'

export default defineComponent({
  name: 'MessageBox',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    useDOMCreate('message')

    const isVisible = ref(true)
    const classObject = {
      'alert-success': props.type === 'success',
      'alert-danger': props.type === 'error',
      'alert-primary': props.type === 'default'
    }

    const close = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      classObject,
      close
    }
  }
})
</script>

<style lang="less" scoped>

</style>
