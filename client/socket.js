import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Connected!')
  }
})

export default socket
