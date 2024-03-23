import { boot } from 'quasar/wrappers'
import { io } from 'socket.io-client'
import { qsys, qsysAll, fnUpdateZoneStatus, fnUpdateDevice } from 'composables/qsys/useQsys.js'
let socket

export default boot(({ app }) => {
  const url = process.env.NODE_ENV === 'production' ? '/client' : 'https://192.168.1.70:3443/client'
  socket = io(url, {
    secure: true,
    // reconnectionDelayMax: 5000,
    // rejectUnauthorized: false,
    // recognitionUnauthorized: false,
    // transports: ['websocket'],
    // autoConnect: true,
    withCredentials: true
  })

  socket.on('connect', () => {
    console.log(`connected socket.io id=${socket.id}`)
  })
  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })

  socket.on('disconnect', () => {
    console.log(`disconnect to socket.io id=${socket.id}`)
  })

  socket.on('qsys:devices', (args) => {
    qsys.value = args
  })

  socket.on('qsys:device', (args) => {
    fnUpdateDevice(args.deviceId, args.data)
  })

  app.config.globalProperties.$socket = socket
})

export { socket }
