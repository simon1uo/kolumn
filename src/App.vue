<template>
  <div id="app">
    <GlobalHeader :user="userTest"/>
    <router-view/>
  </div>
</template>

<style>

</style>
<script lang="ts">
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
export default {
  components: { GlobalHeader },
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
