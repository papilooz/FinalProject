const toggleBtn = document.getElementById('menu-toggle');
const sidebar = document.getElementById('mobileSidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});