<template>
  <div class="PostDetailView container">
    <article class="mb-5 pb-3">
      <img v-if="currentImageUrl" :src="currentImageUrl" class="rounded img-fluid my-2" :alt="currentPost.title">
      <div class="h3 my-2">{{ currentPost.title }}</div>
      <div class="post-profile row g-0 align-items-center border-top border-bottom my-4">
        <div class="col">
          <UserProfile :user="currentPost.author" v-if="typeof currentPost.author === 'object'"/>
        </div>
        <span class="col text-muted">{{ currentPost.createdAt }}</span>
      </div>

      <div v-html="currentHTML"></div>

      <div v-if="showEditArea" class="btn-group mt-5">
        <router-link class="btn btn-warning" :to="{name: 'create', query: {id: currentPost._id}}">Edit Post</router-link>
        <button type="button" class="btn btn-danger" @click.prevent="modalVisible = true">Delete Post</button>
      </div>
    </article>
    <ModalBox title="Delete Post" :visible="modalVisible" @modal-on-close="modalVisible = false" @modal-on-confirm="deletePost">
      Are you sure to delete this post?
    </ModalBox>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

import MarkdownIt from 'markdown-it'

import UserProfile from '@/base/UserProfile.vue'
import ModalBox from '@/base/ModalBox.vue'
import { GlobalDataProps, ImageProps, PostProps, UserProps, ResponseType } from '@/store/types'
import createMessage from '@/base/createMessage'

export default defineComponent({
  name: 'PostDetailView',
  components: { ModalBox, UserProfile },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const router = useRouter()
    const currentId = route.params.id

    onMounted(() => {
      store.dispatch('fetchPost', currentId)
    })

    const mdi = new MarkdownIt()

    const currentPost = computed(() => store.getters.getCurrentPost(currentId))
    const currentHTML = computed(() => {
      const { content, isHTML } = currentPost.value
      if (currentPost.value && content) {
        return isHTML ? content : mdi.render(content)
      } else {
        return content
      }
    })

    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,h_300'
      } else {
        return null
      }
    })

    const showEditArea = computed(() => {
      const { isLogin, _id } = store.state.user
      if (currentPost.value && currentPost.value.author && isLogin) {
        const postAuthor = currentPost.value.author as UserProps
        return postAuthor._id === _id
      } else {
        return false
      }
    })

    const modalVisible = ref(false)
    const deletePost = () => {
      modalVisible.value = false
      store.dispatch('deletePost', currentId).then((data: ResponseType<PostProps>) => {
        createMessage('The post has been deleted successfully', 'success')
        setTimeout(() => {
          router.push(`/column/${store.state.user.column}`)
        }, 2000)
      })
    }
    return {
      currentPost,
      currentHTML,
      currentImageUrl,
      showEditArea,
      modalVisible,
      deletePost
    }
  }
})
</script>

<style scoped>

</style>
