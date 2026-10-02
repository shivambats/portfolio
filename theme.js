const themeKey = 'shivam-site-theme';
const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem(themeKey);
if (savedTheme === 'dark') document.documentElement.dataset.theme = 'dark';

function updateToggle() {
  if (!toggle) return;
  const isDark = document.documentElement.dataset.theme === 'dark';
  toggle.textContent = isDark ? 'Light mode' : 'Dark mode';
  toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
  toggle.setAttribute('aria-pressed', String(isDark));
}

updateToggle();
toggle?.addEventListener('click', () => {
  const isDark = document.documentElement.dataset.theme !== 'dark';
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  localStorage.setItem(themeKey, isDark ? 'dark' : 'light');
  updateToggle();
});
