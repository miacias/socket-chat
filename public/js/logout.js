const logoutBtn = document.querySelector('#logout');

const logout = async () => {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'}
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      return alert('Failed to log out.', response.statusText);
    }
  } catch (err) {
    console.error('logout error:', err);
  }
}

logoutBtn.addEventListener('click', logout);
