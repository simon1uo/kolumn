<template>
  <div class="container w-100">
    <div class="row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar && column.avatar.fitUrl" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <div class="h4">{{ column.title }}</div>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="postList"/>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-100">Load more</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useStore } from 'vuex'
import { ColumnProps, PostProps } from '@/store/types'
import { addAvatar, generateFitUrl } from '@/libs/helper'

export default defineComponent({
  name: 'ColumnDetailView',
  components: { PostList },
  setup () {
    const store = useStore()

    const route = useRoute()
    const currentId = route.params.id

    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', currentId)
    })

    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps
      if (selectColumn) {
        addAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const postList = computed(() => store.getters.getPostsByCid(currentId) as PostProps[])
    return {
      column,
      postList
    }
  }
})
</script>

<style scoped>

</style>
