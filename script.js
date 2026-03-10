// Theme toggle (light/dark) persisted in localStorage
const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
function applyTheme(theme){
  if(theme === 'light') document.documentElement.classList.add('light');
  else document.documentElement.classList.remove('light');
  localStorage.setItem('theme', theme);
}
const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(saved);
themeToggle.addEventListener('click', () => {
  const now = document.documentElement.classList.contains('light') ? 'dark' : 'light';
  applyTheme(now);
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
menuToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
  if(nav.classList.contains('open')) nav.style.display = 'flex';
  else nav.style.display = '';
});

// Typewriter (simple rotating words)
const typedEl = document.getElementById('typed');
const words = ['UI/UX design', 'Front-end Development', 'Animations', 'Performance Optimization'];
let idx = 0;
let char = 0;
let deleting = false;
function tick(){
  const current = words[idx % words.length];
  if(!deleting){
    typedEl.textContent = current.slice(0, char+1);
    char++;
    if(char === current.length){ deleting = true; setTimeout(tick, 900); return; }
  } else {
    typedEl.textContent = current.slice(0, char-1);
    char--;
    if(char === 0){ deleting = false; idx++; }
  }
  setTimeout(tick, deleting ? 60 : 90);
}
tick();

// IntersectionObserver reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // animate progress bars when visible
      const spans = e.target.querySelectorAll('.progress span');
      spans.forEach(s => {
        const w = getComputedStyle(s).getPropertyValue('--w') || '80%';
        s.style.width = w;
      });
    }
  });
}, { threshold: 0.12 });

reveals.forEach(r => io.observe(r));

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const href = a.getAttribute('href');
    if(href.length > 1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      // close mobile menu after click
      if(nav.classList.contains('open')){ nav.classList.remove('open'); nav.style.display = ''; }
    }
  });
});

// Update year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Simple client-side form feedback (no backend)
const form = document.getElementById('contact-form');
form?.addEventListener('submit', (e) => {
  // Prevent default submit for demo; remove if using mailto or backend
  // e.preventDefault();
  // alert('Terima kasih! Form dikirim (demo).');
});