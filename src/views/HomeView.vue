<template>
  <div class="container">
    <section class="text-center">
      <div class="h4">Feel free to write </div>
      <img src="../assets/write.svg" alt="" class="w-50">
      <p>
        <router-link to="/" class="btn btn-primary d-block w-25 mx-auto my-4">Write Something ✍🏻</router-link>
      </p>
    </section>
    <ColumnList :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList from '@/components/ColumnList.vue'
import { testColumns } from '@/store/testColumns'

export default defineComponent({
  name: 'HomeView',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testColumns
    }
  }

})
</script>
