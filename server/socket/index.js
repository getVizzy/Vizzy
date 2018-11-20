module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new changes', function(data) {
      socket.broadcast.emit('receive code', data)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })

    socket.on('room', function(data) {
      console.log("SOCKET", data.room)
      console.log("SOCKET USER JUST JOINED", data.user)

      socket.join(data.room)
    })
  })
}
