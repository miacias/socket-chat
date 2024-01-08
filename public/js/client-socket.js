import { io } from "socket.io-client";
// import { io } from "/socket.io-client/dist/socket.io.js";

const socket = io();
const createRoomForm = document.getElementById('create-room');
// const socket = io("http://localhost:3001");

// function saveName() {
//   const username = document.getElementById('username').value.trim();
//   localStorage.setItem('socketName', username);
// }

const createRoom = async (event) => {
  console.log('\x1b[92m hello createRoom in client-socket.js \x1b[0m')
  event.preventDefault();
  const newRoom = {
    name: document.getElementById('room-name').value.trim(),
    password: document.getElementById('room-password').value.trim(),
    admin_id: req.session.userId,
  }
  console.log(newRoom)
  debugger
  const response = await fetch('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(newRoom),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    socket.emit('createRoom', newRoom.name);
    // document.location.replace(`/rooms/${newRoom.id}`);
  } else {
    alert('Failed to create room.');
    document.location.replace('/');
  }
}

function sendMessage() {
  const message = document.getElementById('msg-input').value;
  const room = document.getElementById('roomInput').value;
  socket.emit('sendMessage', { message, room });
}

socket.on('message', (message) => {
  const ul = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  ul.appendChild(li);
});

roomCreateBtn.addEventListener('submit', createRoom);
