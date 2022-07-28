<template>
  <div class="UserProfile">
    <div class="d-flex align-items-center my-2">
      <img :src="user.avatar.fitUrl" :alt="user.nickName" class="rounded-circle img-thumbnail">
      <div class="mx-2">
        <div class="h6 d-block mb-0">{{ user.nickName }}</div>
        <span class="text-truncate text-muted d-block">{{ user.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserProps } from '@/store/types'
import { addAvatar } from '@/libs/helper'

export default defineComponent({
  name: 'UserProfile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    addAvatar(props.user, 50, 50)
    return {}
  }
})
</script>

<style lang="less" scoped>

</style>
