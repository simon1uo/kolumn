<template>
  <div class="container">
    <div class="h4">{{ isEditMode ? "✍🏻 Edit Post" : "✍🏻 Create Post" }}</div>
    <ValidateUpload action="/api/upload"
                    class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
                    :before-upload="beforeUpload"
                    :uploaded="uploadedData"
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
        <button class="btn btn-primary btn-large">{{ isEditMode ? "✍🏻 Update Post" : "✍🏻 Submit Post" }}</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import ValidateForm from '@/base/ValidateForm.vue'
import ValidateInput from '@/base/ValidateInput.vue'
import ValidateUpload from '@/base/ValidateUpload.vue'
import createMessage from '@/base/createMessage'

import { ImageProps, PostProps, RulesProp, ResponseType } from '@/store/types'
import { beforeUploadCheck } from '@/libs/helper'

export default defineComponent({
  name: 'CreatePostView',
  components: {
    ValidateUpload,
    ValidateForm,
    ValidateInput
  },
  setup () {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const queryId = route.query.id
    const isEditMode = !!queryId

    onMounted(() => {
      if (queryId) {
        store.dispatch('fetchPost', queryId).then((data: ResponseType<PostProps>) => {
          const currentPost = data.data
          console.log(currentPost)
          const { image, title, content } = currentPost
          titleVal.value = title
          postContentVal.value = content || ''
          if (image) {
            uploadedData.value = { data: image }
          }
        })
      }
    })

    const titleVal = ref('')
    const titleRules: RulesProp = [
      { type: 'required', message: 'Post title cannot be empty' }
    ]

    const postContentVal = ref('')
    const postContentRules: RulesProp = [
      { type: 'required', message: 'Post content cannot be empty' }
    ]

    const uploadedData = ref()
    let imageId = ''

    const beforeUpload = (file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('The format of file you upload can only be .jpeg or .png', 'error')
      } else if (error === 'size') {
        createMessage('The size of file you upload can only be under 1MB', 'error')
      }
      return passed
    }

    const onFileUploadedSuccess = (rawData: ResponseType<ImageProps>) => {
      createMessage(`Uploaded result ${rawData.data._id}`, 'success')
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }

    const onFileUploadedError = () => {
      createMessage('Upload Fail, please try again', 'error')
    }

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: postContentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }

          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode
            ? {
                id: queryId,
                payload: newPost
              }
            : newPost

          store.dispatch(actionName, sendData).then(() => {
            createMessage('The post has submitted successfully. you will jump to post after 2s', 'success', 2000)
            setTimeout(() => {
              router.push({
                name: 'column',
                params: {
                  id: column
                }
              })
            }, 2000)
          })
        }
      }
    }

    return {
      isEditMode,
      titleVal,
      titleRules,
      postContentVal,
      postContentRules,
      onFormSubmit,
      beforeUpload,
      uploadedData,
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
