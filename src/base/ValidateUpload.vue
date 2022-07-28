<template>
  <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
    <slot v-if="fileStatus ==='loading'" name="loading">
      <button class="btn btn-primary btn-sm">Uploading</button>
    </slot>
    <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
      <button class="btn btn-primary btn-sm">Uploaded success</button>
    </slot>
    <slot v-else name="default">
      <button class="btn btn-primary btn-sm">Upload File</button>
    </slot>
  </div>
  <input type="file"
         name="file"
         id="file"
         class="file-input d-none"
         ref="fileInput"
         @change="handleFileChange">
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { axios } from '@/libs/http'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'ValidateUpload',
  inheritAttrs: false,
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  emits: ['file-uploaded-success', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>()
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()

    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }

    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      const files = currentTarget.files

      if (files) {
        const uploadFiles = Array.from(files)
        const uploadFile = uploadFiles[0]
        if (props.beforeUpload) {
          const result = props.beforeUpload(uploadFile)
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', uploadFile)

        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          fileStatus.value = 'success'
          uploadedData.value = res.data
          console.log(uploadedData.value)
          context.emit('file-uploaded-success', res.data)
        }).catch(err => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', err)
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style lang="less" scoped>

</style>
