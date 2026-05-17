/* =========================================================
   MedCare – script.js
   Handles: navbar scroll, hamburger, dropdown, search overlay
   ========================================================= */

// ── Navbar scroll shadow ──────────────────────────────────
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (mainNav) {
    mainNav.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// ── Hamburger / mobile menu ───────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
  });
}

// ── Desktop "More" dropdown ───────────────────────────────
const moreBtn      = document.getElementById('moreBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

if (moreBtn && dropdownMenu) {
  moreBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdownMenu.classList.remove('open'));
}

// ── Step-pill active state (DECIDE page) ─────────────────
const stepPills = document.querySelectorAll('.step-pill');
if (stepPills.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        stepPills.forEach(p => p.classList.remove('active'));
        const active = document.querySelector(`.step-pill[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[id^="step-"]').forEach(el => observer.observe(el));
}

/* =========================================================
   SEARCH  –  cross-page navigation
   ========================================================= */

// Full index of every searchable section across all pages.
// Each entry: { title, keywords, url }
const SEARCH_INDEX = [

  // ── index.html ─────────────────────────────────────────
  { title: 'Home – MedCare Usability Evaluation',
    keywords: 'home medcare usability evaluation report overview patient portal',
    url: 'index.html' },
  { title: 'Our Team',
    keywords: 'team members leader karl laurence piano jay ann mae peñaflor eldwin joshua balacanao crissel perias george villareal exp lane member',
    url: 'index.html#team' },
  { title: 'Team Stats – 5 Members, DECIDE Framework',
    keywords: '5 team members 6 evaluation sections decide framework stats',
    url: 'index.html' },

  // ── data_gathering.html ────────────────────────────────
  { title: 'Data Gathering – DECIDE Framework',
    keywords: 'decide framework evaluation methodology data gathering structured approach',
    url: 'data_gathering.html' },
  { title: 'D – Determine the Goals',
    keywords: 'determine goals usability testing medcare efficiency reliable first-glance navigation accessibility pharmacy patients buyers',
    url: 'data_gathering.html#step-d1' },
  { title: 'E – Explore the Questions',
    keywords: 'explore questions background demographic profile age gender course year level prior experience technology sus system usability scale i found the system easy complex',
    url: 'data_gathering.html#step-e1' },
  { title: 'C – Choose Evaluation Methods',
    keywords: 'choose methods moderated usability testing partido state university bsa accountancy think-aloud protocol time errors verbal feedback sus questionnaire',
    url: 'data_gathering.html#step-c' },
  { title: 'I – Identify Practical Issues / Heuristic Evaluation',
    keywords: 'identify practical issues heuristic evaluation karl piano jay ann peñaflor eldwin balacanao george villareal member report download pdf nielsen',
    url: 'data_gathering.html#step-i' },
  { title: 'D – Decide on Ethical Issues / Informed Consent',
    keywords: 'ethical issues informed consent form voluntary confidential participation withdraw signature ordering medicine tracking orders pharmacy inventory 10-15 minutes',
    url: 'data_gathering.html#step-d2' },
  { title: 'E – Evaluate, Analyze & Present Data / Usability Metrics',
    keywords: 'evaluate analyze present data usability metrics targets time on task log in create account google pharmacy shop browse buy payment cart message notifications profile edit language log out current target level',
    url: 'data_gathering.html#step-e2' },

  // ── task.html ──────────────────────────────────────────
  { title: 'List of Tasks',
    keywords: 'list of tasks scenarios usability evaluation complete set',
    url: 'task.html' },
  { title: 'Task – Log In',
    keywords: 'log in login existing account forgot password create new account continue with google',
    url: 'task.html' },
  { title: 'Task – Homepage: Pharmacy',
    keywords: 'homepage pharmacy locations check call pharmacy',
    url: 'task.html' },
  { title: 'Task – Homepage: Shop',
    keywords: 'shop browse buy products proceed payment choose payment method cart delete increase quantity',
    url: 'task.html' },
  { title: 'Task – Message',
    keywords: 'message view messages pharmacy conversation type send',
    url: 'task.html' },
  { title: 'Task – Notifications',
    keywords: 'notifications check messages track status progress order',
    url: 'task.html' },
  { title: 'Task – Profile',
    keywords: 'profile edit information change language settings payment methods log out account',
    url: 'task.html' },

  // ── results.html ───────────────────────────────────────
  { title: 'Results – Usability Test Overview',
    keywords: 'results usability test 40 participants partido state university programs bsed bsa bacom bsbio bsba',
    url: 'results.html' },
  { title: 'DECIDE Framework Application',
    keywords: 'decide framework application determine explore choose identify decide evaluate goals navigation satisfaction consent sus moderated testing',
    url: 'results.html#decide' },
  { title: 'Overall SUS Score',
    keywords: 'sus score system usability scale 0 100 overall score 71.5 good usability benchmark 68',
    url: 'results.html#sus-score' },
  { title: 'SUS Questionnaire Results',
    keywords: 'sus questionnaire q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 average rating strongly agree disagree complex easy confident cumbersome inconsistent integrated frequently learn',
    url: 'results.html#sus-score' },
  { title: 'Participant Results Table',
    keywords: 'participant results p1 p2 p3 p4 p5 individual data gender program year prior experience tech usage sus score excellent good ok poor',
    url: 'results.html' },
  { title: 'Feedback and Suggestions from Participants',
    keywords: 'feedback suggestions high ease of use navigation complex q3 easy q2 complex q7 learn quickly q4 technical support bsa bacom program variation',
    url: 'results.html#feedback' },
  { title: 'Summarize Usability Test',
    keywords: 'summarize usability test mean sus 71.5 median 72.5 40 participants 8 programs good classification positive negative statements',
    url: 'results.html#summary' },
  { title: 'Recommended Next Steps – High Priority',
    keywords: 'recommended next steps high priority simplify shop checkout flow onboarding guided tour tooltips first login new users',
    url: 'results.html#summary' },
  { title: 'Recommended Next Steps – Medium Priority',
    keywords: 'medium priority navigation labels consistency system feedback confirmations success error messages purchasing profile',
    url: 'results.html#summary' },
  { title: 'Recommended Next Steps – Low Priority',
    keywords: 'low priority mobile responsiveness smaller screens expand evaluation scope older users healthcare staff',
    url: 'results.html#summary' },

  // ── findings.html ──────────────────────────────────────
  { title: 'Additional Findings',
    keywords: 'additional findings key usability issues identified testing medcare patient portal',
    url: 'findings.html' },
  { title: 'Performance & Lagging Issues',
    keywords: 'performance lagging lag slow system responsive smooth functions efficiency',
    url: 'findings.html' },
  { title: 'Need for Step-by-Step Instructions',
    keywords: 'step by step instructions confusion unfamiliar users guide',
    url: 'findings.html' },
  { title: 'Tutorial for Older Users',
    keywords: 'tutorial older users step by step process guided',
    url: 'findings.html' },
  { title: 'Overall Efficiency Improvement',
    keywords: 'overall efficiency improvement performance expectations',
    url: 'findings.html' },
  { title: 'Prescription Validation Concern',
    keywords: 'prescription validation doctor valid legitimate feature',
    url: 'findings.html' },
  { title: 'PIN/Password Security for Transactions',
    keywords: 'pin password security transactions financial purchase verification account owner',
    url: 'findings.html' },
  { title: 'More Detailed Product Information',
    keywords: 'product information health related informed decisions purchasing detailed',
    url: 'findings.html' },
  { title: 'Expand Product Variety in Shop',
    keywords: 'expand product variety shop medicines water personal care kits diverse',
    url: 'findings.html' },
  { title: 'Add Local Products to the Shop',
    keywords: 'local products shop foreign common area accessible relevant',
    url: 'findings.html' },
  { title: 'Minor Malfunctions Affecting Outcome',
    keywords: 'minor malfunctions system outcome improving enhancing smoothly',
    url: 'findings.html' },
  { title: 'Lagging Causes Functional Failures',
    keywords: 'lagging functional failures fix fully functional perform well',
    url: 'findings.html' },

  // ── reflect.html ───────────────────────────────────────
  { title: 'Reflections',
    keywords: 'reflections team insights learnings medcare usability evaluation',
    url: 'reflect.html' },
  { title: 'What We Learned',
    keywords: 'what we learned user-centered design healthcare interface issues task completion small interface problems',
    url: 'reflect.html' },
  { title: 'Team Collaboration',
    keywords: 'team collaboration diverse perspectives unique ideas evaluation process final outcomes',
    url: 'reflect.html' },
  { title: 'Challenges Encountered',
    keywords: 'challenges encountered usability issues categorized time constraints coordinating schedules',
    url: 'reflect.html' },
  { title: 'Future Improvements',
    keywords: 'future improvements expand testing more participants refine prototype feedback enhance usability',
    url: 'reflect.html' },

  // ── prototype.html ─────────────────────────────────────
  { title: 'Prototype Walkthrough',
    keywords: 'prototype walkthrough figma interactive design screens interactions open figma',
    url: 'prototype.html' },

  // ── videodemo.html ─────────────────────────────────────
  { title: 'Video Demonstration',
    keywords: 'video demonstration medcare patient portal works improved usability features demo',
    url: 'videodemo.html' },

  // ── documentation.html ─────────────────────────────────
  { title: 'Documentation',
    keywords: 'documentation project comprehensive reference methodology tools team roles materials',
    url: 'documentation.html' },
  { title: 'Project Overview',
    keywords: 'project overview medcare patient portal digital health appointments prescriptions messages pharmacy decide framework 40 students partido state university 2024 2025',
    url: 'documentation.html' },
  { title: 'Objectives',
    keywords: 'objectives ease navigation first-glance clarity task completion time-on-task satisfaction pain points login shop messaging profile recommendations',
    url: 'documentation.html' },
  { title: 'Tools & Materials',
    keywords: 'tools materials screen recording think-aloud sus questionnaire heuristic evaluation nielsen figma html css javascript google fonts youtube',
    url: 'documentation.html' },
  { title: 'Website Structure / Pages',
    keywords: 'website structure pages index data gathering task results documentation reflections additional findings prototype walkthrough video demonstration site map',
    url: 'documentation.html' },
  { title: 'Survey Documentation Photos',
    keywords: 'survey documentation photos pictures usability evaluation partido state university session',
    url: 'documentation.html' },
];

// ── DOM refs ──────────────────────────────────────────────
const searchBtn     = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose   = document.getElementById('searchClose');
const searchInput   = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

function openSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.add('open');
  setTimeout(() => searchInput && searchInput.focus(), 80);
}

function closeSearch() {
  if (!searchOverlay) return;
  searchOverlay.classList.remove('open');
  if (searchInput) searchInput.value = '';
  renderHint();
}

function renderHint() {
  if (searchResults) searchResults.innerHTML = '<p class="search-hint">Type to search sections…</p>';
}

if (searchBtn)   searchBtn.addEventListener('click', openSearch);
if (searchClose) searchClose.addEventListener('click', closeSearch);

// Close on backdrop click
if (searchOverlay) {
  searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSearch();
});

// ── Search logic ──────────────────────────────────────────
function query(text) {
  if (!text.trim()) return [];
  const words = text.toLowerCase().trim().split(/\s+/);
  return SEARCH_INDEX.filter(item => {
    const haystack = (item.title + ' ' + item.keywords).toLowerCase();
    return words.every(w => haystack.includes(w));
  }).slice(0, 8); // cap at 8 results
}

function renderResults(results, raw) {
  if (!searchResults) return;
  if (!raw.trim()) { renderHint(); return; }

  if (!results.length) {
    searchResults.innerHTML = '<p class="search-hint">No results found. Try different keywords.</p>';
    return;
  }

  searchResults.innerHTML = results.map(r => {
    // Derive a friendly page label from the URL
    const pageMap = {
      'index.html': 'Home',
      'Participant.html': 'Participant Background',
      'data_gathering.html': 'Data Gathering',
      'task.html': 'Tasks & Scenarios',
      'results.html': 'Usability Results',
      'Improvement.html': 'Prototype Improvement',
      'findings.html': 'Additional Findings',
      'reflect.html': 'Reflections',
      'prototype.html': 'Prototype Walkthrough',
      'videodemo.html': 'Video Demonstration',
      'documentation.html': 'Documentation',
    };
    const base = r.url.split('#')[0];
    const page = pageMap[base] || base;

    return `
      <div class="search-result-item" data-url="${r.url}" tabindex="0" role="button">
        <div class="sr-title">${r.title}</div>
        <div class="sr-page">${page}</div>
      </div>`;
  }).join('');

  // Click / Enter to navigate
  searchResults.querySelectorAll('.search-result-item').forEach(el => {
    const navigate = () => {
      const url = el.getAttribute('data-url');
      closeSearch();
      // If we're already on the same page, just scroll to anchor
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      const targetPage  = url.split('#')[0];
      const anchor      = url.includes('#') ? url.split('#')[1] : null;

      if (currentPage === targetPage || (currentPage === '' && targetPage === 'index.html')) {
        if (anchor) {
          const target = document.getElementById(anchor);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.location.href = url;
      }
    };

    el.addEventListener('click', navigate);
    el.addEventListener('keydown', e => { if (e.key === 'Enter') navigate(); });
  });
}

if (searchInput) {
  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    renderResults(query(val), val);
  });
}

// ── Documentation lightbox (only on documentation.html) ──
const lb = document.getElementById('docLightbox');
if (lb) {
  const docPhotos = ['pic1.jpeg','pic2.jpeg','pic3.jpeg','pic4.jpeg','pic5.jpeg','pic6.jpeg','pic7.jpeg','pic8.jpeg','pic9.jpeg','pic10.jpeg','pic11.jpeg','pic12.jpeg','pic13.jpeg','pic14.jpeg','pic15.jpeg','pic16.jpeg'];
  let docCurrentIndex = 0;
  const lbImg     = document.getElementById('docLightboxImg');
  const lbCounter = document.getElementById('docLightboxCounter');

  window.openLightbox = function(index) {
    docCurrentIndex = index;
    lbImg.src = docPhotos[docCurrentIndex];
    lbCounter.textContent = (docCurrentIndex + 1) + ' / ' + docPhotos.length;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };
  window.closeLightbox = function() {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  };
  window.prevPhoto = function() {
    docCurrentIndex = (docCurrentIndex - 1 + docPhotos.length) % docPhotos.length;
    lbImg.src = docPhotos[docCurrentIndex];
    lbCounter.textContent = (docCurrentIndex + 1) + ' / ' + docPhotos.length;
  };
  window.nextPhoto = function() {
    docCurrentIndex = (docCurrentIndex + 1) % docPhotos.length;
    lbImg.src = docPhotos[docCurrentIndex];
    lbCounter.textContent = (docCurrentIndex + 1) + ' / ' + docPhotos.length;
  };

  lb.addEventListener('click', function(e) { if (e.target === lb) window.closeLightbox(); });
  document.addEventListener('keydown', function(e) {
    if (lb.style.display === 'flex') {
      if (e.key === 'ArrowRight') window.nextPhoto();
      if (e.key === 'ArrowLeft')  window.prevPhoto();
      if (e.key === 'Escape')     window.closeLightbox();
    }
  });
}
