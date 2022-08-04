<template>
  <div class="container">
    <section class="text-center">
      <div class="h4">Feel free to write</div>
      <img src="../assets/write.svg" alt="" class="w-50">
      <p>
        <router-link to="/create" class="btn btn-primary d-block w-25 mx-auto my-4">Write Something ✍🏻</router-link>
      </p>
    </section>
    <ColumnList :list="list"/>
    <button v-if="!isLastPage" class="btn btn-outline-primary mt-2 mb-5 mx-auto d-block w-25" @click="loadMorePage">Load
      More
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { useStore } from 'vuex'
import useLoadMore from '@/hooks/useLoadMore'

export default defineComponent({
  name: 'HomeView',
  components: {
    ColumnList
  },
  setup () {
    const store = useStore()
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)

    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 3 })
    })

    const list = computed(() => store.getters.getColumns())
    const { loadMorePage, isLastPage } = useLoadMore('fetchColumns', total, {
      pageSize: 3,
      currentPage: currentPage.value ? currentPage.value + 1 : 2
    })

    return {
      list,
      loadMorePage,
      isLastPage
    }
  }

})
</script>
