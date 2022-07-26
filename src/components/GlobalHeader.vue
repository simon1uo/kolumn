<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link to="/" class="logo flex-column">
        <div class="navbar-brand">📚 Kolumn</div>
        <div class="h6 text-white">⛳️ a knowledge column</div>
      </router-link>

      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item"><router-link to="login" class="btn btn-outline-light my-2">Log In</router-link></li>
        <li class="list-inline-item"><router-link to="signup" class="btn btn-outline-light my-2">Sign Up</router-link></li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item"><DropdownMenu :title="`Hi👋🏻 ${user.name}`"/></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropdownMenu from '@/base/DropdownMenu.vue'
import { UserProps } from '@/store/types'

export default defineComponent({
  name: 'GlobalHeader',
  components: { DropdownMenu },

  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
.logo:hover {
  text-decoration: none;
}
</style>
