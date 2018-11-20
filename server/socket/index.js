let roomGenerator = 0

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('createRoom', (roomKey, userName) => {
      const newRoom = `room:${roomKey}`
      socket.join(newRoom)
      socket.emit(`success, ${userName} has created and joined ${newRoom}`)
      console.log(`success, ${userName} has created and joined ${newRoom}`)
    })

    socket.on('joinRoom', (roomKey, userName) => {
      const newRoom = `room:${roomKey}`
      socket.join(roomKey)
      socket.emit(`success, ${userName} has joined ${newRoom}`)
      console.log(`success, ${userName} has joined ${newRoom}`)
    })
    socket.on('new changes', function (room, data) {
      // socket.broadcast.to(room).emit('receive code', data)
      console.log(room)
      console.log(data)
      socket.join(room) //MUST HAVE JOIN!

      socket.broadcast.to(room).emit('receive code', data)
    })

    // socket.on('new changes', function(data) {
    //   socket.broadcast.emit('receive code', data)
    // })
  })
}
