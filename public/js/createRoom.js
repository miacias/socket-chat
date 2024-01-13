// const socket = io(`ws://localhost:3000`);
// const socket = io();
// const socket = io("http://localhost:3000");
const createRoomForm = document.getElementById('create-room');

const createRoom = async (event) => {
  event.preventDefault();
  const newRoom = {
    name: document.getElementById('room-name').value.trim(),
    password: document.getElementById('room-password').value.trim(),
    adminId: document.getElementById('my-id').getAttribute('data-id'),
  }
  const response = await fetch('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(newRoom),
    headers: { 'Content-Type': 'application/json' }
  });
  console.log(`\x1b[92m response: ${{...response}} \x1b[0m`);
  if (response.ok) {
    console.log('ok!')
    // socket.emit('createRoom', newRoom.name);
    // document.location.replace(`/rooms/${newRoom.id}`);
  } else {
    // alert('Failed to create room.');
    // document.location.replace('/');
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
