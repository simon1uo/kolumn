<template>
  <div class="container">
    <div class="h4">Create Post</div>
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
import ValidateForm from '@/base/ValidateForm.vue'
import ValidateInput from '@/base/ValidateInput.vue'
import { PostProps, RulesProp } from '@/store/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CreatePostView',
  components: {
    ValidateForm, ValidateInput
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
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: postContentVal.value,
            createdAt: new Date().toLocaleString(),
            columnId
          }

          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      titleVal,
      titleRules,
      postContentVal,
      postContentRules,
      onFormSubmit
    }
  }
})
</script>

<style lang="less" scoped>

</style>
