/**
 * Automata Visualizer Pro - Global Components Engine
 * Injects unified, accessible Navigation and Footer into all pages.
 * Handles Lucide Icon rendering and active page detection.
 */

(function () {
  'use strict';

  function getActivePageKey() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    return filename.replace('.html', '');
  }

  function renderNavbar() {
    const activeKey = getActivePageKey();
    const navHTML = `
      <header class="site-header">
        <nav class="navbar glass" aria-label="Main Navigation">
          <div class="brand">
            <a href="index.html" class="brand-link">
              <i data-lucide="cpu" class="brand-icon"></i>
              <span class="brand-title">Automata<span class="gradient">Pro</span></span>
            </a>
            <span class="brand-badge">v1.2</span>
          </div>

          <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-expanded="false" aria-label="Toggle navigation menu">
            <i data-lucide="menu" id="nav-toggle-icon"></i>
          </button>

          <div class="nav-content" id="nav-content">
            <ul class="nav-links" role="menubar">
              <li role="none">
                <a href="index.html" class="nav-link ${activeKey === 'index' || activeKey === '' ? 'active' : ''}" role="menuitem">
                  <i data-lucide="home" class="nav-item-icon"></i>
                  <span>Home</span>
                </a>
              </li>

              <li class="nav-dropdown" role="none">
                <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true" id="converters-menu-btn">
                  <i data-lucide="workflow" class="nav-item-icon"></i>
                  <span>Converters</span>
                  <i data-lucide="chevron-down" class="dropdown-chevron"></i>
                </button>
                <div class="dropdown-menu glass" aria-labelledby="converters-menu-btn" role="menu">
                  <div class="dropdown-group">
                    <span class="dropdown-header">Finite Automata</span>
                    <a href="nfa-to-dfa.html" class="dropdown-item ${activeKey === 'nfa-to-dfa' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="git-merge" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">NFA → DFA</span>
                        <span class="dropdown-desc">Subset construction</span>
                      </div>
                    </a>
                    <a href="enfa-to-dfa.html" class="dropdown-item ${activeKey === 'enfa-to-dfa' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="zap" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">ε-NFA → DFA</span>
                        <span class="dropdown-desc">Epsilon closure</span>
                      </div>
                    </a>
                    <a href="dfa-minimizer.html" class="dropdown-item ${activeKey === 'dfa-minimizer' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="minimize-2" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">DFA Minimizer</span>
                        <span class="dropdown-desc">Table equivalence</span>
                      </div>
                    </a>
                  </div>

                  <div class="dropdown-group">
                    <span class="dropdown-header">Regular Expressions</span>
                    <a href="nfa-to-regex.html" class="dropdown-item ${activeKey === 'nfa-to-regex' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="binary" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">NFA → RegEx</span>
                        <span class="dropdown-desc">State elimination</span>
                      </div>
                    </a>
                    <a href="regex-to-nfa.html" class="dropdown-item ${activeKey === 'regex-to-nfa' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="code-2" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">RegEx → NFA</span>
                        <span class="dropdown-desc">Thompson's method</span>
                      </div>
                    </a>
                  </div>

                  <div class="dropdown-group">
                    <span class="dropdown-header">Grammars & Machines</span>
                    <a href="pda-to-cfg.html" class="dropdown-item ${activeKey === 'pda-to-cfg' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="layers" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">PDA → CFG</span>
                        <span class="dropdown-desc">Grammar derivation</span>
                      </div>
                    </a>
                    <a href="cfl-to-cfg.html" class="dropdown-item ${activeKey === 'cfl-to-cfg' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="list-tree" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">CFL → CFG</span>
                        <span class="dropdown-desc">Grammar rules</span>
                      </div>
                    </a>
                    <a href="tm-to-fa.html" class="dropdown-item ${activeKey === 'tm-to-fa' ? 'active' : ''}" role="menuitem">
                      <i data-lucide="cpu" class="dropdown-icon"></i>
                      <div class="dropdown-text">
                        <span class="dropdown-title">TM → FA</span>
                        <span class="dropdown-desc">Tape approximation</span>
                      </div>
                    </a>
                  </div>
                </div>
              </li>

              <li role="none">
                <a href="help.html" class="nav-link ${activeKey === 'help' ? 'active' : ''}" role="menuitem">
                  <i data-lucide="help-circle" class="nav-item-icon"></i>
                  <span>Help & Guides</span>
                </a>
              </li>
              <li role="none">
                <a href="about.html" class="nav-link ${activeKey === 'about' ? 'active' : ''}" role="menuitem">
                  <i data-lucide="info" class="nav-item-icon"></i>
                  <span>About Us</span>
                </a>
              </li>
              <li role="none">
                <a href="contact.html" class="nav-link ${activeKey === 'contact' ? 'active' : ''}" role="menuitem">
                  <i data-lucide="mail" class="nav-item-icon"></i>
                  <span>Contact</span>
                </a>
              </li>
            </ul>

            <div class="nav-actions">
              <a href="https://github.com/Husrocks/Automata-Converter" target="_blank" rel="noopener noreferrer" class="nav-icon-btn" aria-label="GitHub Repository">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </a>
              <button id="theme-toggle" class="nav-icon-btn" aria-label="Toggle light and dark theme">
                <i data-lucide="moon" id="theme-icon"></i>
              </button>
            </div>
          </div>
        </nav>
      </header>
    `;

    // Mount point resolution:
    const headerContainer = document.getElementById('site-header-container');
    if (headerContainer) {
      headerContainer.innerHTML = navHTML;
    } else {
      const existingNav = document.querySelector('nav.navbar');
      if (existingNav) {
        existingNav.outerHTML = navHTML;
      }
    }

    // Mobile Toggle Handler
    const mobileBtn = document.getElementById('nav-mobile-toggle');
    const navContent = document.getElementById('nav-content');
    if (mobileBtn && navContent) {
      mobileBtn.addEventListener('click', function () {
        const isOpen = navContent.classList.toggle('mobile-open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
      });
    }

    // Converters dropdown click handler for mobile/touch
    const dropdownTrigger = document.getElementById('converters-menu-btn');
    const dropdownParent = dropdownTrigger ? dropdownTrigger.closest('.nav-dropdown') : null;
    if (dropdownTrigger && dropdownParent) {
      dropdownTrigger.addEventListener('click', function (e) {
        e.preventDefault();
        const isOpen = dropdownParent.classList.toggle('open');
        dropdownTrigger.setAttribute('aria-expanded', isOpen);
      });
    }
  }

  function renderFooter() {
    const footerHTML = `
      <footer class="site-footer">
        <div class="footer-container">
          <div class="footer-grid">
            <div class="footer-col brand-col">
              <div class="footer-brand">
                <i data-lucide="cpu" class="footer-brand-icon"></i>
                <span>Automata Visualizer Pro</span>
              </div>
              <p class="footer-desc">An open-source educational visualization tool demystifying formal languages and automata theory algorithms step-by-step.</p>
            </div>
            
            <div class="footer-col">
              <h4>Navigation</h4>
              <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="help.html">Help & Guides</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
            
            <div class="footer-col">
              <h4>Converters</h4>
              <ul>
                <li><a href="nfa-to-dfa.html">NFA to DFA</a></li>
                <li><a href="nfa-to-regex.html">NFA to RegEx</a></li>
                <li><a href="pda-to-cfg.html">PDA to CFG</a></li>
              </ul>
            </div>
          </div>
          
          <div class="footer-bottom">
            <p class="copyright">© 2026 Automata Visualizer Pro. Developed by Hussnain Bashir.</p>
            <div class="footer-socials">
              <a href="https://github.com/Husrocks" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
              <a href="https://www.linkedin.com/in/hussnain-bashir/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
              <a href="https://www.instagram.com/imhussnain.001/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16.11 7.5v-.01"/><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>
    `;

    const footerContainer = document.getElementById('site-footer-container');
    if (footerContainer) {
      footerContainer.innerHTML = footerHTML;
    } else {
      const existingFooter = document.querySelector('footer.custom-footer');
      if (existingFooter) {
        existingFooter.outerHTML = footerHTML;
      } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
      }
    }
  }

  function init() {
    renderNavbar();
    renderFooter();

    // Render Lucide SVG icons across injected DOM nodes
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
