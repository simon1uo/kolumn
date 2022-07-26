<template>
  <GlobalHeader :user="userTest"/>
  <router-view/>
  <GlobalFooter/>
</template>

<style>

</style>
<script lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { UserProps } from './store/types'

export default {
  components: { GlobalFooter, GlobalHeader },
  setup () {
    const userTest: UserProps = {
      id: 1,
      isLogin: false,
      name: 'Simon'
    }

    return {
      userTest
    }
  }
}
</script>
