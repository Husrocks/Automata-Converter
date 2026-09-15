/**
 * Automata Visualizer Pro - Theme Controller
 * Handles light/dark mode persistence and Lucide Icon synchronization.
 */

(function () {
  'use strict';

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    applyTheme(isDark);

    // Global event delegation for #theme-toggle button
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#theme-toggle');
      if (!toggleBtn) return;

      const currentlyDark = document.body.classList.contains('dark');
      const nextDark = !currentlyDark;
      applyTheme(nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();