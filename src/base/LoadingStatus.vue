<template>
  <teleport to="#loading">
    <div class="loading-container d-flex justify-content-center align-items-center h-100"
         :style="{'backgroundColor': background || ''}">
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden sr-only"> {{ text || 'Loading ... ' }}</span>
        </div>

        <p v-if="text" class="text-primary small"> {{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  name: 'LoadingStatus',
  props: {
    text: {
      type: String
    },
    background: {
      type: String
    }
  },
  setup () {
    const node = document.createElement('div')
    node.id = 'loading'
    document.body.appendChild(node)

    onUnmounted(() => {
      document.body.removeChild(node)
    })
  }
})
</script>

<style scoped>
.loading-container {
  background-color: rgba(255, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.loading-content {
  text-align: center;
}

</style>
