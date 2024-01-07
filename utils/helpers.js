export default {
  atHome: () => {
    const url = window.location.href;
    if (url === '/') {
      return true;
    } else {
      return false;
    }
  }
}
