const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbzTdbFN6wHCjNuwMIBcYO0_S8eiNH_gWhSPYvSWwzcZkJk4neJIVKUv7It-41COvyO6/exec'; 

const form = document.getElementById('cform');
const toast = document.getElementById('toast');
const btn = form.querySelector('.btn-send');

// Set timestamp on load
document.getElementById('timestamp').value = new Date().getTime();

// Helper to show/hide errors - same as your original design
function se(id, show) {
  document.getElementById(id).style.display = show ? 'block' : 'none';
}

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const n = document.getElementById('fn').value.trim();
  const em = document.getElementById('fe').value.trim();
  const m = document.getElementById('fm').value.trim();
  const eok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
  
  let ok = true;
  se('e1', !n); if (!n) ok = false;
  se('e2', !eok); if (!eok) ok = false;
  se('e3', !m); if (!m) ok = false;
  
  if (!ok) return;
  
  btn.disabled = true;
  btn.textContent = 'Sending...';
  
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);
  
  try {
    await fetch(WEB_APP_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      mode: 'no-cors'
    });
    
    // Success: Show your original toast
    form.reset();
    document.getElementById('timestamp').value = new Date().getTime();
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4500);
    
  } catch (error) {
    // If fetch fails, show error under email field
    se('e2', true);
    document.getElementById('e2').textContent = 'Error sending. Try again.';
  }
  
  btn.disabled = false;
  btn.textContent = 'Send Message →';
});

// NAV hamburger
const ham = document.getElementById('ham'), mob = document.getElementById('mob');
if (ham) ham.addEventListener('click', () => mob.classList.toggle('open'));
mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mob.classList.remove('open')));
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.background = scrollY > 20 ? 'rgba(10,15,28,0.96)' : 'rgba(10,15,28,0.72)';
}, { passive: true });

// TYPEWRITER
(function () {
  const el = document.getElementById('tw');
  if (!el) return;
  const phrases = ['React, TypeScript, Tailwind', 'Accessibility-First Builder', 'UI/UX-Obsessed Engineer'];
  let pi = 0, ci = 0, del = false;
  function tick() {
    const p = phrases[pi];
    if (!del) { ci++; el.textContent = p.slice(0, ci); if (ci === p.length) { del = true; setTimeout(tick, 2400); return } }
    else { ci--; el.textContent = p.slice(0, ci); if (ci === 0) { del = false; pi = (pi + 1) % phrases.length } }
    setTimeout(tick, del ? 36 : 66);
  }
  tick();
})();

// REVEAL
const rObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('on') }), { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => rObs.observe(el));

// COUNT UP
const cObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting && !e.target.dataset.done) {
    e.target.dataset.done = '1'; const tgt = +e.target.dataset.target; let cur = 0;
    const t = setInterval(() => { cur = Math.min(cur + tgt / 48, tgt); e.target.textContent = Math.round(cur); if (cur >= tgt) clearInterval(t); }, 28);
  }
}), { threshold: 0.5 });
document.querySelectorAll('.count').forEach(el => cObs.observe(el));

// SKILL BARS
const sObs = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) e.target.querySelectorAll('.skill-fill').forEach(b => setTimeout(() => b.style.width = b.dataset.w + '%', 100));
}), { threshold: 0.2 });
document.querySelectorAll('.skills-col').forEach(c => sObs.observe(c));

// 3D HERO CARD
const card = document.getElementById('card3d');
if (card) {
  document.addEventListener('mousemove', e => {
    const dx = (e.clientX / window.innerWidth - .5) * 2;
    const dy = (e.clientY / window.innerHeight - .5) * 2;
    card.style.transform = `rotateY(${-12 + dx * 7}deg) rotateX(${4 - dy * 5}deg)`;
  }, { passive: true });
}

// 3D TILT on project cards
document.querySelectorAll('.proj-card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `translateY(-7px) rotateY(${x * 9}deg) rotateX(${-y * 6}deg)`;
    c.style.boxShadow = `${-x * 18}px ${y * 18}px 60px rgba(0,0,0,.4),0 0 0 1px rgba(20,184,166,.25)`;
  });
  c.addEventListener('mouseleave', () => { c.style.transform = ''; c.style.boxShadow = ''; });
});