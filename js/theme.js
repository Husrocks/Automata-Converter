const btn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');
btn.onclick = () => {
  document.body.classList.toggle('dark');
  icon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
};
window.onload = () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    icon.textContent = '☀️';
  }
}; 