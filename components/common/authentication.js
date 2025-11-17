window.onload = () => {
  const url = window.location.href;
  const activeUser = localStorage.getItem('activeUser') ? JSON.parse(localStorage.getItem('activeUser')) : null;

  if (url.includes('auth') && activeUser) {
    window.location.href = 'http://127.0.0.1:5500/pages/user/todo-app/';
  }

  if ((url.includes('dashboard') || url.includes('user')) && !activeUser) {
    window.location.href = 'http://127.0.0.1:5500/pages/auth/signin/';
  }
};