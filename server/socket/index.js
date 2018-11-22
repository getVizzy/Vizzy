let roomGenerator = 0

module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('createRoom', (roomKey, userName) => {
      socket.join(roomKey)
      socket.emit(`success, ${userName} has created and joined ${roomKey}`)
      console.log(`success, ${userName} has created and joined ${roomKey}`)
    })

    socket.on('leaveRoom', (roomKey, userName) => {
      socket.leave(roomKey)
      socket.emit(`${userName} has left ${roomKey}`)
      console.log(`${userName} has left ${roomKey}`)
    })

    socket.on('joinRoom', (roomKey, userName) => {
      socket.join(roomKey)
      socket.emit(`success, ${userName} has joined ${roomKey}`)
      console.log(`success, ${userName} has joined ${roomKey}`)
    })
    socket.on('newChanges', function(room, data) {
      // socket.broadcast.to(room).emit('receive code', data)
      console.log('socketroom', room)
      console.log('my emitted data', data)
      socket.join(room) //MUST HAVE JOIN!

      socket.broadcast.to(room).emit('receiveCode', data)
    })

    // socket.on('new changes', function(data) {
    //   socket.broadcast.emit('receive code', data)
    // })
  })
}
