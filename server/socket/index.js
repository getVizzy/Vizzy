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

    socket.on('leaveRoom', (roomKey, user) => {
      console.log('socketLeaveRoom', user)
      socket.to(roomKey).emit('receiveLeaveRoom', user)
      socket.leave(roomKey)
      console.log(`${user.email} has left ${roomKey}`)
    })

    socket.on('joinRoom', (roomKey, user) => {
      socket.join(roomKey)
      socket.to(roomKey).emit('receiveJoinRoom', user)
      socket.broadcast.emit('sendInitialDataRequest')
      console.log(`success, ${user.email} has joined ${roomKey}`)
    })

    socket.on('sendInitialData', initialData => {
      console.log('sendInitialData has been hit, server side')
      socket.broadcast.emit('receiveInitialData', initialData)
    })
    socket.on('newChanges', function(room, data) {
      socket.join(room)
      socket.to(room).emit('receiveCode', data)
    })

    socket.on('newMessages', function(room, message) {
      socket.to(room).emit('receiveMessage', message)
    })
  })
}
