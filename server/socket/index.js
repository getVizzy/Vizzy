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

    socket.on('leaveRoom', (roomKey, data) => {
      socket.join(roomKey)
      socket.to(roomKey).emit('receiveLeaveNotification', data)
      socket.leave(roomKey)
      // socket.emit(`${userName} has left ${roomKey}`)
      console.log(`${data} has left ${roomKey}`)
    })

    socket.on('joinRoom', (roomKey, userName) => {
      socket.join(roomKey)
      socket.emit(`success, ${userName} has joined ${roomKey}`)
      console.log(`success, ${userName} has joined ${roomKey}`)
    })

    // socket.on('joinNotification', (roomKey, userName) => {
    //   socket.join(roomKey)
    //   console.log('JOIN ROOM NOTIFICATION HITS')
    //   socket.to(roomKey).emit('receiveJoinNotification', userName)
    // })


    socket.on('newChanges', function (room, data) {
      // socket.broadcast.to(room).emit('receive code', data)
      console.log('socketroom', room)
      console.log('my emitted data', data)
      socket.join(room) //MUST HAVE JOIN!

      //updated from socket.broadcast.to to socket.to. Didn't notice a difference
      socket.to(room).emit('receiveCode', data)
    })

    // socket.on('new changes', function(data) {
    //   socket.broadcast.emit('receive code', data)
    // })
  })
}
