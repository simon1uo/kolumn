<template>
  <div class="validate-input-container mb-3">
    <input v-if="tag !== 'textarea'"
           type="text"
           class="form-control"
           :class="{'is-invalid': inputRef.error}"
           :value="inputRef.value"
           @blur="validateInput"
           @input="updateValue"
           v-bind="$attrs"
    >
    <textarea v-else
              class="form-control"
              :class="{'is-invalid': inputRef.error}"
              :value="inputRef.value"
              @blur="validateInput"
              @input="updateValue"
              v-bind="$attrs"
    />

    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from '@/base/ValidateForm.vue'
import { RulesProp, TagType } from '@/store/types'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs: false,
  setup (props, context) {
    const inputRef = reactive({
      value: props.modelValue || '',
      error: false,
      message: ''
    })

    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch (rule.type) {
            case 'required':
              passed = (inputRef.value.trim() !== '')
              break
            case 'email':
              passed = emailReg.test(inputRef.value)
              break
            case 'range':
              if (rule.min && rule.max) {
                passed = (inputRef.value.trim().length >= rule.min && inputRef.value.trim().length <= rule.max)
              } else if (rule.min) {
                passed = (inputRef.value.trim().length >= rule.min)
              } else if (rule.max) {
                passed = (inputRef.value.trim().length <= rule.max)
              }
              break
            case 'validator':
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.value = targetValue
      context.emit('update:modelValue', targetValue)
    }

    const clearValue = () => {
      inputRef.value = ''
      inputRef.message = ''
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })

    return {
      inputRef,
      validateInput,
      updateValue,
      clearValue
    }
  }
})
</script>

<style lang="less" scoped>

</style>
