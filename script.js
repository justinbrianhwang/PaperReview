// ===== Language =====
const VALID_LANGS = ['en', 'ko'];
let storedLang = localStorage.getItem('lang');
let currentLang = VALID_LANGS.includes(storedLang) ? storedLang : 'en';

// ===== Domain Definitions =====
const DOMAINS = [
  { id: 'autonomous-driving', en: 'Autonomous Driving', ko: '자율주행' },
  { id: 'quantum-computing',  en: 'Quantum Computing',  ko: '양자컴퓨터' },
  { id: 'ai-security',        en: 'AI Security',        ko: 'AI 보안' },
  { id: 'deep-learning',      en: 'Deep Learning',      ko: '딥러닝' }
];

function applyLang() {
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'en' ? '한국어' : 'English';

  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text !== null) el.textContent = text;
  });

  const search = document.getElementById('search');
  if (search) {
    const ph = search.getAttribute(`data-placeholder-${currentLang}`);
    if (ph) search.placeholder = ph;
  }

  if (document.getElementById('paper-grid')) {
    renderPapers();
  }
  if (document.getElementById('paper-detail')) {
    renderPaperDetail();
  }
}

function toggleLang() {
  currentLang = currentLang === 'en' ? 'ko' : 'en';
  localStorage.setItem('lang', currentLang);
  applyLang();
}

// ===== Paper List (index.html) =====
let activeDomain = null;

function renderDomainFilters() {
  const container = document.getElementById('tag-filters');
  if (!container) return;

  const allLabel = currentLang === 'en' ? 'All' : '전체';
  let html = `<button class="tag-filter-btn ${!activeDomain ? 'active' : ''}" onclick="filterByDomain(null)">${allLabel}</button>`;

  DOMAINS.forEach(d => {
    const count = PAPERS.filter(p => p.domain === d.id).length;
    if (count === 0) return;
    const label = currentLang === 'en' ? d.en : d.ko;
    html += `<button class="tag-filter-btn ${activeDomain === d.id ? 'active' : ''}" onclick="filterByDomain('${d.id}')">${label} <span class="domain-count">${count}</span></button>`;
  });

  container.innerHTML = html;
}

function renderHeroStats() {
  const container = document.getElementById('hero-stats');
  if (!container) return;

  const total = PAPERS.length;
  const domainCount = new Set(PAPERS.map(p => p.domain)).size;
  if (currentLang === 'en') {
    container.innerHTML = `<span>${total} papers</span><span class="stats-dot">\u00b7</span><span>${domainCount} domains</span>`;
  } else {
    container.innerHTML = `<span>${total}편의 논문</span><span class="stats-dot">\u00b7</span><span>${domainCount}개의 영역</span>`;
  }
}

function filterByDomain(domain) {
  activeDomain = domain;
  renderDomainFilters();
  renderPapers();
}

function renderPapers() {
  const grid = document.getElementById('paper-grid');
  if (!grid) return;

  renderHeroStats();

  const query = (document.getElementById('search')?.value || '').toLowerCase();

  const filtered = PAPERS.filter(p => {
    const lang = p[currentLang];
    const matchesDomain = !activeDomain || p.domain === activeDomain;
    const matchesSearch = !query ||
      lang.title.toLowerCase().includes(query) ||
      p.authors.toLowerCase().includes(query) ||
      lang.summary.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchesDomain && matchesSearch;
  });

  if (filtered.length === 0) {
    const msg = currentLang === 'en' ? 'No papers found.' : '논문을 찾을 수 없습니다.';
    grid.innerHTML = `<div class="empty-state"><p>${msg}</p></div>`;
    return;
  }

  filtered.sort((a, b) => b.date.localeCompare(a.date));

  grid.innerHTML = filtered.map(p => {
    const lang = p[currentLang];
    const domainInfo = DOMAINS.find(d => d.id === p.domain);
    const domainLabel = domainInfo ? (currentLang === 'en' ? domainInfo.en : domainInfo.ko) : '';
    const imageHtml = p.image
      ? `<img class="card-image" src="${p.image}" alt="${lang.title}" onerror="this.outerHTML='<div class=\\'card-image-placeholder\\'><span>&#9781;</span></div>'">`
      : `<div class="card-image-placeholder"><span>&#9781;</span></div>`;
    return `
      <div class="paper-card" onclick="location.href='paper.html?id=${p.id}'">
        ${imageHtml}
        <div class="card-body">
          <span class="date">${formatDate(p.date)} \u00b7 ${p.venue}</span>
          <h3>${lang.title}</h3>
          <p class="authors">${p.authors}</p>
          <div class="tags">
            <span class="tag domain-tag">${domainLabel}</span>
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderDomainFilters();
}

// ===== Paper Detail (paper.html) =====
function renderPaperDetail() {
  const container = document.getElementById('paper-detail');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const paper = PAPERS.find(p => p.id === id);

  if (!paper) {
    const msg = currentLang === 'en' ? 'Paper not found.' : '논문을 찾을 수 없습니다.';
    const back = currentLang === 'en' ? '\u2190 Back to list' : '\u2190 목록으로';
    container.innerHTML = `<a href="index.html" class="back-link">${back}</a><div class="empty-state"><p>${msg}</p></div>`;
    return;
  }

  const lang = paper[currentLang];
  const backText = currentLang === 'en' ? '\u2190 Back to list' : '\u2190 목록으로';
  const linkText = currentLang === 'en' ? 'View original paper \u2192' : '원본 논문 보기 \u2192';
  const domainInfo = DOMAINS.find(d => d.id === paper.domain);
  const domainLabel = domainInfo ? (currentLang === 'en' ? domainInfo.en : domainInfo.ko) : '';

  document.title = `${lang.title} \u2014 Sunjun Hwang | Paper Review`;

  container.innerHTML = `
    <a href="index.html" class="back-link">${backText}</a>
    <div class="meta">
      <p class="date">${formatDate(paper.date)} \u00b7 ${paper.venue}</p>
      <h1>${lang.title}</h1>
      <p class="authors">${paper.authors}</p>
      ${paper.link ? `<a href="${paper.link}" class="paper-link" target="_blank" rel="noopener">${linkText}</a>` : ''}
      <div class="tags">
        <span class="tag domain-tag">${domainLabel}</span>
        ${paper.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>
    <div class="review-content">
      ${lang.review}
    </div>
  `;
}

// ===== Helpers =====
function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  if (currentLang === 'ko') {
    return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
  }
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  applyLang();

  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('input', renderPapers);
  }
});
