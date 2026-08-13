/* ============================================================
   PARAM RICE — Site Behaviour
   Depends on data.js being loaded first (brandConfig, products,
   siteImages, journeySteps, qualitySteps, whyPoints, recipes).
   ============================================================ */

let cart = [];

/* ---- Signature grain illustration (used where a photo placeholder is needed) ---- */
function grainSVG(seedShift = 0){
  let grains = "";
  for(let i = 0; i < 26; i++){
    const x = (i*37 + seedShift*13) % 100;
    const y = (i*53 + seedShift*7) % 100;
    const r = (i%3)*8 + 6;
    grains += `<ellipse cx="${x}%" cy="${y}%" rx="3.2" ry="7" transform="rotate(${r} ${x} ${y})" fill="rgba(22,48,42,${0.06 + (i%4)*0.03})"/>`;
  }
  return `<svg class="grain-illustration" viewBox="0 0 100 100" preserveAspectRatio="none">${grains}</svg>`;
}

/* ---- Static content renders ---- */
function imgWithFallback(src, alt, extraAttrs = ''){
  // If an external photo fails to load (blocked network, offline, etc.),
  // remove it gracefully so the section's own background/gradient shows
  // instead of a broken-image icon.
  return `<img src="${src}" alt="${alt}" ${extraAttrs} onerror="this.remove()">`;
}
function renderHeroBg(){
  document.getElementById('heroBg').innerHTML =
    imgWithFallback(siteImages.heroPaddyField, 'Golden paddy field', 'loading="eager"');
}
function renderAboutMedia(){
  document.getElementById('aboutMedia').innerHTML =
    imgWithFallback(siteImages.harvestWoman, 'Harvesting paddy in the field', 'loading="lazy"');
}
function renderJourney(){
  document.getElementById('journeyTrack').innerHTML = journeySteps.map(s => `
    <div class="j-step">
      <span class="j-num">${s.n}</span>
      <h4>${s.t}</h4>
      <p>${s.d}</p>
    </div>`).join('');
}
function renderQuality(){
  document.getElementById('qualityGrid').innerHTML = qualitySteps.map(s => `
    <div class="q-item">
      <span class="q-mark">${s.n}</span>
      <h4>${s.t}</h4>
      <p>${s.d}</p>
    </div>`).join('');
}
function renderWhy(){
  document.getElementById('whyGrid').innerHTML = whyPoints.map(w => `
    <div class="why-card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 6L9 17l-5-5"/></svg>
      <h4>${w.t}</h4>
      <p>${w.d}</p>
    </div>`).join('');
}
function renderRecipes(){
  document.getElementById('recipeScroll').innerHTML = recipes.map(r => `
    <div class="recipe-card">
      <div class="recipe-media">${r.image ? imgWithFallback(siteImages[r.image], r.t, 'loading="lazy"') : grainSVG(r.t.length)}</div>
      <div class="recipe-body">
        <span>${r.cat}</span>
        <h4>${r.t}</h4>
        <p>${r.d}</p>
        <p style="margin-top:8px; color:var(--gold-soft); font-size:11px;">Recommended: ${r.rice}</p>
      </div>
    </div>`).join('');
}

/* ---- Product filters ---- */
const filterChips = document.getElementById('filterChips');
let activeCat = "All";
let searchTerm = "";

function renderFilterChips(){
  filterChips.innerHTML = categories.map((c, i) =>
    `<button class="filter-chip ${i === 0 ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
}
filterChips?.addEventListener('click', e => {
  const btn = e.target.closest('.filter-chip');
  if(!btn) return;
  activeCat = btn.dataset.cat;
  [...filterChips.children].forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProducts();
});
document.getElementById('productSearch')?.addEventListener('input', e => {
  searchTerm = e.target.value.trim().toLowerCase();
  renderProducts();
});

function renderProducts(){
  const grid = document.getElementById('productGrid');
  const filtered = products.filter(p => {
    const matchCat = activeCat === "All" || p.category === activeCat;
    const matchSearch = !searchTerm || (p.name + p.category + p.shortDescription).toLowerCase().includes(searchTerm);
    return matchCat && matchSearch;
  });
  if(filtered.length === 0){
    grid.innerHTML = `<div class="no-results">No rice varieties match your search. Try a different term or filter.</div>`;
    return;
  }
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-media">
        <span class="product-tag">${p.tag}</span>
        ${p.image ? imgWithFallback(siteImages[p.image], p.name, 'loading="lazy"') : grainSVG(p.id)}
      </div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3>${p.name}</h3>
        <p>${p.shortDescription}</p>
        <div class="pack-row">${p.packSizes.map(s => `<span class="pack-pill">${s}</span>`).join('')}</div>
        <div class="price-row">
          ${p.price ? `<span class="price">₹${p.price}<span> / ${p.unit}</span></span>` : `<span class="price" style="font-size:1rem;">On Request</span>`}
        </div>
        <div class="card-actions">
          <button class="btn btn-dark" onclick="viewProduct(${p.id})">View Details</button>
          <button class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>`).join('');
}

function viewProduct(id){
  const p = products.find(x => x.id === id);
  showToast(`${p.name} — dedicated product page coming in a future build.`);
}

/* ---- Cart ---- */
function addToCart(id){
  const p = products.find(x => x.id === id);
  const existing = cart.find(c => c.id === id && c.pack === p.packSizes[0]);
  if(existing){ existing.qty++; }
  else{ cart.push({ id: p.id, name: p.name, pack: p.packSizes[0], price: p.price, qty: 1 }); }
  renderCart();
  showToast(`✓ Added ${p.name} to cart`);
  const badge = document.getElementById('cartCount');
  badge.style.transform = 'scale(1.4)';
  setTimeout(() => badge.style.transform = 'scale(1)', 250);
}
function changeQty(idx, delta){
  cart[idx].qty += delta;
  if(cart[idx].qty <= 0) cart.splice(idx, 1);
  renderCart();
}
function removeItem(idx){ cart.splice(idx, 1); renderCart(); }

function renderCart(){
  const itemsEl = document.getElementById('cartItems');
  const footEl = document.getElementById('cartFoot');
  document.getElementById('cartCount').textContent = cart.reduce((s, c) => s + c.qty, 0);
  if(cart.length === 0){
    itemsEl.innerHTML = `<div class="cart-empty">Your cart is empty.<br>Browse our rice collection to get started.</div>`;
    footEl.innerHTML = '';
    return;
  }
  itemsEl.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <div class="ci-thumb"></div>
      <div class="ci-info">
        <h4>${c.name}</h4>
        <div class="ci-meta">${c.pack}${c.price ? ' · ₹' + c.price : ' · Price on request'}</div>
        <div class="qty-control">
          <button onclick="changeQty(${i},-1)">−</button>
          <span>${c.qty}</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
        <a class="ci-remove" onclick="removeItem(${i})">Remove</a>
      </div>
    </div>`).join('');
  const subtotal = cart.reduce((s, c) => s + (c.price || 0) * c.qty, 0);
  footEl.innerHTML = `
    <div class="cart-subtotal"><span>Subtotal</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
    <button class="btn btn-primary" onclick="checkout()">Place Order (Demo)</button>
    <button class="btn btn-dark" onclick="orderViaWhatsapp()">Order via WhatsApp</button>
  `;
}

function checkout(){
  showToast('This is a demo checkout — no payment has been processed.');
}
function orderViaWhatsapp(){
  const lines = cart.map(c => `- ${c.name} (${c.pack}) x${c.qty}`).join('%0A');
  const msg = `Hello Param Rice, I would like to order:%0A${lines}`;
  window.open(`https://wa.me/${brandConfig.whatsapp.replace('+', '')}?text=${msg}`, '_blank');
}

/* ---- Drawers ---- */
function toggleCart(open){
  document.getElementById('cartDrawer').classList.toggle('open', open);
  syncOverlay();
}
function toggleMobileNav(open){
  document.getElementById('mobileNav').classList.toggle('open', open);
  syncOverlay();
}
function syncOverlay(){
  const cartOpen = document.getElementById('cartDrawer').classList.contains('open');
  const navOpen = document.getElementById('mobileNav').classList.contains('open');
  document.getElementById('overlay').classList.toggle('open', cartOpen || navOpen);
}

/* ---- Toast ---- */
let toastTimer;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ---- WhatsApp general enquiry links (from brandConfig, one place to edit) ---- */
function wireWhatsappLinks(){
  const generalMsg = encodeURIComponent("Hello Param Rice, I would like to enquire about your rice products.");
  ['floatWhatsapp', 'footerWhatsapp', 'bulkWhatsapp', 'contactWhatsapp'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = `https://wa.me/${brandConfig.whatsapp.replace('+', '')}?text=${generalMsg}`;
  });
  ['floatCall', 'bulkCall', 'contactCall', 'contactLine'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.href = `tel:${brandConfig.phone}`;
  });
  document.querySelectorAll('[data-phone-display]').forEach(el => el.textContent = brandConfig.phoneDisplay);
}

/* ---- Bulk enquiry form (demo submit) ---- */
document.getElementById('bulkForm')?.addEventListener('submit', e => {
  e.preventDefault();
  showToast('Thank you — your enquiry has been noted (demo form).');
  e.target.reset();
});

/* ---- Header scroll state ---- */
window.addEventListener('scroll', () => {
  document.getElementById('siteHeader').classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Hero floating grains ---- */
function spawnHeroGrains(){
  const heroGrains = document.getElementById('heroGrains');
  for(let i = 0; i < 22; i++){
    const g = document.createElement('div');
    g.className = 'g';
    g.style.left = Math.random() * 100 + '%';
    g.style.bottom = (Math.random() * 30) + '%';
    g.style.animationDelay = (Math.random() * 7) + 's';
    g.style.animationDuration = (5 + Math.random() * 4) + 's';
    heroGrains.appendChild(g);
  }
}

/* ---- Scroll reveal (with safety net so content is never stuck invisible) ---- */
function wireScrollReveal(){
  const revealEls = document.querySelectorAll('.reveal');
  const forceShow = () => revealEls.forEach(el => el.classList.add('in'));

  try{
    if(!('IntersectionObserver' in window)){ forceShow(); return; }
    // Only arm the hidden state once we know we can observe + reveal it —
    // never leave a section hidden with nothing to un-hide it.
    revealEls.forEach(el => el.classList.add('will-animate'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.01, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(el => io.observe(el));
    // Hard safety net: whatever the observer missed (e.g. a static preview
    // render that never scrolls) becomes visible anyway after a short delay.
    setTimeout(forceShow, 1800);
  }catch(e){
    forceShow();
  }
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderHeroBg();
  renderAboutMedia();
  renderJourney();
  renderQuality();
  renderWhy();
  renderRecipes();
  renderFilterChips();
  renderProducts();
  renderCart();
  wireWhatsappLinks();
  spawnHeroGrains();
  wireScrollReveal();

  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.g').forEach(g => g.style.animation = 'none');
  }
});
