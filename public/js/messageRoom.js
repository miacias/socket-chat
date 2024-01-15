const socket = io();

socket.on('message', (message) => {

});

const msgContainer = document.getElementById('msg-container'); // <ul>
const msgForm = document.getElementById('msg-form');

const sendMessage = async (event) => {
  event.preventDefault();

};

const editMessage = async (event) => {
  event.preventDefault();

};

const deleteMessage = async (event) => {
  event.preventDefault();

};

const manageMessage = async (event) => {
  event.preventDefault();
  const button = event.target;
  if (button.classList.contains('msg-edit')) return editMessage(event);
  return deleteMessage(event);
};

msgContainer.addEventListener('click', manageMessage);
msgForm.addEventListener('submit', sendMessage);
