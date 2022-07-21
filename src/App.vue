<template>
  <GlobalHeader :user="userTest"/>
  <router-view/>
  <GlobalFooter/>
</template>

<style>

</style>
<script lang="ts">
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'

export default {
  components: { GlobalFooter, GlobalHeader },
  setup () {
    const userTest: UserProps = {
      id: 1,
      isLogin: true,
      name: 'Simon'
    }

    return {
      userTest
    }
  }
}
</script>
