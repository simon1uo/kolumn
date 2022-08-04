import { computed, ComputedRef, ref } from 'vue'
import { useStore } from 'vuex'

interface LoadParams {
  currentPage: number
  pageSize: number
}

const useLoadMore = (actionName: string, total: ComputedRef<number>, params: LoadParams = { currentPage: 2, pageSize: 5 }) => {
  const store = useStore()
  const currentPage = ref(params.currentPage) // 每次加载后会发生变化所以响应式
  const requestParams = {
    currentPage: currentPage.value,
    pageSize: params.pageSize
  }

  const loadMorePage = () => {
    store.dispatch(actionName, requestParams).then(() => {
      currentPage.value++
    })
  }

  const isLastPage = computed(() => {
    return Math.ceil(total.value / params.pageSize) < currentPage.value
  })

  return {
    loadMorePage,
    isLastPage,
    currentPage
  }
}

export default useLoadMore
