/* ==========================================================
   PORTFOLIO — script.js
   1. Helpers            4. Header (scroll shadow, mobile menu)
   2. Frame data         5. Active nav link
   3. Board rendering    6. Init
   ========================================================== */

/* 1. HELPERS ------------------------------------------------------ */
const $  = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

// localStorage can be blocked (private mode), so always guard it.
const load = (key) => {
  try { return JSON.parse(localStorage.getItem(key)) || []; }
  catch { return []; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* storage unavailable: the site still works, it just won't remember */ }
};

const STORAGE_KEY = 'portfolio-visited';
const SECTIONS = ['about', 'projects', 'activities', 'awards'];


/* 2. FRAME DATA ----------------------------------------------------
   Order matters — it matches the collage positions in style.css:
     1 top-left (square)      → About Me
     2, 3 top-right (pair)    → Projects
     4, 5 bottom-left (pair)  → Student Activities
     6 bottom-right (double)  → Awards
   PHOTOS: set `image` (or two paths in `images` for the double frame),
   e.g.  image: 'pictures/about/me.jpg'. Leave empty for a placeholder. */
const frames = [
  {
    section: 'about',
    name: 'ჩემს შესახებ',
    image: 'pictures/about%20me/100_0014%20(6).JPG'
  },
  {
    section: 'projects',
    name: 'პროექტები',
    image: 'pictures/projects/Millo.png'
  },
  {
    section: 'projects',
    name: 'საკონფერენციო ნაშრომი',
    image: 'pictures/projects/pino.png'
  },
  {
    section: 'activities',
    name: 'KIU საფეხბურთო ჩემპიონატის ორგანიზატორი',
    image: 'pictures/student%20activities/champ-browser.jpg'
  },
  {
    section: 'activities',
    name: 'მენეჯმენტ მენტორი',
    image: 'pictures/student%20activities/mentors.jpg'
  },
  {
    section: 'awards',
    name: 'სტიპენდიები და სერთიფიკატები',
    images: ['pictures/stipend/stipend_1.jpg', 'pictures/stipend/stipend_2.jpg'] // two photos side by side
  }
];


/* 3. BOARD RENDERING ----------------------------------------------- */
const scrollToBoardIntro = () => window.scrollTo({ top: 270, behavior: 'instant' });

window.addEventListener('load', () => {
  if (!window.location.hash) scrollToBoardIntro();
});

$('.logo')?.addEventListener('click', (event) => {
  event.preventDefault();
  scrollToBoardIntro();
});



const photoMarkup = (src, alt) =>
  src
    ? `<img class="frame-img" src="${src}" alt="${alt}" loading="lazy" />`
    : `<div class="frame-img frame-img--empty"><small>Add photo</small></div>`;

const frameMarkup = (frame, visited) => {
  const media = frame.images
    ? `<div class="frame-media frame-media--double">
         ${frame.images.map((src) => `<div class="frame-pane">${photoMarkup(src, frame.name)}</div>`).join('')}
       </div>`
    : `<div class="frame-media">${photoMarkup(frame.image, frame.name)}</div>`;

  return `
    <a class="club-frame${visited.includes(frame.section) ? ' visited' : ''}"
       href="#${frame.section}" data-section="${frame.section}"
       aria-label="${frame.name}: go to ${frame.section} section">
      <span class="frame-deco" aria-hidden="true"></span>
      ${media.replace(/(<\/div>\s*)$/, `
        <div class="frame-overlay">
          <span class="overlay-cta">უფრო მეტი</span>
        </div>$1`)}
      <div class="frame-caption"><span class="club-name">${frame.name}</span></div>
    </a>`;
};

const updateVisitCount = () => {
  const badge = $('#visit-count');
  if (!badge) return;
  const count = load(STORAGE_KEY).length;
  badge.textContent = count
    ? `You've explored ${count} of ${SECTIONS.length} sections`
    : 'Tap a photo to explore';
};

const renderBoard = () => {
  const grid = $('#board-grid');
  if (!grid) return;
  const visited = load(STORAGE_KEY);
  grid.innerHTML = frames.map((frame) => frameMarkup(frame, visited)).join('');
  updateVisitCount();
};

// One click listener handles frame selection; the link still handles scrolling.
const initBoard = () => {
  const grid = $('#board-grid');
  if (!grid) return;

  grid.addEventListener('click', (event) => {
    const frame = event.target.closest('.club-frame');
    if (!frame) return;
    const section = frame.dataset.section;
    const visited = load(STORAGE_KEY);
    const nextVisited = visited.includes(section)
      ? visited.filter((id) => id !== section)
      : [...visited, section];
    save(STORAGE_KEY, nextVisited);
    $$(`.club-frame[data-section="${section}"]`, grid)
      .forEach((f) => f.classList.toggle('visited', nextVisited.includes(section)));
    updateVisitCount();
  });
};


const initProjectsCarousel = () => {
  const carousel = $('.projects-carousel');
  if (!carousel) return;

  const viewport = $('.project-pages', carousel);
  const sourcePages = $$('[data-project-page]', carousel);
  const projectCards = sourcePages.flatMap((page) => $$('.card', page));
  if (!viewport || !projectCards.length) return;

  const track = document.createElement('div');
  track.className = 'project-track';
  projectCards.forEach((card) => track.append(card));
  viewport.replaceChildren(track);

  const buttons = $$('[data-project-direction]', carousel);
  const status = $('#projects-page-status');
  if (!buttons.length) return;

  const moveCount = 2;
  let firstVisibleIndex = 0;
  let isMoving = false;
  const moveQueue = [];

  const isVertical = () => window.matchMedia('(max-width: 900px)').matches;
  const updateViewportHeight = () => {
    if (!isVertical()) {
      viewport.style.height = '';
      return;
    }

    const visibleCards = [...track.children].slice(0, 3);
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const visibleHeight = visibleCards.reduce(
      (height, card) => height + card.getBoundingClientRect().height,
      0
    );
    viewport.style.height = `${visibleHeight + gap * 2}px`;
  };

  const updateLayout = () => {
    const vertical = isVertical();
    if (vertical) {
      track.style.transform = 'translateY(0px)';
    } else {
      track.style.transform = 'translateX(0px)';
    }
    updateViewportHeight();

    if (status) {
      const lastVisibleIndex = (firstVisibleIndex + 2) % projectCards.length;
      status.textContent = `${firstVisibleIndex + 1}-${lastVisibleIndex + 1} / ${projectCards.length}`;
    }
  };

  const animateTrack = async (from, to) => {
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420;
    if (!duration) {
      track.style.transform = to;
      return;
    }

    const animation = track.animate(
      [{ transform: from }, { transform: to }],
      { duration, easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)' }
    );
    await animation.finished.catch(() => {});
    track.style.transform = to;
    animation.cancel();
  };

  const moveCards = async (direction) => {
    const vertical = isVertical();
    const axis = vertical ? 'Y' : 'X';
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    const cards = [...track.children];
    const movingCards = direction > 0
      ? cards.slice(0, moveCount)
      : cards.slice(-moveCount);
    const distance = movingCards.reduce(
      (size, card) => size + card.getBoundingClientRect()[vertical ? 'height' : 'width'],
      gap * (moveCount - 1)
    );
    const offset = `${-distance}px`;
    const zeroPosition = `translate${axis}(0px)`;
    const shiftedPosition = `translate${axis}(${offset})`;

    if (direction < 0) {
      movingCards.reverse().forEach((card) => track.prepend(card));
      track.style.transform = shiftedPosition;
      updateViewportHeight();
      await animateTrack(shiftedPosition, zeroPosition);
    } else {
      await animateTrack(zeroPosition, shiftedPosition);
      movingCards.forEach((card) => track.append(card));
      track.style.transform = zeroPosition;
    }

    firstVisibleIndex = (firstVisibleIndex + direction * moveCount + projectCards.length)
      % projectCards.length;
    updateLayout();
  };

  const processMoveQueue = async () => {
    if (isMoving) return;
    isMoving = true;
    while (moveQueue.length) await moveCards(moveQueue.shift());
    isMoving = false;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      moveQueue.push(Number(button.dataset.projectDirection));
      processMoveQueue();
    });
  });

  window.addEventListener('resize', () => {
    if (!isMoving) updateLayout();
  }, { passive: true });
  if ('ResizeObserver' in window) {
    const cardObserver = new ResizeObserver(updateViewportHeight);
    projectCards.forEach((card) => cardObserver.observe(card));
  }
  document.fonts?.ready.then(updateViewportHeight);
  projectCards.forEach((card) => {
    $$('img', card).forEach((image) => {
      if (!image.complete) image.addEventListener('load', updateViewportHeight, { once: true });
    });
  });
  updateLayout();
};


/* 4. HEADER -------------------------------------------------------- */
const initHeader = () => {
  const header = $('#site-header');
  const toggle = $('#nav-toggle');
  const nav = $('#site-nav');
  if (!header || !toggle || !nav) return;

  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const setMenu = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };
  toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
};


/* 5. ACTIVE NAV LINK ----------------------------------------------- */
const initActiveNav = () => {
  if (!('IntersectionObserver' in window)) return;
  const links = $$('#site-nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) =>
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });

  // Back on the board → clear the highlight
  const board = $('#board');
  if (board) new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) links.forEach((link) => link.classList.remove('active'));
  }, { rootMargin: '-45% 0px -50% 0px' }).observe(board);
};


/* 6. INIT ---------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  renderBoard();
  initBoard();
  initProjectsCarousel();
  initHeader();
  initActiveNav();

  const toggle = $('.skills-toggle');
  const defaultCopy = $('.about-copy-default');
  const facts = $('#about-facts');
  const panel = $('#skills-detail-panel');

  if (toggle && defaultCopy && facts && panel) {
    toggle.addEventListener('click', () => {
      const shouldOpen = panel.hidden;
      panel.hidden = !shouldOpen;
      defaultCopy.hidden = shouldOpen;
      facts.hidden = shouldOpen;
      toggle.setAttribute('aria-expanded', String(shouldOpen));
      toggle.textContent = shouldOpen ? 'უკან' : 'ჩემი უნარები';
    });
  }

  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
});
