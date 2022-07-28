import { onUnmounted } from 'vue'

export default function (nodeId: string) {
  const node = document.createElement('div')
  node.id = nodeId
  document.body.appendChild(node)

  onUnmounted(() => {
    document.body.removeChild(node)
  })
}
