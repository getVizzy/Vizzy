let roomGenerator = 0


module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new changes', function(data) {
      socket.broadcast.emit('receive code', data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('createRoom', (roomKey, userName) => {
      const newRoom = `room:${roomKey}`
      const participant = userName
      socket.join(newRoom)
      socket.emit(`success, ${participant} has created and joined ${newRoom}`)
    })

    socket.on('joinRoom', (roomKey, userName) => {
      const newRoom = `room:${roomKey}`
      const participant = userName
      socket.join(roomKey)
      socket.emit(`success, ${participant} has joined ${newRoom}`)
    })
  })
}
