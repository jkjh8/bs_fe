import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'
import { useQsysStore } from 'src/stores/qsys'

let socket

export default boot(({ app }) => {
  const url =
    process.env.NODE_ENV === 'production'
      ? '/'
      : `http://${window.location.hostname}:3000`
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

  socket.on('qsys:data', (args) => {
    const data = JSON.parse(args)
    console.log(data)
    switch (data.key) {
      case 'connect':
      case 'devices':
        useQsysStore().updateQsysDevices(data.value)
        break
      case 'ZoneStatus':
        useQsysStore().updateQsysDevice(data.deviceId, data.ZoneStatus)
        break
    }
  })

  app.config.globalProperties.$socket = socket
})

export { socket }
