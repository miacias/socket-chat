import { io } from '../server.js';

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle room creation
  socket.on('createRoom', (roomName) => {
    socket.join(roomName);
    io.to(roomName).emit('message', `You joined ${roomName}`);
  });

  // Handle chat messages
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('message', data.message/*, socket.request.session*/);
  });
});

// export default io;