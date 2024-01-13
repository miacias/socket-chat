// const socket = io(`ws://localhost:3000`);
// const socket = io();
// const socket = io("http://localhost:3000");
const createRoomForm = document.getElementById('create-room');
const joinRoomForm = document.getElementById('join-room');

const createRoom = async (event) => {
  event.preventDefault();
  const newRoom = {
    name: document.getElementById('room-name').value.trim(),
    password: document.getElementById('room-password').value.trim(),
    adminId: document.getElementById('my-id').getAttribute('data-id'),
  }
  if (newRoom.name && newRoom.password && newRoom.password.length >= 8) {
    const response = await fetch('/api/rooms', {
      method: 'POST',
      body: JSON.stringify(newRoom),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      console.log('ok!')
      // socket.emit('createRoom', newRoom.name);
      // document.location.replace(`/rooms/${newRoom.id}`);
    } else {
      // alert('Failed to create room.');
      // document.location.replace('/');
    }
  } else {
    alert('Fill in all fields. Password must be 8+ characters.')
  }
};

const joinRoom = async (event) => {
  event.preventDefault();
  const joinRoom = {
    id: document.getElementById('invite-code'),
    password: document.getElementById('invite-password'),
    userId: document.getElementById('user').getAttribute('data-user')
  }
  const response = await fetch(`/api/rooms/${joinRoom.id}`, {
    method: 'PUT',
    body: JSON.stringify(joinRoom),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log('response ok?', response.ok)
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
