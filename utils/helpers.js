export default {
  or: (a, b) => {
    if (a.length || b.length) {
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
