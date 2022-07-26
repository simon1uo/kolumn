<template>
  <form class="validate-form">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt, { Emitter } from 'mitt'

type validateFunctionType = () => boolean
export const emitter: Emitter<any> = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['form-submit'],
  setup (props, context) {
    let validateFunctionArray: validateFunctionType[] = []

    const submitForm = () => {
      const result = validateFunctionArray.map(func => func()).every(result => result)
      context.emit('form-submit', result)
    }

    const callback = (func: validateFunctionType) => {
      validateFunctionArray.push(func)
    }

    emitter.on('form-item-created', callback)
    onUnmounted(() => {
      emitter.off('form-item-created')
      validateFunctionArray = []
    })
    return {
      submitForm
    }
  }
})
</script>

<style lang="less" scoped>

</style>
