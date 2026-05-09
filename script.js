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
  // ── index.html ────────────────────────────────────────
  { title: 'Home – Overview',           keywords: 'home medcare usability evaluation report overview team members',  url: 'index.html' },
  { title: 'Our Team',                  keywords: 'team members leader karl laurence piano jay ann mae peñaflor eldwin crissel george',  url: 'index.html#team' },

  // ── Participant.html ──────────────────────────────────
  { title: 'Participant Background',    keywords: 'participant background profiles bsa partido state university students',  url: 'Participant.html' },
  { title: 'Study Overview',            keywords: 'study overview participants tasks sessions psu bsa',  url: 'Participant.html' },
  { title: 'Participant Profiles',      keywords: 'participant profiles p1 p2 p3 p4 p5 p6 female male year level tech savvy',  url: 'Participant.html' },
  { title: 'Selection Criteria',        keywords: 'selection criteria inclusion requirements study setting think aloud',  url: 'Participant.html' },

  // ── decide_framework.html ─────────────────────────────
  { title: 'DECIDE Framework',          keywords: 'decide framework evaluation methodology overview',  url: 'decide_framework.html' },
  { title: 'D – Determine the Goals',   keywords: 'determine goals medcare usability evaluation goals first-glance navigation',  url: 'decide_framework.html#step-d1' },
  { title: 'E – Explore the Questions', keywords: 'explore questions background task-based questions prescription delivery tracking clicks',  url: 'decide_framework.html#step-e1' },
  { title: 'C – Choose Methods',        keywords: 'choose methods moderated usability testing sus system usability scale questionnaire',  url: 'decide_framework.html#step-c' },
  { title: 'I – Identify Practical Issues', keywords: 'identify practical issues participants logistics table gender age year course',  url: 'decide_framework.html#step-i' },
  { title: 'D – Decide on Ethical Issues', keywords: 'ethical issues informed consent form voluntary confidential signature',  url: 'decide_framework.html#step-d2' },
  { title: 'E – Evaluate & Analyze Data',  keywords: 'evaluate analyze present data usability metrics targets time on task satisfaction score',  url: 'decide_framework.html#step-e2' },

  // ── task.html ─────────────────────────────────────────
  { title: 'List of Tasks and Scenarios', keywords: 'tasks scenarios list usability test task scenario',  url: 'task.html' },

  // ── results.html ──────────────────────────────────────
  { title: 'Result of Usability Test',  keywords: 'results usability test decide framework application',  url: 'results.html' },
  { title: 'Task 1 Results',            keywords: 'task 1 result success rate time to complete satisfaction complexity observations',  url: 'results.html' },
  { title: 'Task 2 Results',            keywords: 'task 2 result success rate pain points challenges',  url: 'results.html' },
  { title: 'Task 3 Results',            keywords: 'task 3 result success rate insights learnings',  url: 'results.html' },
  { title: 'Average Usability Measurement', keywords: 'average usability measurement overall success rate average task time satisfaction score participants',  url: 'results.html' },
  { title: 'Participant Results',       keywords: 'participant results individual data name age role task feedback',  url: 'results.html' },
  { title: 'Feedback and Suggestions',  keywords: 'feedback suggestions participants quotes themes',  url: 'results.html' },
  { title: 'Summarized Usability Test', keywords: 'summarize usability test findings conclusions recommended next steps high medium low priority',  url: 'results.html' },

  // ── Improvement.html ──────────────────────────────────
  { title: 'Prototype Improvement',     keywords: 'prototype improvement changes redesign updated version',  url: 'Improvement.html' },

  // ── findings.html ─────────────────────────────────────
  { title: 'Additional Findings',       keywords: 'additional findings usability issues navigation slow task mobile responsiveness feedback confirmation',  url: 'findings.html' },
  { title: 'Navigation Confusion',      keywords: 'navigation confusion unclear labels inconsistent menu placement',  url: 'findings.html' },
  { title: 'Slow Task Completion',      keywords: 'slow task completion booking appointments inefficiencies',  url: 'findings.html' },
  { title: 'Mobile Responsiveness Issues', keywords: 'mobile responsiveness smaller screens readability interaction',  url: 'findings.html' },
  { title: 'Lack of Feedback',          keywords: 'lack of feedback confirmation messages uncertainty system feedback',  url: 'findings.html' },

  // ── reflect.html ──────────────────────────────────────
  { title: 'Reflections',               keywords: 'reflections insights learnings team',  url: 'reflect.html' },
  { title: 'What We Learned',           keywords: 'what we learned user-centered design healthcare interface issues task completion',  url: 'reflect.html' },
  { title: 'Team Collaboration',        keywords: 'team collaboration diverse perspectives insights evaluation outcomes',  url: 'reflect.html' },
  { title: 'Challenges Encountered',    keywords: 'challenges time constraints coordinating schedules usability issues categorized',  url: 'reflect.html' },
  { title: 'Future Improvements',       keywords: 'future improvements expand testing more participants refine prototype',  url: 'reflect.html' },

  // ── prototype.html ────────────────────────────────────
  { title: 'Prototype Walkthrough',     keywords: 'prototype walkthrough figma interactive design video',  url: 'prototype.html' },

  // ── videodemo.html ────────────────────────────────────
  { title: 'Video Demonstration',       keywords: 'video demonstration youtube medcare patient portal features',  url: 'videodemo.html' },
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
      'decide_framework.html': 'DECIDE Framework',
      'task.html': 'Tasks & Scenarios',
      'results.html': 'Usability Results',
      'Improvement.html': 'Prototype Improvement',
      'findings.html': 'Additional Findings',
      'reflect.html': 'Reflections',
      'prototype.html': 'Prototype Walkthrough',
      'videodemo.html': 'Video Demonstration',
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