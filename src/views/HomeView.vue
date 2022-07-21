<template>
  <div class="container">
    <ColumnList :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'Kolumn Example',
    description: 'lorem ipsum dolor sit amet'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'Kolumn Example',
    description: 'lorem ipsum dolor sit amet',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'Kolumn Example',
    description: 'lorem ipsum dolor sit amet'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }, {
    id: 4,
    title: 'Kolumn Example',
    description: 'lorem ipsum dolor sit amet',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
export default defineComponent({
  name: 'HomeView',
  components: {
    ColumnList
  },
  setup () {
    return {
      list: testData
    }
  }

})
</script>
