const socket = io();

function saveName() {
  const username = document.getElementById('username').value.trim();
  localStorage.setItem('socketName', username);
}

function createRoom() {
  const roomName = document.getElementById('roomInput').value;
  socket.emit('createRoom', roomName);
}

function sendMessage() {
  const message = document.getElementById('messageInput').value;
  const room = document.getElementById('roomInput').value;
  socket.emit('sendMessage', { message, room });
}

socket.on('message', (message) => {
  const ul = document.getElementById('messages');
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(message));
  ul.appendChild(li);
});