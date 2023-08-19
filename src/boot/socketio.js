import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'

let socket

export default boot(({ app }) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? '/ui'
      : `http://${window.location.hostname}:3000/ui`
  socket = io(url, {
    reconnectionDelayMax: 5000,
    transports: ['websocket'],
    autoConnect: true,
    withCredentials: true
  })

  socket.on('connect', () => {
    console.log(`connected socket.io id=${socket.id}`)
  })

  socket.on('disconnect', () => {
    console.log(`disconnect to socket.io id=${socket.id}`)
  })

  app.config.globalProperties.$socket = socket
})

export { socket }
