<template>
  <div class="container">
    <div class="h4">Create Post</div>
    <ValidateUpload action="/api/upload"
                    class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
                    :before-upload="beforeUpload"
                    @file-uploaded-success="onFileUploadedSuccess"
                    @file-uploaded-error="onFileUploadedError">
      <div class="h4">Upload you post cover images 🚀</div>

      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading ... </span>
          </div>
          <div class="h4 mx-2">Uploading ...</div>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url" alt="post-cover"/>
          <div class="h4">Upload success, click to re-upload.</div>
        </div>
      </template>

    </ValidateUpload>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Post Title: </label>
        <ValidateInput type="text"
                       id="title"
                       placeholder="Please input post title:"
                       :rules="titleRules"
                       v-model="titleVal"/>
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">Post Content: </label>
        <ValidateInput rows="10"
                       tag="textarea"
                       placeholder="Please input post content ... "
                       :rules="postContentRules"
                       v-model="postContentVal"/>
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">Submit Post</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import ValidateForm from '@/base/ValidateForm.vue'
import ValidateInput from '@/base/ValidateInput.vue'
import ValidateUpload from '@/base/ValidateUpload.vue'
import createMessage from '@/base/createMessage'

import { ImageProps, PostProps, RulesProp, ResponseType } from '@/store/types'

export default defineComponent({
  name: 'CreatePostView',
  components: {
    ValidateUpload,
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: 'Post title cannot be empty' }
    ]

    const postContentVal = ref('')
    const postContentRules: RulesProp = [
      { type: 'required', message: 'Post content cannot be empty' }
    ]

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            _id: new Date().getTime().toLocaleString(),
            title: titleVal.value,
            content: postContentVal.value,
            createdAt: new Date().toLocaleString(),
            column
          }

          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: column } })
        }
      }
    }

    const beforeUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        createMessage('上传的文件格式只能是jpg格式', 'error')
      }
      return isJPG
    }

    const onFileUploadedSuccess = (rawData: ResponseType<ImageProps>) => {
      createMessage(`Uploaded result ${rawData.data._id}`, 'success')
    }

    const onFileUploadedError = () => {
      createMessage('Upload Fail, please try again', 'error')
    }

    return {
      titleVal,
      titleRules,
      postContentVal,
      postContentRules,
      onFormSubmit,
      beforeUpload,
      onFileUploadedSuccess,
      onFileUploadedError
    }
  }
})
</script>

<style>
.file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}

.file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploaded-area {
  position: relative;
}

.uploaded-area .h4 {
  display: none;
  position: absolute;
  top: 50%;
  width: 100%;
  text-align: center;
  color: #999;
}

.uploaded-area:hover .h4 {
  display: block;
}

</style>
