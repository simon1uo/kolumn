<template>
  <div>
    <button class="btn btn-sm btn-primary" @click="triggerUpload">
      <span v-if="fileStatus === 'loading'">Uploading ... </span>
      <span v-if="fileStatus === 'success'">Upload success</span>
      <span v-else>Upload File</span>
    </button>
    <input type="file" name="file" id="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { axios } from '@/libs/http'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'ValidateUpload',
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

        // setTimeout(() => {
        //   console.log(formData)
        //   fileStatus.value = 'success'
        // })
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          fileStatus.value = 'success'
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
      handleFileChange
    }
  }
})
</script>

<style lang="less" scoped>

</style>
