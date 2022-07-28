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
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import { GlobalDataProps, ImageProps } from '@/store/types'
import MarkdownIt from 'markdown-it'
import UserProfile from '@/base/UserProfile.vue'

export default defineComponent({
  name: 'PostDetailView',
  components: { UserProfile },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentId = route.params.id

    onMounted(() => {
      store.dispatch('fetchPost', currentId)
      console.log(currentId)
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
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })

    return {
      currentPost,
      currentHTML,
      currentImageUrl
    }
  }
})
</script>

<style lang="less" scoped>

</style>
