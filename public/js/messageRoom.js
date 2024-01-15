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
  event.stopPropagation();
  console.log('edit')
  const messageContent = event.target.closest('div');
  const editBtn = messageContent.querySelector('.msg-edit');
  const deleteBtn = messageContent.querySelector('.msg-delete');
  let message = messageContent.querySelector('.text');
  let originalMessage = message.textContent;
  const displayNone = 'none';

  // create input field
  const inputField = document.createElement('input');
  inputField.setAttribute('placeholder', message.textContent);
  messageContent.insertBefore(inputField, messageContent.querySelector('.text').nextSibling);
  message.textContent = '';

  // add save/cancel buttons
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save';
  messageContent.appendChild(saveBtn);
  messageContent.appendChild(cancelBtn);
  // cancel edits
  const cancel = () => {
    message.textContent = originalMessage;
    console.log('canceled', message.textContent);
    editBtn.style.removeProperty('display');
    deleteBtn.style.removeProperty('display');
    saveBtn.style.display = displayNone;
    cancelBtn.style.display = displayNone;
    inputField.remove();
  };
  // save edits
  const save = () => {
    const editedText = inputField.value.trim();
    console.log('edits', editedText);
    message.textContent = editedText;
    editBtn.style.removeProperty('display');
    deleteBtn.style.removeProperty('display');
    saveBtn.style.display = displayNone;
    cancelBtn.style.display = displayNone;
    inputField.remove();
  }

  editBtn.style.display = displayNone;
  deleteBtn.style.display = displayNone;
  
  cancelBtn.addEventListener('click', cancel)
  saveBtn.addEventListener('click', save)
};

const deleteMessage = async (event) => {
  event.preventDefault();
  console.log('delete')
  const messageContent = event.target.closest('div');
  const message = messageContent.querySelector('.text');
  message.textContent = '';
  const em = document.createElement('em');
  em.textContent = 'Message has been deleted.';
  message.appendChild(em);
};

const manageMessage = async (event) => {
  event.preventDefault();
  const button = event.target.classList;
  if (button.contains('msg-edit')) {
    return editMessage(event);
  } else if (button.contains('msg-delete')) {
    return deleteMessage(event);
  }
};

msgContainer.addEventListener('click', manageMessage);
msgForm.addEventListener('submit', sendMessage);
