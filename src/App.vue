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
import { computed } from 'vue'

export default {
  components: { LoadingStatus, GlobalFooter, GlobalHeader },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      currentUser,
      isLoading
    }
  }
}
</script>
