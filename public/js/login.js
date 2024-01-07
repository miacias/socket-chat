const loginForm = document.querySelector('#login-form');
const signupForm = document.querySelector('#signup-form');

const login = async (event) => {
  event.preventDefault();
  const username = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();
  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
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
  const username = document.querySelector('#signup-username').value.trim();
  const password = document.querySelector('#signup-password').value.trim();
  if (username && password) {
    const newUser = {
      username: username,
      password: password,
    };
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
  }
  signupForm.reset();
}

loginForm.addEventListener('submit', login);
signupForm.addEventListener('submit', signup);