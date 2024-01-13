const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const login = async (event) => {
  event.preventDefault();
  const user = {
    username: document.querySelector('#login-username').value.trim(),
    password: document.querySelector('#login-password').value.trim(),
  }
  if (user.username && user.password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in. Please try again');
    }
  }
  loginForm.reset();
}

const signup = async (event) => {
  event.preventDefault();
  const newUser = {
    username: document.querySelector('#signup-username').value.trim(),
    password: document.querySelector('#signup-password').value.trim(),
  }
  if (newUser.username && newUser.password) {
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up. Please try again');
    }
  } else {
    alert('Must include username and password');
  }
  signupForm.reset();
}

loginForm.addEventListener('submit', login);
signupForm.addEventListener('submit', signup);