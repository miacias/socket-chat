import { io } from "socket.io-client";

const socket = io();
// const socket = io("http://localhost:3001");

// function saveName() {
//   const username = document.getElementById('username').value.trim();
//   localStorage.setItem('socketName', username);
// }
const roomCreateBtn = document.querySelector('#room-create-btn');

const createRoom = async () => {
  const newRoom = {
    name: document.getElementById('room-name').value.trim(),
    password: document.getElementById('room-password').value.trim(),
    admin_id: req.session.userId,
  }
  const response = await fetch('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(newRoom),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    socket.emit('createRoom', newRoom.name);
    document.location.replace(`/rooms/${newRoom.id}`);
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
