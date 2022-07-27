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
    <PostList :list="postList"/>
    <button class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-100">Load more</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ColumnDetailView',
  components: { PostList },
  setup () {
    const route = useRoute()
    const store = useStore()

    const currentId = +route.params.id
    const column = computed(() => store.getters.getColumnById(currentId))
    const postList = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      postList
    }
  }
})
</script>

<style scoped>

</style>
