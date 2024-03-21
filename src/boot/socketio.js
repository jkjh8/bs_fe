import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'
import { qsys, qsysAll, fnUpdateZoneStatus } from 'composables/qsys/useQsys.js'
let socket

export default boot(({ app }) => {
  const url =
    process.env.NODE_ENV === 'production' ? '/clients' : 'http://192.168.1.70:3000/clients'
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

  socket.on('qsys:devices', (args) => {
    console.log('socket rt qsys:devices', args)
    qsys.value = args
  })

  socket.on('qsys:device', (args) => {
    console.log('socket rt qsys:device', args)
  })

  socket.on('qsys:data', (args) => {
    const data = JSON.parse(args)
    switch (data.key) {
      case 'connect':
      case 'devices':
        break
      case 'ZoneStatus':
        break
    }
  })

  socket.on('qsys:ZoneStatus', (args) => {
    try {
      const { deviceId, ZoneStatus } = args
      fnUpdateZoneStatus(deviceId, ZoneStatus)
    } catch (error) {
      console.error(error)
    }
  })

  app.config.globalProperties.$socket = socket
})

export { socket }
