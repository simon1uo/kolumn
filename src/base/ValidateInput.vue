<template>
  <div class="validate-input-container mb-3">
    <input v-if="tag !== 'textarea'"
           type="text"
           class="form-control"
           :class="{'is-invalid': inputRef.error}"
           @blur="validateInput"
           v-bind="$attrs"
           v-model="inputRef.value"
    >
    <textarea v-else
              class="form-control"
              :class="{'is-invalid': inputRef.error}"
              @blur="validateInput"
              v-bind="$attrs"
              v-model="inputRef.value"
    />

    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, reactive } from 'vue'
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
      value: computed({
        get: () => props.modelValue || '',
        set: val => {
          context.emit('update:modelValue', val)
        }
      }),
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
      clearValue
    }
  }
})
</script>

<style lang="less" scoped>

</style>
