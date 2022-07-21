<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link to="/" class="logo flex-column">
        <div class="navbar-brand">📚 Kolumn</div>
        <div class="h6 text-white">⛳️ a knowledge column</div>
      </router-link>

      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">SignIn</a></li>
        <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">Register</a></li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item"><DropdownMenu :title="`Hi👋🏻 ${user.name}`"/></li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropdownMenu from '@/components/DropdownMenu.vue'

export interface UserProps {
  isLogin: boolean
  id?: number
  name?: string
}

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
