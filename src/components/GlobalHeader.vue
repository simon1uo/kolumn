<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link to="/" class="logo flex-column">
        <div class="navbar-brand">ð Kolumn</div>
        <div class="h6 text-white">â³ï¸ a knowledge column</div>
      </router-link>

      <ul v-if="!user.isLogin" class="list-inline mb-0">
        <li class="list-inline-item">
          <router-link to="/login" class="btn btn-outline-light my-2">Log In</router-link>
        </li>
        <li class="list-inline-item">
          <router-link to="/signup" class="btn btn-outline-light my-2">Sign Up</router-link>
        </li>
      </ul>
      <ul v-else class="list-inline mb-0">
        <li class="list-inline-item">
          <DropdownMenu :title="`Hiðð» ${user.nickName}`">
            <DropdownItem><router-link to="/create" class="dropdown-item">New Post</router-link></DropdownItem>
            <DropdownItem><router-link :to="`/column/${user.column}`" class="dropdown-item">My Column</router-link></DropdownItem>
            <DropdownItem disabled><router-link to="/" class="dropdown-item text-muted">Edit Profile</router-link></DropdownItem>
            <DropdownItem><a href="#" class="dropdown-item" @click.prevent="handleLogout">Logout</a></DropdownItem>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import DropdownMenu from '@/base/DropdownMenu.vue'
import DropdownItem from '@/base/DropdownItem.vue'
import { UserProps } from '@/store/types'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'GlobalHeader',
  components: { DropdownMenu, DropdownItem },

  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      router.push('/')
    }
    return {
      handleLogout
    }
  }
})
</script>

<style scoped>
.logo:hover {
  text-decoration: none;
}
</style>
