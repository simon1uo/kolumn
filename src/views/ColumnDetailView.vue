<template>
  <div class="container w-100">
    <div class="row mb-4 border-bottom pb-4 align-items-center" v-if="column">
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <div class="h4">{{ column.title }}</div>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <PostList :list="list"/>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-100">Load more</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { testColumns, testPost } from '@/store/testColumns'
import PostList from '@/components/PostList.vue'

export default defineComponent({
  name: 'ColumnDetailView',
  components: { PostList },
  setup () {
    const route = useRoute()
    const currentId = +route.params.id
    const column = testColumns.find(c => c.id === currentId)
    const list = testPost.filter(p => p.columnId === currentId)
    return {
      column,
      list
    }
  }
})
</script>

<style scoped>

</style>
