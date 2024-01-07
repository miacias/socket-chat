const logoutBtn = document.querySelector('#logout');

const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'}
  });
  if (response.ok) {
    return document.location.replace('/');
  } else {
    return alert('Failed to log out.', response.statusText);
  }
}