// ===== Language =====
const VALID_LANGS = ['en', 'ko'];
let storedLang = localStorage.getItem('lang');
let currentLang = VALID_LANGS.includes(storedLang) ? storedLang : 'en';

function applyLang() {
  // Button
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.textContent = currentLang === 'en' ? '한국어' : 'English';

  // Bilingual text elements
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${currentLang}`);
    if (text !== null) el.textContent = text;
  });

  // Search placeholder
  const search = document.getElementById('search');
  if (search) {
    const ph = search.getAttribute(`data-placeholder-${currentLang}`);
    if (ph) search.placeholder = ph;
  }

  // Re-render content based on current page
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
let activeTag = null;

function getAllTags() {
  const tags = new Set();
  PAPERS.forEach(p => p.tags.forEach(t => tags.add(t)));
  return [...tags].sort();
}

function renderTagFilters() {
  const container = document.getElementById('tag-filters');
  if (!container) return;

  const allLabel = currentLang === 'en' ? 'All' : '전체';
  let html = `<button class="tag-filter-btn ${!activeTag ? 'active' : ''}" onclick="filterByTag(null)">${allLabel}</button>`;
  getAllTags().forEach(tag => {
    html += `<button class="tag-filter-btn ${activeTag === tag ? 'active' : ''}" onclick="filterByTag('${tag}')">${tag}</button>`;
  });
  container.innerHTML = html;
}

function renderHeroStats() {
  const container = document.getElementById('hero-stats');
  if (!container) return;

  const total = PAPERS.length;
  const tagCount = getAllTags().length;
  if (currentLang === 'en') {
    container.innerHTML = `<span>${total} papers</span><span class="stats-dot">·</span><span>${tagCount} topics</span>`;
  } else {
    container.innerHTML = `<span>${total}편의 논문</span><span class="stats-dot">·</span><span>${tagCount}개의 주제</span>`;
  }
}

function filterByTag(tag) {
  activeTag = tag;
  renderTagFilters();
  renderPapers();
}

function renderPapers() {
  const grid = document.getElementById('paper-grid');
  if (!grid) return;

  renderHeroStats();

  const query = (document.getElementById('search')?.value || '').toLowerCase();

  const filtered = PAPERS.filter(p => {
    const lang = p[currentLang];
    const matchesTag = !activeTag || p.tags.includes(activeTag);
    const matchesSearch = !query ||
      lang.title.toLowerCase().includes(query) ||
      p.authors.toLowerCase().includes(query) ||
      lang.summary.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query));
    return matchesTag && matchesSearch;
  });

  if (filtered.length === 0) {
    const msg = currentLang === 'en' ? 'No papers found.' : '논문을 찾을 수 없습니다.';
    grid.innerHTML = `<div class="empty-state"><p>${msg}</p></div>`;
    return;
  }

  // Sort by date descending
  filtered.sort((a, b) => b.date.localeCompare(a.date));

  grid.innerHTML = filtered.map(p => {
    const lang = p[currentLang];
    const imageHtml = p.image
      ? `<img class="card-image" src="${p.image}" alt="${lang.title}" onerror="this.outerHTML='<div class=\\'card-image-placeholder\\'><span>&#9781;</span></div>'">`
      : `<div class="card-image-placeholder"><span>&#9781;</span></div>`;
    return `
      <div class="paper-card" onclick="location.href='paper.html?id=${p.id}'">
        ${imageHtml}
        <div class="card-body">
          <span class="date">${formatDate(p.date)} · ${p.venue}</span>
          <h3>${lang.title}</h3>
          <p class="authors">${p.authors}</p>
          <div class="tags">
            ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderTagFilters();
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

  document.title = `${lang.title} \u2014 Paper Reviews`;

  container.innerHTML = `
    <a href="index.html" class="back-link">${backText}</a>
    <div class="meta">
      <p class="date">${formatDate(paper.date)} \xb7 ${paper.venue}</p>
      <h1>${lang.title}</h1>
      <p class="authors">${paper.authors}</p>
      ${paper.link ? `<a href="${paper.link}" class="paper-link" target="_blank" rel="noopener">${linkText}</a>` : ''}
      <div class="tags">
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
