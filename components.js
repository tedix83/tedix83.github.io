/**
 * components.js — anarkid.xyz
 * Shared header, nav, and footer for every page.
 *
 * HOW TO USE ON A PAGE:
 *   1. Add <script src="components.js"></script> in <head>
 *   2. Put <div id="site-header"></div> where you want the header+nav
 *   3. Put <div id="site-footer"></div> where you want the footer
 *   4. Set the active nav link by adding this BEFORE the script tag:
 *      <script>const ACTIVE_PAGE = 'about';</script>
 *      Valid values: 'home', 'about', 'running-coaching', 'irl-creations', 'projects'
 */

(function () {

  /* ── SHARED CSS ─────────────────────────────────────────── */
  const css = `
    :root {
      --mint:   #85FFBE;
      --pink:   #E72696;
      --orange: #F99B1D;
      --yellow: #FACF31;
      --black:  #111111;
      --white:  #ffffff;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--white);
      color: var(--black);
      font-family: 'Barlow', sans-serif;
      font-size: 1.1rem;
      min-height: 100vh;
    }

    /* ── HEADER ── */
    header {
      background: var(--black);
      padding: 2.5rem 2rem 1.5rem;
      position: relative;
    }

    header::after {
      content: '';
      display: block;
      height: 6px;
      background: linear-gradient(90deg, var(--mint), var(--pink), var(--orange), var(--yellow));
    }

    .site-title {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 900;
      font-size: clamp(3rem, 8vw, 6rem);
      color: var(--white);
      letter-spacing: -1px;
      line-height: 1;
      text-transform: lowercase;
    }

    .site-title a { text-decoration: none; color: inherit; }
    .site-title span { color: var(--pink); }

    /* ── NAV ── */
    nav {
      background: var(--black);
      padding: 0 2rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
    }

    .nav-links {
      display: flex;
      flex-wrap: wrap;
    }

    nav a {
      font-family: 'Barlow Condensed', sans-serif;
      font-weight: 700;
      font-size: 1.1rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--white);
      text-decoration: none;
      padding: 1rem 1.5rem;
      position: relative;
      transition: color 0.2s;
      display: block;
    }

    nav a::after {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 4px;
      background: var(--pink);
      transform: scaleX(0);
      transition: transform 0.2s;
    }

    nav a:hover { color: var(--yellow); }
    nav a:hover::after { transform: scaleX(1); }

    nav a.active { color: var(--mint); }
    nav a.active::after { transform: scaleX(1); background: var(--mint); }

    .hamburger {
      display: none;
      position: absolute;
      top: 50%;
      right: 2rem;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      flex-direction: column;
      gap: 5px;
      z-index: 100;
    }

    .hamburger span {
      display: block;
      width: 26px;
      height: 3px;
      background: var(--white);
      transition: all 0.2s;
    }

    .hamburger.open span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .hamburger.open span:nth-child(2) { opacity: 0; }
    .hamburger.open span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    @media (max-width: 600px) {
      .hamburger { display: flex; }
      .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
        padding-bottom: 0.5rem;
      }
      .nav-links.open { display: flex; }
      nav a { padding: 0.8rem 0; border-bottom: 1px solid #222; }
      nav a::after { display: none; }
    }

    /* ── FOOTER ── */
    footer {
      background: var(--black);
      color: #888;
      text-align: center;
      padding: 1.5rem 2rem;
      font-size: 0.85rem;
      font-family: 'Barlow Condensed', sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    footer span { color: var(--pink); }

    .footer-social {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      margin-bottom: 1.2rem;
    }

    .footer-social a {
      color: var(--mint);
      display: flex;
      align-items: center;
      transition: color 0.2s, transform 0.2s;
    }

    .footer-social a:hover {
      color: var(--white);
      transform: translateY(-3px);
    }

    .footer-social svg {
      width: 28px;
      height: 28px;
      fill: currentColor;
    }
  `;

  /* ── INJECT CSS ─────────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── NAV LINKS CONFIG ───────────────────────────────────── */
  const navLinks = [
    { id: 'home',            label: 'Home',             href: 'index.html' },
    { id: 'about',           label: 'About Me',         href: 'about.html' },
    { id: 'running-coaching',label: 'Running Coaching', href: 'running-coaching.html' },
    { id: 'irl-creations',   label: 'IRL Creations',    href: 'irl-creations.html' },
    { id: 'projects',        label: 'Projects',         href: 'projects.html' },
  ];

  /* ── BUILD HEADER + NAV ─────────────────────────────────── */
  function buildHeader() {
    const activePage = window.ACTIVE_PAGE || '';

    const linksHTML = navLinks.map(link => {
      const isActive = link.id === activePage ? ' class="active"' : '';
      return `<a href="${link.href}"${isActive}>${link.label}</a>`;
    }).join('\n    ');

    return `
      <header>
        <button class="hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
        <div class="site-title"><a href="index.html">anarkid<span>.xyz</span></a></div>
      </header>
      <nav>
        <div class="nav-links" id="nav-links">
          ${linksHTML}
        </div>
      </nav>
    `;
  }

  /* ── BUILD FOOTER ───────────────────────────────────────── */
  function buildFooter() {
    return `
      <footer>
        <div class="footer-social">
          <!-- Bluesky -->
          <a href="https://bsky.app/profile/anarkid.bsky.social" target="_blank" rel="noopener" aria-label="Bluesky">
            <svg viewBox="0 0 600 530" xmlns="http://www.w3.org/2000/svg">
              <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z"/>
            </svg>
          </a>
          <!-- Strava -->
          <a href="https://www.strava.com/athletes/11624652" target="_blank" rel="noopener" aria-label="Strava">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0 4 13.828h4.172"/>
            </svg>
          </a>
          <!-- Email -->
          <a href="mailto:ted@anarkid.xyz" aria-label="Email">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
        </div>
        <span>anarkid.xyz</span> &mdash; built from scratch
      </footer>
    `;
  }

  /* ── INJECT HEADER ──────────────────────────────────────── */
  const headerSlot = document.getElementById('site-header');
  if (headerSlot) {
    headerSlot.outerHTML = buildHeader();
  }

  /* ── INJECT FOOTER ──────────────────────────────────────── */
  const footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    footerSlot.outerHTML = buildFooter();
  }

  /* ── HAMBURGER MENU ─────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('hamburger');
    const menu = document.getElementById('nav-links');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        btn.classList.toggle('open');
        menu.classList.toggle('open');
      });
    }
  });

})();
