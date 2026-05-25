import { moonIcon, sunIcon } from '../components/icons/icons';

const themeBtn = document.getElementById('themeBtn')!;

function setTheme(t: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', t);
  themeBtn.innerHTML = t === 'dark' ? sunIcon : moonIcon;
  try { localStorage.setItem('theme', t); } catch {}
}

let savedTheme: 'light' | 'dark' = 'light';
try {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') {
    savedTheme = stored;
  } else if (window.matchMedia('(prefers-color-scheme:dark)').matches) {
    savedTheme = 'dark';
  }
} catch {}

setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
});
