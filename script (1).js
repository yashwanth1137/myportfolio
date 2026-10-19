const $ = s => document.querySelector(s);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Data ---------- */
const traits = [['🎯','Discipline'],['🔍','Curiosity'],['🔁','Consistency'],['🌱','Growth'],['🧭','Leadership'],['💡','Innovation'],['🤝','Teamwork'],['🎨','Creativity']];
const stats = [[19,'Years of curiosity'],[3,'Years class topper'],[5,'Prizes & podiums'],[4,'Clubs joined']];
const journey = [
  ['🏫','Schooling','Santhome Public School','Class topper in Classes 7, 8 and 9'],
  ['📘','Pre-University','Mandavya Pre-University College, Mandya','Foundation years in science'],
  ['🎓','Engineering','Bangalore Institute of Technology, Bangalore','Electronics & Communication Engineering. About to complete 2nd semester']
];
const roadmap = ['Sem 1-2 ✓','Core ECE','Internships','Major Project','Placements','Electronics Engineer'];
const ach = [
  ['🏆','Class Topper','Classes 7, 8 and 9'],
  ['🥉','3rd Place: Division Kabaddi','Shantha Vidyaniketan, Kakalachinte, Bangalore (2023)'],
  ['🥇','1st Prize: Kannada Literature & Poetry','Competition, 2023'],
  ['🥇','1st Prize: Kho-Kho','Interschool Competition'],
  ['🏃','Athlete','2023 to 2025'],
  ['🥉','3rd Place: Idea2Innovation 2026','Poster Presentation, ECE Department, BIT']
];
const clubs = [['🎭','Samskruti Club','BIT'],['⚽','Sports Club','BIT'],['📡','ECSA Club','Electronics & Communication Students Association'],['🎪','Cultural Committee','BIT']];
const events = [
  ['💃','Dance routine','Kannada Kalarava 2025'],['⚡','ECE Department Flashmob','2026'],
  ['🎭','Manthan 2026','SUBCORE member, Cultural Committee'],['🏅','Volunteer','Annual Sports Meet 2025, BIT'],['🎓','Pupil','Trinity Study Centre']
];
const hobbies = [['🏃','Early morning sprint runs across lanes'],['📚','Active reader'],['🎨','Artwork and creativity'],['📖','Novels and self-growth books']];
const books = [['Factfulness',150,'#2d8cff'],['Atomic Habits',170,'#00b3d6'],['The Alchemist',140,'#7a5cff'],['Curious Case of Tara Gupta',185,'#1fa37a'],['Fiction Comics & Novels',160,'#d6457a']];
const gallery = [['Artwork',230,'#2d8cff,#7a5cff'],['Novels',170,'#00d4ff,#1fa37a'],['Campus Moments',280,'#7a5cff,#00d4ff'],['Events',190,'#d6457a,#2d8cff'],['Personal Memories',250,'#1fa37a,#2d8cff'],['Achievements',200,'#2d8cff,#00d4ff']]; // add img:'photos/x.jpg' as 4th item to use photos

/* ---------- Render ---------- */
const card = (ico, t, d, extra = '') => `<article class="card tilt reveal"><span class="ico" aria-hidden="true">${ico}</span><h3>${t}</h3><p>${d}</p>${extra}</article>`;
$('#traits').innerHTML = traits.map(([i,t]) => card(i,t,'')).join('');
$('#stats').innerHTML = stats.map(([n,l]) => `<div class="card reveal"><div class="num" data-count="${n}">0</div><p>${l}</p></div>`).join('');
$('#timeline').innerHTML = journey.map(([i,t,s,d]) => `<div class="tl">${card(i,t,`<b>${s}</b><br>${d}`)}</div>`).join('');
$('#roadmap').innerHTML = roadmap.map((r,i) => `<span class="${i===0?'on':''}">${r}</span>`).join('');
$('#ach').innerHTML = ach.map(([i,t,d]) => card(i,t,d)).join('');
$('#clubgrid').innerHTML = clubs.map(([i,t,d]) => card(i,t,d)).join('');
$('#evt').innerHTML = events.map(([i,t,d]) => `<div class="tl">${card(i,t,d)}</div>`).join('');
$('#hobbies').innerHTML = hobbies.map(([i,t]) => card(i,t,'')).join('');
$('#shelf').innerHTML = books.map(([t,h,c]) => `<button class="book" style="height:${h}px;background:${c}" data-t="${t}">${t}</button>`).join('');
$('#masonry').innerHTML = gallery.map(([t,h,c,img]) => `<button style="height:${h}px;background:${img?`url(${img})`:`linear-gradient(135deg,${c})`};background-size:cover" data-g="${c}" data-t="${t}" ${img?`data-i="${img}"`:''}>${t}</button>`).join('');
$('#yr').textContent = new Date().getFullYear();

/* ---------- Hero name animation ---------- */
$('#name').innerHTML = [...'YASHWANTH GOWDA BM'].map((c,i) => `<span aria-hidden="true" style="animation-delay:${1.2 + i*.06}s">${c === ' ' ? '&nbsp;' : c}</span>`).join('');

/* ---------- Loader ---------- */
addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), reduce ? 0 : 1300));

/* ---------- Scroll reveal, counters, meters ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('show');
  e.target.querySelectorAll('[data-w]').forEach(m => m.style.width = m.dataset.w);
  e.target.querySelectorAll('[data-count]').forEach(n => count(n));
  if (e.target.dataset.count) count(e.target);
  io.unobserve(e.target);
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
function count(el) {
  const end = +el.dataset.count; let n = 0;
  const step = () => { n += Math.max(1, end / 40); el.textContent = Math.min(end, Math.round(n)); if (n < end) requestAnimationFrame(step); };
  step();
}

/* ---------- Scroll progress, back to top, nav ---------- */
const top = $('#top');
addEventListener('scroll', () => {
  const h = document.documentElement;
  $('#progress').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  top.classList.toggle('on', h.scrollTop > 600);
}, { passive: true });
top.onclick = () => scrollTo({ top: 0, behavior: 'smooth' });
$('#burger').onclick = e => { const o = $('#menu').classList.toggle('open'); e.target.setAttribute('aria-expanded', o); };
$('#menu').onclick = () => $('#menu').classList.remove('open');

/* ---------- Cursor glow & 3D tilt ---------- */
addEventListener('pointermove', e => { $('#glow').style.transform = `translate(${e.clientX}px,${e.clientY}px)`; });
if (!reduce) document.addEventListener('pointermove', e => {
  const c = e.target.closest?.('.tilt'); if (!c) return;
  const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  c.style.transform = `perspective(700px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;
});
document.addEventListener('pointerout', e => { const c = e.target.closest?.('.tilt'); if (c) c.style.transform = ''; });

/* ---------- Lightbox ---------- */
const lb = $('#lightbox'), lbc = $('#lbc');
document.addEventListener('click', e => {
  const b = e.target.closest('#masonry button, .book');
  if (b) {
    lbc.textContent = b.dataset.i ? '' : b.dataset.t;
    lbc.style.background = b.dataset.i ? `url(${b.dataset.i}) center/cover` : `linear-gradient(135deg,${b.dataset.g || '#2d8cff,#7a5cff'})`;
    lb.hidden = false; lb.querySelector('button').focus();
  } else if (e.target === lb || e.target.closest('#lightbox button')) lb.hidden = true;
});
addEventListener('keydown', e => { if (e.key === 'Escape') lb.hidden = true; });

/* ---------- Contact form (opens email client) ---------- */
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const n = $('#fn').value.trim(), m = $('#fe').value.trim(), t = $('#fm').value.trim();
  if (!n || !/^\S+@\S+\.\S+$/.test(m) || !t) { $('#status').textContent = 'Please fill all fields with a valid email.'; return; }
  location.href = `mailto:yashu.mandya1137@gmail.com?subject=${encodeURIComponent('Portfolio message from ' + n)}&body=${encodeURIComponent(t + '\n\nFrom: ' + n + ' (' + m + ')')}`;
  $('#status').textContent = 'Opening your email app… thank you!';
});

/* ---------- Animated circuit particles ---------- */
const cv = $('#bg'), ctx = cv.getContext('2d'); let W, H, P = [];
function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; P = Array.from({ length: Math.min(80, W / 18 | 0) }, () => ({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4 })); }
function draw() {
  ctx.clearRect(0, 0, W, H);
  P.forEach((p, i) => {
    p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
    ctx.fillStyle = '#00d4ff'; ctx.fillRect(p.x, p.y, 2, 2);
    for (let j = i + 1; j < P.length; j++) {
      const q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y);
      if (d < 130) { ctx.strokeStyle = `rgba(45,140,255,${.25 - d/520})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } // right-angle traces like PCB routing
    }
  });
  if (!reduce) requestAnimationFrame(draw);
}
addEventListener('resize', size); size(); draw();
