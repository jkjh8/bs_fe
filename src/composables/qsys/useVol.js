import { socket } from 'boot/socketio.js'
import { qsys } from './useQsys.js'
import { gainStep } from '../useServer.js'

const fnVolumeUp = (deviceId, zone) => {
  let current =
    qsys.value[qsys.value.findIndex((e) => e.deviceId === deviceId)].ZoneStatus[zone - 1].gain

  current += gainStep.value

  if (current > 0) {
    current = 0
  }

  qsys.value[qsys.value.findIndex((e) => e.deviceId === deviceId)].ZoneStatus[zone - 1].gain =
    current

  socket.emit('qsys:volume', { deviceId, zone, value: current })
}

const fnVolumeDn = (deviceId, zone) => {
  let current =
    qsys.value[qsys.value.findIndex((e) => e.deviceId === deviceId)].ZoneStatus[zone - 1].gain

  current -= gainStep.value

  if (current < -100) {
    current = -100
  }

  qsys.value[qsys.value.findIndex((e) => e.deviceId === deviceId)].ZoneStatus[zone - 1].gain =
    current

  socket.emit('qsys:volume', { deviceId, zone, value: current })
}

const fnMute = (deviceId, zone, value) => {
  qsys.value[qsys.value.findIndex((e) => e.deviceId === deviceId)].ZoneStatus[zone - 1].mute = value

  socket.emit('qsys:mute', { deviceId, zone, value })
}

export { fnVolumeUp, fnVolumeDn, fnMute }
