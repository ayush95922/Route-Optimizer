// SmartRoute — Shared JS

var API = 'http://localhost:8080/api';

// Show logged-in user in nav
document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const navUser  = document.getElementById('navUser');
  const navSignIn = document.getElementById('navSignIn');
  if (user && navUser) {
    navUser.textContent = '👋 ' + (user.username || user.name || user.email.split('@')[0]);
    navUser.classList.remove('hidden');
    if (navSignIn) {
      navSignIn.textContent = 'Sign out';
      navSignIn.href = '#';
      navSignIn.onclick = () => { localStorage.removeItem('user'); window.location.reload(); };
    }
  }

  // Dark mode toggle logic
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeToggleDarkIcon = document.getElementById('themeToggleDarkIcon');
  const themeToggleLightIcon = document.getElementById('themeToggleLightIcon');

  if (themeToggleBtn && themeToggleDarkIcon && themeToggleLightIcon) {
    // Initial icon state
    if (document.documentElement.classList.contains('dark')) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
      // Toggle icons
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      // If is dark mode
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  }
});
