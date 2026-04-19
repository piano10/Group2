// ── Navigation pages data for search ──
const navPages = [
  { title: "Home", href: "#home", icon: "🏠" },
  { title: "Participant Background", href: "#participant", icon: "👥" },
  { title: "DECIDE Framework", href: "#decide", icon: "📋" },
  { title: "List of Tasks and Scenario", href: "#tasks", icon: "✅" },
  { title: "Result of Usability Test", href: "#results", icon: "📊" },
  { title: "Prototype Improvement", href: "#prototype", icon: "🔧" },
  { title: "Reflections", href: "#reflections", icon: "💭" },
  { title: "Additional Findings", href: "#additional-findings", icon: "🔍" },
  { title: "Prototype Walkthrough", href: "#prototype-walkthrough", icon: "🖥️" },
  { title: "Video Demonstration", href: "#video-demonstration", icon: "🎬" },
];

// ── Elements ──
const hamburger    = document.getElementById('hamburger');
const mobileMenu   = document.getElementById('mobileMenu');
const moreBtn      = document.getElementById('moreBtn');
const dropdownMenu = document.getElementById('dropdownMenu');
const searchBtn    = document.getElementById('searchBtn');
const searchOverlay= document.getElementById('searchOverlay');
const searchClose  = document.getElementById('searchClose');
const searchInput  = document.getElementById('searchInput');
const searchResults= document.getElementById('searchResults');

// ── Hamburger ──
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when a link is tapped
mobileMenu.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

// ── More dropdown ──
moreBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  moreBtn.classList.toggle('open');
  dropdownMenu.classList.toggle('open');
});

document.addEventListener('click', () => {
  moreBtn.classList.remove('open');
  dropdownMenu.classList.remove('open');
});

dropdownMenu.addEventListener('click', (e) => e.stopPropagation());

// ── Search ──
function openSearch() {
  searchOverlay.classList.add('open');
  setTimeout(() => searchInput.focus(), 50);
}

function closeSearch() {
  searchOverlay.classList.remove('open');
  searchInput.value = '';
  renderSearchHint();
}

searchBtn.addEventListener('click', openSearch);
searchClose.addEventListener('click', closeSearch);

searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) closeSearch();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSearch();
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openSearch();
  }
});

function renderSearchHint() {
  searchResults.innerHTML = '<p class="search-hint">Type to search sections…</p>';
}

function renderResults(query) {
  const q = query.toLowerCase().trim();
  if (!q) { renderSearchHint(); return; }

  const matches = navPages.filter(p =>
    p.title.toLowerCase().includes(q)
  );

  if (!matches.length) {
    searchResults.innerHTML = '<p class="search-hint">No results found.</p>';
    return;
  }

  searchResults.innerHTML = matches.map(p => `
    <a href="${p.href}" class="search-result-item" onclick="closeSearch()">
      <div class="search-result-icon">${p.icon}</div>
      ${p.title}
    </a>
  `).join('');
}

searchInput.addEventListener('input', () => renderResults(searchInput.value));

// ── Nav scroll highlight ──
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
const mobileLinks = document.querySelectorAll('.mobile-link[href^="#"]');

function highlightNav() {
  const scrollY = window.scrollY + 80;
  let current = '';
  document.querySelectorAll('main, section[id]').forEach(section => {
    if (section.offsetTop <= scrollY) current = section.id;
  });

  [...navLinks, ...mobileLinks].forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

window.addEventListener('scroll', highlightNav, { passive: true });
