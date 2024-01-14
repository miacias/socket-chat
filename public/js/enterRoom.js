// const socket = io(`ws://localhost:3000`);
const socket = io();
// const socket = io("http://localhost:3000");
const createRoomForm = document.getElementById('create-room');
const joinRoomForm = document.getElementById('join-room');

const createRoom = async (event) => {
  event.preventDefault();
  const newRoom = {
    name: document.getElementById('room-name').value.trim(),
    password: document.getElementById('room-password').value.trim(),
    adminId: document.getElementById('user').getAttribute('data-user'),
  }
  if (newRoom.name && newRoom.password && newRoom.password.length >= 8) {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify(newRoom),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      const createdRoom = await response.json();
      await socket.emit('createRoom', createdRoom.name);
      document.location.replace(`/rooms/${createdRoom.id}`);
    } else {
      alert('Failed to create room.');
      // document.location.replace('/');
    }
  } else {
    alert('Fill in all fields. Password must be 8+ characters.')
  }
};

const joinRoom = async (event) => {
  event.preventDefault();
  const joinRoom = {
    userId: document.getElementById('user').getAttribute('data-user'),
    roomId: document.getElementById('invite-code').value.trim(),
    password: document.getElementById('invite-password').value.trim(),
  }
  const response = await fetch(`/api/rooms/${joinRoom.roomId}`, {
    method: 'PUT',
    body: JSON.stringify(joinRoom),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    document.location.replace(`/rooms/${joinRoom.roomId}`);
  } else {
    alert('Failed to join room. Check your rooms list.')
  }
}

// function sendMessage() {
//   const message = document.getElementById('msg-input').value;
//   const room = document.getElementById('roomInput').value;
//   socket.emit('sendMessage', { message, room });
// }

// socket.on('message', (message) => {
//   const ul = document.getElementById('messages');
//   const li = document.createElement('li');
//   li.appendChild(document.createTextNode(message));
//   ul.appendChild(li);
// });

createRoomForm.addEventListener('submit', createRoom);
joinRoomForm.addEventListener('submit', joinRoom);
