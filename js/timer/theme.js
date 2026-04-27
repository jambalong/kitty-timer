/* ============================================
   KittyTimer — Theme Toggle
   Persists preference to localStorage
   ============================================ */

(function () {
  const STORAGE_KEY = 'kittyTimer_theme';

  // Apply saved preference immediately (before paint)
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark') document.body.classList.add('dark');

  // Create the toggle button
  const btn = document.createElement('button');
  btn.id = 'theme-toggle';
  btn.setAttribute('aria-label', 'Toggle dark mode');
  btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';

  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark');
    btn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  });
})();
