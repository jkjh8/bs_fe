import { socket } from 'boot/socketio'

export default function useSocket() {
  const initSocketFn = () => {
    socket.on('connect', () => {
      console.log(`connecting to socket.io id=${socket.id}`)
    })
  }
  return { initSocketFn }
}
