export default {
  or: (a, b) => {
    if (a || b) {
      return true
    } else {
      return false
    }
  },
  atHome: () => {
    const url = window.location.href;
    if (url === '/') {
      return true;
    } else {
      return false;
    }
  }
}
