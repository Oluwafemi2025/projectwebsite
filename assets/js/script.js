// Utility: year
document.getElementById('year') && (document.getElementById('year').textContent = new Date().getFullYear());

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:.12});
revealEls.forEach(el=>io.observe(el));

// Counters
function animateCount(el){
  const target = +el.dataset.target || 0;
  let curr = 0;
  const step = Math.max(1, Math.round(target/120));
  const t = setInterval(()=>{
    curr += step;
    if(curr >= target){ curr = target; clearInterval(t); }
    el.textContent = curr.toLocaleString();
  }, 16);
}
document.querySelectorAll('.count').forEach(el=>{
  const onView = new IntersectionObserver(([e])=>{
    if(e.isIntersecting){ animateCount(el); onView.disconnect(); }
  },{threshold:.5});
  onView.observe(el);
});

// Lightbox (vanilla)
const lb = document.getElementById('lightbox');
if(lb){
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('a.glight').forEach(a=>{
    a.addEventListener('click', e=>{
      e.preventDefault();
      lbImg.src = a.getAttribute('href') || a.querySelector('img')?.src;
      lb.classList.add('show');
      lb.setAttribute('aria-hidden','false');
    });
  });
  lb.querySelector('.lightbox__close').addEventListener('click', ()=>{
    lb.classList.remove('show'); lb.setAttribute('aria-hidden','true'); lbImg.removeAttribute('src');
  });
  lb.addEventListener('click', e=>{ if(e.target===lb) lb.classList.remove('show'); });
}

// Mobile nav (checkbox already handles show/hide)
