<template>
  <GlobalHeader :user="currentUser"/>
  <router-view/>
  <GlobalFooter/>
  <LoadingStatus v-if="isLoading" text="Loading ... 😵‍💫" background="rgba(0, 0, 0, .8)"/>
</template>

<style>

</style>
<script lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import LoadingStatus from '@/base/LoadingStatus.vue'

import { useStore } from 'vuex'
import { axios } from '@/libs/http'
import { computed, onMounted } from 'vue'
import { GlobalDataProps } from '@/store/types'

export default {
  components: { LoadingStatus, GlobalFooter, GlobalHeader },
  setup () {
    const store = useStore<GlobalDataProps>()
    const isLoading = computed(() => store.state.loading)

    const currentUser = computed(() => store.state.user)
    const token = computed(() => store.state.token)

    onMounted(() => {
      if (!currentUser.value.isLogin && token.value) {
        axios.defaults.headers.common.Authorization = `Bearer ${token.value}`
        store.dispatch('fetchCurrentUser')
      }
    })
    return {
      currentUser,
      isLoading
    }
  }
}
</script>
