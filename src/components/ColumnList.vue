<template>
  <div class="row">
    <div class="h4 text-center mb-3">Explore Kolumn</div>
    <div class="col-4 mb-4" v-for="column in columnList" :key="column._id">
      <div class="card h-100 shadow-sm ">
        <div class="card-body text-center">
          <img class="card-img-top rounded-circle border border-light my-3" :src="column.avatar && column.avatar.url" :alt="column.title">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text"> {{ column.description }}</p>
          <router-link :to="`/column/${column._id}`" class="btn btn-outline-primary" href="#">More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { ColumnProps } from '@/store/types'
import { addAvatar } from '@/libs/helper'

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        addAvatar(column, 50, 50)
        return column
      })
    })

    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img{
  width: 50px;
  height: 50px;
}
</style>
