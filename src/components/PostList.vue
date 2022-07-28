<template>
  <div class="PostList">
    <article v-for="post in posts" :key="post._id" class="card mb-3 shadow-sm">
      <div class="card-body">
        <div class="h4">
          {{ post.title }}
        </div>
        <div class="row my-3 align-items-center">
          <div v-if="post.image" class="col-4">
            <img :src="post.image.fitUrl" :alt="post.title" class="rounded w-100">
          </div>
          <p :class="{'col-8': post.image}" class="text-muted">{{ post.excerpt }}</p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ImageProps, PostProps } from '@/store/types'
import { generateFitUrl } from '@/libs/helper'

export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    return {
      posts
    }
  }
})
</script>

<style lang="less" scoped>

</style>
