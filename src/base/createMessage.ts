import { createApp } from 'vue'
import { MessageType } from '@/store/types'
import MessageBox from '@/base/MessageBox.vue'

export default (message: string, type: MessageType, timeout = 2000) => {
  const messageInstance = createApp(MessageBox, {
    message,
    type
  })

  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  messageInstance.mount(mountNode)

  setTimeout(() => {
    messageInstance.unmount()
    document.body.removeChild(mountNode)
  }, timeout)
}
