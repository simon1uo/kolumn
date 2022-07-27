<template>
  <GlobalHeader :user="currentUser"/>
  <router-view/>
  <GlobalFooter/>
</template>

<style>

</style>
<script lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: { GlobalFooter, GlobalHeader },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    return {
      currentUser
    }
  }
}
</script>
