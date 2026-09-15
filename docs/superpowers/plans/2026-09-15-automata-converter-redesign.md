# Automata Visualizer Pro: Redesign & Expansion Specification

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Provide an end-to-end, production-ready technical specification and implementation plan for the Automata-Converter web application, featuring a redesigned Hero page, a centralized and responsive Navigation Bar, three new informational pages (About Us, Help, Contact), and Lucide Icons integration, all tailored for students, educators, researchers, and technical professionals.

**Architecture:** Vanilla HTML5, CSS3, and ES6 JavaScript. Navigation and footer components are centralized in `js/components.js` to eliminate markup duplication across all 9 converter pages and the 3 new pages. Theming and dark mode persist via `js/theme.js` using CSS custom properties. Iconography is rendered dynamically via the Lucide Icons CDN.

**Tech Stack:** Vanilla JavaScript (ES6), Semantic HTML5, CSS3 (Glassmorphism & Flex/Grid), Lucide Icons CDN (`https://unpkg.com/lucide@latest`), Vis.js (existing graph dependency).

## Global Constraints
- **Frameworks:** Strictly Vanilla JavaScript; no React, Vue, Svelte, or external UI component frameworks.
- **CSS Architecture:** Maintain and extend `styles.css` using existing tokens (`--bg`, `--card-bg`, `--accent`, `--primary`, `--text`, `--shadow`). Avoid Tailwind CSS.
- **Dark Mode:** Preserve 100% compatibility with `body.dark` toggle logic in `js/theme.js` and `localStorage` persistence.
- **Icon Library:** Lucide Icons (`data-lucide` syntax with `lucide.createIcons()`).
- **Target Audience:** Students, Educators, Researchers/CS Professionals, and General Technical Audiences.
- **DRY Compliance:** Zero duplicated `<nav>` or `<footer>` HTML across existing converter pages; centralized injection via `js/components.js`.

---

## 1. Target Audience Analysis & UX Design Principles

| Audience Segment | Primary User Goals | Pain Points with Existing Application | Design & UX Principles Applied |
| :--- | :--- | :--- | :--- |
| **Students** | Grasp abstract formal language concepts; verify homework solutions; inspect step-by-step state transitions. | Flashing card animations causing cognitive fatigue; abrupt error states; crowded top nav with 9 flat links. | **Progressive Disclosure & Cognitive Load Reduction (Sweller/Miller's Law):** Categorized tools, step-by-step visual breakdowns, clear input affordances, and beginner guides. |
| **Educators** | Live classroom demonstrations; projecting state diagrams; finding standard theoretical examples. | No centralized help/documentation; difficult to project due to low contrast in light mode; lack of formal tuple definitions. | **Blackboard-Ready Hierarchy & Recognition over Recall (Nielsen):** High-contrast typography (WCAG 2.1 AA compliant), canonical notation ($Q, \Sigma, \delta, q_0, F$), structured classroom examples. |
| **Researchers & CS Professionals** | Validating conversions (Thompson's, subset construction, state elimination); testing boundary cases (empty language $\emptyset$, epsilon $\varepsilon$, exponential state explosion). | Missing implementations for PDA/TM/Minimizer silently failing; lack of algorithmic transparency; no time/space complexity notes. | **Algorithmic Transparency & Error Prevention (Norman):** Complexity annotations ($O(2^n)$ warnings), edge case handling guides, explicit status indicators on cards. |
| **General Technical Audience** | Quick exploration; responsive mobile/desktop usability; modern aesthetic. | 9-link navbar wraps clumsily on tablets and laptops; card hover jitter; duplicate markup bugs. | **Aesthetic-Usability Effect & Fitts's Law:** Polished glassmorphism, consistent padding, mobile drawer navigation, accessible tap targets ($\ge 44 \times 44\text{px}$). |

---

## 2. Navigation Bar Redesign Specification

### 2.1 Visual Layout & Architectural Strategy
The existing navigation bar places 9 separate converter links side-by-side with text arrows (`NFA → DFA`, `ε-NFA → DFA`, etc.). On screens between $700\text{px}$ and $1100\text{px}$, this overflows and breaks into 3 awkward rows.

**Redesign Strategy:**
1. **Brand Identity:** Distinct computational identity with a Lucide `cpu` icon, gradient title, and version badge.
2. **Chunked Navigation (Miller's Law):**
   - **Home** (`home`)
   - **Converters Dropdown** (`workflow` / `chevron-down`): Categorized into:
     - *Finite Automata:* NFA → DFA, ε-NFA → DFA, DFA Minimizer
     - *Regular Expressions:* NFA → RegEx, RegEx → NFA
     - *Grammars & Machines:* PDA → CFG, CFL → CFG, TM → FA
   - **Help & Docs** (`help-circle`)
   - **About Us** (`info`)
   - **Contact** (`mail`)
3. **Utility Controls:**
   - Dark Mode Toggle with dynamic Lucide icon (`sun` / `moon`).
   - GitHub Repository link with Lucide `github` icon.
   - Mobile Hamburger Toggle (`menu` / `x`).
4. **Zero Markup Duplication (`js/components.js`):**
   The `<nav>` is generated dynamically or mounted to `<header id="site-header"></header>`. Each page needs only one mount container, eliminating copy-paste inconsistencies forever.

### 2.2 Reusable Navigation Template Markup
This markup is generated dynamically by `js/components.js`:

```html
<header class="site-header">
  <nav class="navbar glass" aria-label="Main Navigation">
    <div class="brand">
      <a href="index.html" class="brand-link">
        <i data-lucide="cpu" class="brand-icon"></i>
        <span class="brand-title">Automata<span class="gradient">Pro</span></span>
      </a>
      <span class="brand-badge">v1.2</span>
    </div>

    <!-- Mobile Menu Toggle Button -->
    <button class="nav-mobile-toggle" id="nav-mobile-toggle" aria-expanded="false" aria-label="Toggle navigation menu">
      <i data-lucide="menu" id="nav-toggle-icon"></i>
    </button>

    <div class="nav-content" id="nav-content">
      <ul class="nav-links" role="menubar">
        <li role="none">
          <a href="index.html" class="nav-link" data-page="home" role="menuitem">
            <i data-lucide="home" class="nav-item-icon"></i>
            <span>Home</span>
          </a>
        </li>

        <!-- Dropdown: Converters -->
        <li class="nav-dropdown" role="none">
          <button class="nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true" id="converters-menu-btn">
            <i data-lucide="workflow" class="nav-item-icon"></i>
            <span>Converters</span>
            <i data-lucide="chevron-down" class="dropdown-chevron"></i>
          </button>
          <div class="dropdown-menu glass" aria-labelledby="converters-menu-btn" role="menu">
            <div class="dropdown-group">
              <span class="dropdown-header">Finite Automata</span>
              <a href="nfa-to-dfa.html" class="dropdown-item" role="menuitem" data-page="nfa-to-dfa">
                <i data-lucide="git-merge" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">NFA → DFA</span>
                  <span class="dropdown-desc">Powerset subset construction</span>
                </div>
              </a>
              <a href="enfa-to-dfa.html" class="dropdown-item" role="menuitem" data-page="enfa-to-dfa">
                <i data-lucide="zap" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">ε-NFA → DFA</span>
                  <span class="dropdown-desc">Epsilon closure conversion</span>
                </div>
              </a>
              <a href="dfa-minimizer.html" class="dropdown-item" role="menuitem" data-page="dfa-minimizer">
                <i data-lucide="minimize-2" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">DFA Minimizer</span>
                  <span class="dropdown-desc">Table filling & equivalence</span>
                </div>
              </a>
            </div>

            <div class="dropdown-group">
              <span class="dropdown-header">Regular Expressions</span>
              <a href="nfa-to-regex.html" class="dropdown-item" role="menuitem" data-page="nfa-to-regex">
                <i data-lucide="binary" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">NFA → RegEx</span>
                  <span class="dropdown-desc">State elimination method</span>
                </div>
              </a>
              <a href="regex-to-nfa.html" class="dropdown-item" role="menuitem" data-page="regex-to-nfa">
                <i data-lucide="code-2" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">RegEx → NFA</span>
                  <span class="dropdown-desc">Thompson's syntax tree construction</span>
                </div>
              </a>
            </div>

            <div class="dropdown-group">
              <span class="dropdown-header">Grammars & Machines</span>
              <a href="pda-to-cfg.html" class="dropdown-item" role="menuitem" data-page="pda-to-cfg">
                <i data-lucide="layers" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">PDA → CFG</span>
                  <span class="dropdown-desc">Tri-variable grammar derivation</span>
                </div>
              </a>
              <a href="cfl-to-cfg.html" class="dropdown-item" role="menuitem" data-page="cfl-to-cfg">
                <i data-lucide="list-tree" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">CFL → CFG</span>
                  <span class="dropdown-desc">Context-free grammar rules</span>
                </div>
              </a>
              <a href="tm-to-fa.html" class="dropdown-item" role="menuitem" data-page="tm-to-fa">
                <i data-lucide="cpu" class="dropdown-icon"></i>
                <div class="dropdown-text">
                  <span class="dropdown-title">TM → FA</span>
                  <span class="dropdown-desc">Bounded tape approximation</span>
                </div>
              </a>
            </div>
          </div>
        </li>

        <li role="none">
          <a href="help.html" class="nav-link" data-page="help" role="menuitem">
            <i data-lucide="help-circle" class="nav-item-icon"></i>
            <span>Help & Guides</span>
          </a>
        </li>
        <li role="none">
          <a href="about.html" class="nav-link" data-page="about" role="menuitem">
            <i data-lucide="info" class="nav-item-icon"></i>
            <span>About Us</span>
          </a>
        </li>
        <li role="none">
          <a href="contact.html" class="nav-link" data-page="contact" role="menuitem">
            <i data-lucide="mail" class="nav-item-icon"></i>
            <span>Contact</span>
          </a>
        </li>
      </ul>

      <!-- Action & Utility Controls -->
      <div class="nav-actions">
        <a href="https://github.com/Husrocks/Automata-Converter" target="_blank" rel="noopener noreferrer" class="nav-icon-btn" aria-label="GitHub Repository">
          <i data-lucide="github"></i>
        </a>
        <button id="theme-toggle" class="nav-icon-btn" aria-label="Toggle light and dark mode">
          <i data-lucide="moon" id="theme-icon"></i>
        </button>
      </div>
    </div>
  </nav>
</header>
```

### 2.3 CSS Styling for the Redesigned Navigation
Add to `styles.css`:

```css
/* ==========================================================================
   Navigation Bar Redesign with Lucide Icons
   ========================================================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 2.2rem;
  border-radius: 0 0 20px 20px;
  position: relative;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.brand-icon {
  width: 28px;
  height: 28px;
  color: #38bdf8;
  stroke-width: 2.2;
}

.brand-title {
  font-family: 'Poppins', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--text);
  letter-spacing: -0.5px;
}

.brand-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 20px;
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
  border: 1px solid rgba(56, 189, 248, 0.3);
}

body.dark .brand-badge {
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.12);
  border-color: rgba(56, 189, 248, 0.25);
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link,
.nav-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.95rem;
  border-radius: 10px;
  color: var(--text);
  text-decoration: none;
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-item-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  color: #64748b;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-dropdown-trigger:hover,
.nav-link.active {
  background: rgba(56, 189, 248, 0.12);
  color: #0284c7;
}

.nav-link:hover .nav-item-icon,
.nav-dropdown-trigger:hover .nav-item-icon,
.nav-link.active .nav-item-icon {
  color: #0284c7;
}

body.dark .nav-link:hover,
body.dark .nav-dropdown-trigger:hover,
body.dark .nav-link.active {
  background: rgba(56, 189, 248, 0.15);
  color: #7dd3fc;
}

body.dark .nav-link:hover .nav-item-icon,
body.dark .nav-dropdown-trigger:hover .nav-item-icon,
body.dark .nav-link.active .nav-item-icon {
  color: #7dd3fc;
}

/* Dropdown styling */
.nav-dropdown {
  position: relative;
}

.dropdown-chevron {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.nav-dropdown:hover .dropdown-chevron,
.nav-dropdown.open .dropdown-chevron {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  width: 680px;
  display: none;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem;
  padding: 1.4rem;
  border-radius: 16px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.4);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 100;
}

.nav-dropdown:hover .dropdown-menu,
.nav-dropdown.open .dropdown-menu {
  display: grid;
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.dropdown-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.dropdown-header {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.4rem;
  padding-left: 0.5rem;
}

body.dark .dropdown-header {
  color: #94a3b8;
}

.dropdown-item {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  padding: 0.6rem 0.7rem;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text);
  transition: background 0.18s ease;
}

.dropdown-item:hover {
  background: rgba(56, 189, 248, 0.12);
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  color: #38bdf8;
  margin-top: 3px;
  flex-shrink: 0;
}

.dropdown-text {
  display: flex;
  flex-direction: column;
}

.dropdown-title {
  font-size: 0.88rem;
  font-weight: 600;
}

.dropdown-desc {
  font-size: 0.72rem;
  color: #64748b;
}

body.dark .dropdown-desc {
  color: #94a3b8;
}

/* Nav Actions & Theme Switcher */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.nav-icon-btn {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  color: var(--text);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
}

.nav-icon-btn i {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.nav-icon-btn:hover {
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
  transform: translateY(-1px);
}

body.dark .nav-icon-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
  color: #f1f5f9;
}

body.dark .nav-icon-btn:hover {
  background: rgba(56, 189, 248, 0.2);
  color: #7dd3fc;
}

.nav-mobile-toggle {
  display: none;
  background: transparent;
  border: none;
  color: var(--text);
  cursor: pointer;
  padding: 0.4rem;
}

.nav-mobile-toggle i {
  width: 26px;
  height: 26px;
}

/* Responsive Navigation */
@media (max-width: 1024px) {
  .dropdown-menu {
    width: 580px;
  }
}

@media (max-width: 860px) {
  .nav-mobile-toggle {
    display: block;
  }

  .nav-content {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 0 0 16px 16px;
    padding: 1.5rem;
    flex-direction: column;
    align-items: stretch;
    box-shadow: 0 16px 32px rgba(0,0,0,0.15);
    border-top: 1px solid rgba(0,0,0,0.05);
  }

  .nav-content.mobile-open {
    display: flex;
  }

  .nav-links {
    flex-direction: column;
    align-items: stretch;
  }

  .dropdown-menu {
    position: static;
    transform: none;
    width: 100%;
    box-shadow: none;
    border: none;
    background: rgba(0, 0, 0, 0.02);
    grid-template-columns: 1fr;
    padding: 0.5rem;
    margin-top: 0.5rem;
  }

  .nav-actions {
    justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.06);
  }
}
```

---

## 3. Hero Page Redesign (`index.html`)

### 3.1 Design Rationale & Visual Hierarchy
The original hero page contained a single heading, a brief paragraph, and a grid of 9 cards with an infinite sliding animation (`animation: slideInLeftLoop 1.6s ease-out infinite;`). This broke WCAG 2.2.2 (Pause, Stop, Hide), created motion sickness, and gave no indication of which converters were functional or intended for which educational purpose.

**Redesign Architecture:**
1. **Hero Header:**
   - Audience indicator badge: "Interactive Theoretical Computer Science Lab" with `graduation-cap`.
   - Title: "Automata Theory <span class='gradient'>Visualizer Pro</span>".
   - Subtitle explicitly highlighting step-by-step tracing for students, lecture-ready proofs for educators, and algorithmic validation for CS researchers.
   - Dual Call to Actions (CTAs):
     - Primary: "Launch Interactive Converters" (`arrow-down-circle`) jumping to the catalog.
     - Secondary: "Theoretical Documentation" (`book-open`) linking to `help.html`.
2. **Key Feature Value Highlights (3 Pillars):**
   - *Step-by-Step Visualization* (`git-fork`): Intermediate $\varepsilon$-closures, powerset tables, state elimination equations.
   - *Live Graph Simulation* (`orbit`): Pan, zoom, node drag-and-drop powered by Vis.js.
   - *Academic Rigor* (`award`): Standard formal definitions ($M = \langle Q, \Sigma, \delta, q_0, F \rangle$).
3. **Audience Filter Tabs (Students / Educators / Researchers):**
   Allows users to filter or highlight relevant tools (e.g. core syllabus vs advanced Turing reductions).
4. **Card Catalog Overhaul:**
   - Grouped into 3 logical categories.
   - Replaces the jarring 1.6s loop animation with smooth, GPU-accelerated hover elevations.
   - Badges showing algorithm method: `Subset Construction`, `Thompson's Construction`, `State Elimination`, `Table-Filling`.
   - Status indicators (`Ready` vs `Preview/Experimental` for PDA/TM).

### 3.2 HTML Markup Template for `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Automata Theory Visualizer Pro | Interactive CS Education & Research</title>
  <meta name="description" content="Interactive step-by-step automata conversions, subset construction, Thompson algorithm, state elimination, and formal grammar analysis for students, educators, and CS researchers."/>
  <link rel="stylesheet" href="styles.css"/>
  <!-- Lucide Icons CDN -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <!-- Shared Nav & Footer Components -->
  <script src="js/components.js" defer></script>
  <script src="js/theme.js" defer></script>
</head>
<body>
  <!-- Header mounted via js/components.js or defined inline -->
  <div id="site-header-container"></div>

  <main id="main-content">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-badge">
        <i data-lucide="graduation-cap" class="badge-icon"></i>
        <span>Designed for Students, Educators & CS Researchers</span>
      </div>
      <h1 class="hero-title">
        Master Automata Theory with <span class="gradient">Step-by-Step Rigor</span>
      </h1>
      <p class="hero-description">
        Transform abstract formal languages into interactive, visual computations. From NFA powerset constructions to Thompson's syntax trees, explore every transition with complete mathematical transparency.
      </p>

      <div class="hero-cta-group">
        <a href="#converter-catalog" class="btn btn-primary">
          <i data-lucide="play-circle"></i>
          <span>Explore Converters</span>
        </a>
        <a href="help.html" class="btn btn-secondary">
          <i data-lucide="book-open"></i>
          <span>How It Works & Guides</span>
        </a>
      </div>

      <!-- Value Props -->
      <div class="hero-features-grid">
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
            <i data-lucide="git-merge" class="feature-icon"></i>
          </div>
          <h3>Step-by-Step Proofs</h3>
          <p>Inspect intermediate $\varepsilon$-closure calculations, transition tables, and eliminated state equations.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
            <i data-lucide="network" class="feature-icon"></i>
          </div>
          <h3>Interactive State Graphs</h3>
          <p>Drag nodes, adjust edge weights, configure initial/final states, and export blackboard-ready diagrams.</p>
        </div>
        <div class="feature-card glass">
          <div class="feature-icon-wrapper">
            <i data-lucide="flask-conical" class="feature-icon"></i>
          </div>
          <h3>Formal CS Foundations</h3>
          <p>Faithful implementations of canonical algorithms from Sipser, Hopcroft, and Ullman textbooks.</p>
        </div>
      </div>
    </section>

    <!-- Converter Catalog Section -->
    <section class="catalog-section" id="converter-catalog">
      <div class="section-header">
        <h2 class="section-title">Automata <span class="gradient">Conversion Suite</span></h2>
        <p class="section-subtitle">Select an algorithm to begin visual conversion and step-by-step state tracing.</p>
      </div>

      <div class="category-block">
        <div class="category-title">
          <i data-lucide="circle-dot"></i>
          <span>Finite Automata & Regular Languages</span>
        </div>
        <div class="cards-grid">
          <!-- Card 1 -->
          <a href="nfa-to-dfa.html" class="converter-card glass">
            <div class="card-badge badge-active">Ready</div>
            <div class="card-icon-box">
              <i data-lucide="shuffle"></i>
            </div>
            <h3 class="card-title">NFA → DFA</h3>
            <p class="card-desc">Convert non-deterministic automata to deterministic equivalents via powerset subset construction.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Subset Construction</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 2 -->
          <a href="enfa-to-dfa.html" class="converter-card glass">
            <div class="card-badge badge-active">Ready</div>
            <div class="card-icon-box">
              <i data-lucide="zap"></i>
            </div>
            <h3 class="card-title">ε-NFA → DFA</h3>
            <p class="card-desc">Eliminate null/epsilon transitions by computing complete state $\varepsilon$-closures before determinization.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Epsilon Closure</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 3 -->
          <a href="nfa-to-regex.html" class="converter-card glass">
            <div class="card-badge badge-active">Ready</div>
            <div class="card-icon-box">
              <i data-lucide="binary"></i>
            </div>
            <h3 class="card-title">NFA → RegEx</h3>
            <p class="card-desc">Synthesize closed-form regular expressions from transition graphs using Arden's state elimination.</p>
            <div class="card-footer-info">
              <span class="algo-tag">State Elimination</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 4 -->
          <a href="regex-to-nfa.html" class="converter-card glass">
            <div class="card-badge badge-active">Ready</div>
            <div class="card-icon-box">
              <i data-lucide="code-2"></i>
            </div>
            <h3 class="card-title">RegEx → NFA</h3>
            <p class="card-desc">Parse arbitrary regular expressions into minimal-subgraph NFAs via Thompson's inductive construction.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Thompson's Method</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 5 -->
          <a href="dfa-minimizer.html" class="converter-card glass">
            <div class="card-badge badge-warning">Experimental</div>
            <div class="card-icon-box">
              <i data-lucide="minimize-2"></i>
            </div>
            <h3 class="card-title">DFA Minimizer</h3>
            <p class="card-desc">Compute the unique minimal DFA by identifying indistinguishable states using table-filling equivalence.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Table-Filling Equivalence</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>
        </div>
      </div>

      <div class="category-block">
        <div class="category-title">
          <i data-lucide="layers"></i>
          <span>Pushdown Automata & Context-Free Languages</span>
        </div>
        <div class="cards-grid">
          <!-- Card 6 -->
          <a href="pda-to-cfg.html" class="converter-card glass">
            <div class="card-badge badge-warning">Experimental</div>
            <div class="card-icon-box">
              <i data-lucide="database"></i>
            </div>
            <h3 class="card-title">PDA → CFG</h3>
            <p class="card-desc">Derive equivalent context-free grammar production rules $[q, X, p]$ from stack transition specifications.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Tri-Variable Derivation</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 7 -->
          <a href="cfl-to-cfg.html" class="converter-card glass">
            <div class="card-badge badge-active">Ready</div>
            <div class="card-icon-box">
              <i data-lucide="list-tree"></i>
            </div>
            <h3 class="card-title">CFL → CFG</h3>
            <p class="card-desc">Inspect and simplify Context-Free Grammar productions, terminals, and non-terminal variable sets.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Grammar Simplification</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>

          <!-- Card 8 -->
          <a href="tm-to-fa.html" class="converter-card glass">
            <div class="card-badge badge-warning">Experimental</div>
            <div class="card-icon-box">
              <i data-lucide="cpu"></i>
            </div>
            <h3 class="card-title">TM → FA</h3>
            <p class="card-desc">Explore bounded-tape approximations of Turing Machines into regular state machines for decidability analysis.</p>
            <div class="card-footer-info">
              <span class="algo-tag">Linear Bounded Automaton</span>
              <span class="card-arrow"><i data-lucide="arrow-right"></i></span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- Target Audience Spotlight -->
    <section class="audience-section glass">
      <h2 class="section-title text-center">Built for the Academic & Engineering Community</h2>
      <div class="audience-grid">
        <div class="audience-card">
          <div class="audience-icon"><i data-lucide="graduation-cap"></i></div>
          <h4>For Students</h4>
          <p>Gain visual intuition for tricky homework questions. See exactly where trap states come from and verify your powerset truth tables with zero guesswork.</p>
        </div>
        <div class="audience-card">
          <div class="audience-icon"><i data-lucide="presentation"></i></div>
          <h4>For Educators</h4>
          <p>Project clear, interactive state machines in lecture halls. Walk through algorithm steps at your own pace without drawing messy graphs on the whiteboard.</p>
        </div>
        <div class="audience-card">
          <div class="audience-icon"><i data-lucide="terminal"></i></div>
          <h4>For CS Researchers</h4>
          <p>Validate formal language edge cases, examine state space growth, and test non-trivial grammar conversions in an open-source client-side sandbox.</p>
        </div>
      </div>
    </section>
  </main>

  <!-- Footer mounted via js/components.js -->
  <div id="site-footer-container"></div>
</body>
</html>
```

### 3.3 CSS Styling Integration for Hero & Cards
Add to `styles.css`:

```css
/* ==========================================================================
   Hero Page & Catalog Styling
   ========================================================================== */
.hero-section {
  max-width: 1100px;
  margin: 3.5rem auto 2.5rem auto;
  text-align: center;
  padding: 0 1.5rem;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border-radius: 30px;
  background: rgba(56, 189, 248, 0.12);
  border: 1px solid rgba(56, 189, 248, 0.25);
  color: #0284c7;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

body.dark .hero-badge {
  color: #7dd3fc;
  background: rgba(56, 189, 248, 0.1);
  border-color: rgba(56, 189, 248, 0.2);
}

.badge-icon {
  width: 16px;
  height: 16px;
}

.hero-title {
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -1px;
  margin: 0 0 1.2rem 0;
  color: var(--text);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
  }
}

.hero-description {
  max-width: 780px;
  margin: 0 auto 2.2rem auto;
  font-size: 1.15rem;
  line-height: 1.65;
  color: #475569;
}

body.dark .hero-description {
  color: #94a3b8;
}

.hero-cta-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
  margin-bottom: 3.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.85rem 1.6rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

.btn i {
  width: 20px;
  height: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #38bdf8, #6366f1);
  color: #ffffff;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.45);
}

.btn-secondary {
  background: var(--card-bg);
  color: var(--text);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: var(--shadow);
}

body.dark .btn-secondary {
  border-color: rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  transform: translateY(-2px);
  background: rgba(56, 189, 248, 0.1);
  color: #0284c7;
}

body.dark .btn-secondary:hover {
  color: #7dd3fc;
}

/* 3 Pillars Feature Grid */
.hero-features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-top: 2rem;
  text-align: left;
}

@media (max-width: 860px) {
  .hero-features-grid {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  padding: 1.8rem;
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(56, 189, 248, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
}

.feature-icon {
  width: 26px;
  height: 26px;
  color: #0284c7;
}

body.dark .feature-icon {
  color: #38bdf8;
}

.feature-card h3 {
  font-size: 1.15rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.feature-card p {
  font-size: 0.92rem;
  line-height: 1.55;
  color: #64748b;
  margin: 0;
}

body.dark .feature-card p {
  color: #94a3b8;
}

/* Converter Catalog Grid */
.catalog-section {
  max-width: 1200px;
  margin: 4rem auto;
  padding: 0 1.5rem;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin: 0 0 0.6rem 0;
}

.section-subtitle {
  font-size: 1.05rem;
  color: #64748b;
  margin: 0;
}

body.dark .section-subtitle {
  color: #94a3b8;
}

.category-block {
  margin-bottom: 3rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 1.4rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid rgba(56, 189, 248, 0.2);
}

.category-title i {
  width: 22px;
  height: 22px;
  color: #0284c7;
}

body.dark .category-title i {
  color: #38bdf8;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.8rem;
}

/* OVERRIDE: Remove infinite looping slide animation from old styles.css */
.cards .card,
.converter-card {
  opacity: 1 !important;
  transform: none !important;
  animation: none !important;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1.8rem;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

body.dark .converter-card {
  border-color: rgba(255, 255, 255, 0.07);
}

.converter-card:hover {
  transform: translateY(-5px) !important;
  box-shadow: 0 14px 32px rgba(56, 189, 248, 0.2) !important;
  border-color: rgba(56, 189, 248, 0.4);
}

.card-badge {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
}

.badge-active {
  background: rgba(34, 197, 94, 0.15);
  color: #15803d;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

body.dark .badge-active {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}

.badge-warning {
  background: rgba(245, 158, 11, 0.15);
  color: #b45309;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

body.dark .badge-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #fbbf24;
}

.card-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0284c7;
  margin-bottom: 1.2rem;
}

body.dark .card-icon-box {
  color: #38bdf8;
}

.card-icon-box i {
  width: 24px;
  height: 24px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
}

.card-desc {
  font-size: 0.88rem;
  line-height: 1.5;
  color: #64748b;
  margin: 0 0 1.5rem 0;
  flex-grow: 1;
}

body.dark .card-desc {
  color: #94a3b8;
}

.card-footer-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

body.dark .card-footer-info {
  border-color: rgba(255, 255, 255, 0.06);
}

.algo-tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #0284c7;
}

body.dark .algo-tag {
  color: #7dd3fc;
}

.card-arrow {
  color: #94a3b8;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease, color 0.2s ease;
}

.converter-card:hover .card-arrow {
  transform: translateX(4px);
  color: #0284c7;
}

body.dark .converter-card:hover .card-arrow {
  color: #7dd3fc;
}

/* Audience Section */
.audience-section {
  max-width: 1100px;
  margin: 5rem auto;
  padding: 3rem 2rem;
  border-radius: 20px;
}

.audience-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

@media (max-width: 860px) {
  .audience-grid {
    grid-template-columns: 1fr;
  }
}

.audience-card {
  text-align: center;
  padding: 1.5rem;
}

.audience-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.15);
  color: #6366f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem auto;
}

body.dark .audience-icon {
  background: rgba(99, 102, 241, 0.25);
  color: #a5b4fc;
}

.audience-icon i {
  width: 26px;
  height: 26px;
}

.audience-card h4 {
  font-size: 1.2rem;
  margin: 0 0 0.6rem 0;
  font-weight: 700;
}

.audience-card p {
  font-size: 0.92rem;
  line-height: 1.6;
  color: #64748b;
  margin: 0;
}

body.dark .audience-card p {
  color: #94a3b8;
}
```

---

## 4. New Pages Specifications

### 4.1 About Us (`about.html`)

#### Purpose & Audience Alignment
The About Us page documents the project's story, mission, educational philosophy, and technology stack.
- **For Students:** Understand the pedagogical motivation behind visual automata converters.
- **For Educators:** Find curriculum alignment notes, citation guidelines, and teaching principles.
- **For Researchers:** Inspect architectural transparency (client-side execution, determinism proofs).

#### HTML Structure (`about.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>About Us | Automata Theory Visualizer Pro</title>
  <meta name="description" content="Discover the story, mission, and educational vision behind Automata Theory Visualizer Pro."/>
  <link rel="stylesheet" href="styles.css"/>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="js/components.js" defer></script>
  <script src="js/theme.js" defer></script>
</head>
<body>
  <div id="site-header-container"></div>

  <main class="page-container">
    <header class="page-hero text-center">
      <div class="hero-badge">
        <i data-lucide="info" class="badge-icon"></i>
        <span>Our Mission & Vision</span>
      </div>
      <h1 class="page-title">Making Formal Languages <span class="gradient">Intuitive & Transparent</span></h1>
      <p class="page-subtitle">Demystifying theoretical computer science through interactive mathematics, real-time graph visualization, and open educational tools.</p>
    </header>

    <!-- Origin Story Section -->
    <section class="content-block glass">
      <div class="block-header">
        <i data-lucide="book-open" class="block-icon"></i>
        <h2>The Project Story</h2>
      </div>
      <p>
        Automata Theory and Formal Languages form the backbone of modern computation, compiler construction, and algorithm analysis. Yet for decades, computer science students and educators have struggled with a recurring challenge: <em>abstract state diagrams written statically on blackboards lack dynamic feedback</em>.
      </p>
      <p>
        When computing powersets during NFA-to-DFA subset construction or tracking recursive substitutions in Arden's theorem, human error is common. <strong>Automata Visualizer Pro</strong> was founded by <strong>Hussnain Bashir</strong> to eliminate this friction by bridging the gap between rigorous mathematical proofs and interactive, visual feedback.
      </p>
    </section>

    <!-- Core Pillars Grid -->
    <section class="pillars-section">
      <h2 class="section-title text-center">Our Core Educational Pillars</h2>
      <div class="pillars-grid">
        <div class="pillar-card glass">
          <div class="pillar-icon-box"><i data-lucide="eye"></i></div>
          <h3>Radical Transparency</h3>
          <p>No black boxes. Every conversion step shows intermediate epsilon closures, transition matrices, and algebraic formulas.</p>
        </div>
        <div class="pillar-card glass">
          <div class="pillar-icon-box"><i data-lucide="cpu"></i></div>
          <h3>Client-Side Privacy & Speed</h3>
          <p>100% client-side JavaScript. No graph data or expressions are sent to external servers. Conversions run instantaneously in your browser.</p>
        </div>
        <div class="pillar-card glass">
          <div class="pillar-icon-box"><i data-lucide="graduation-cap"></i></div>
          <h3>Classroom Pedagogical Rigor</h3>
          <p>Standardized tuple notation ($Q, \Sigma, \delta, q_0, F$) aligning with canonical CS curricula globally (Sipser, Ullman).</p>
        </div>
      </div>
    </section>

    <!-- Tech Stack Summary -->
    <section class="content-block glass">
      <div class="block-header">
        <i data-lucide="code" class="block-icon"></i>
        <h2>Engineered with Vanilla Web Standards</h2>
      </div>
      <p>
        Automata Visualizer Pro is intentionally engineered without heavy frameworks to ensure long-term archival stability, zero build-step overhead, and lightweight execution on classroom hardware:
      </p>
      <ul class="spec-list">
        <li><strong>Vanilla ES6+ JavaScript:</strong> Pure algorithmic execution without abstraction tax.</li>
        <li><strong>Vis.js Network Engine:</strong> Interactive, physics-stabilized canvas rendering for complex state graphs.</li>
        <li><strong>CSS3 Glassmorphism:</strong> High-legibility UI supporting system light and dark themes.</li>
        <li><strong>Lucide Icons:</strong> Consistent, accessible SVG iconography.</li>
      </ul>
    </section>
  </main>

  <div id="site-footer-container"></div>
</body>
</html>
```

---

### 4.2 Help & Documentation (`help.html`)

#### Purpose & Audience Alignment
The Help page provides systematic documentation on how each converter works, how to format inputs, and how to troubleshoot edge cases.
- **For Students:** Learn syntax (e.g. `ε` for epsilon), understand subset construction tables, and interpret error messages.
- **For Educators:** Step-by-step lecture walkthrough instructions and suggested classroom demonstrations.
- **For Researchers:** Algorithmic complexity bounds and limitations (e.g., $O(2^n)$ worst-case state expansion).

#### HTML Structure (`help.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Help & Documentation | Automata Theory Visualizer Pro</title>
  <meta name="description" content="Complete documentation, input guides, algorithm explanations, and troubleshooting for Automata Visualizer Pro."/>
  <link rel="stylesheet" href="styles.css"/>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="js/components.js" defer></script>
  <script src="js/theme.js" defer></script>
</head>
<body>
  <div id="site-header-container"></div>

  <main class="page-container">
    <header class="page-hero text-center">
      <div class="hero-badge">
        <i data-lucide="help-circle" class="badge-icon"></i>
        <span>User Guides & Theoretical Documentation</span>
      </div>
      <h1 class="page-title">How the Converters <span class="gradient">Work</span></h1>
      <p class="page-subtitle">Learn input syntax conventions, algorithmic methodologies, and troubleshooting techniques.</p>
    </header>

    <!-- Quick Navigation Anchor Pills -->
    <nav class="help-nav-pills glass" aria-label="Help Sections">
      <a href="#syntax-guide"><i data-lucide="edit-3"></i> Input Conventions</a>
      <a href="#algorithms"><i data-lucide="workflow"></i> Converter Algorithms</a>
      <a href="#complexity"><i data-lucide="alert-triangle"></i> Complexity & Edge Cases</a>
      <a href="#faq"><i data-lucide="message-circle"></i> Frequently Asked Questions</a>
    </nav>

    <!-- Section 1: Syntax & Notation -->
    <section id="syntax-guide" class="content-block glass">
      <div class="block-header">
        <i data-lucide="edit-3" class="block-icon"></i>
        <h2>1. State Builder & Input Conventions</h2>
      </div>
      <p>The interactive visual builder allows you to construct automata using intuitive controls:</p>
      <div class="guide-grid">
        <div class="guide-item">
          <h4><i data-lucide="plus-circle"></i> Adding States</h4>
          <p>Click <strong>+ Add State</strong> and enter a canonical label such as <code>q0</code>, <code>q1</code>, or <code>A</code>. Initial state markers will automatically attach arrows.</p>
        </div>
        <div class="guide-item">
          <h4><i data-lucide="arrow-right-circle"></i> Adding Transitions</h4>
          <p>Click <strong>→ Add Transition</strong>. Specify source state, input symbol (e.g. <code>0</code>, <code>1</code>, <code>a</code>, <code>b</code>), and target state.</p>
        </div>
        <div class="guide-item">
          <h4><i data-lucide="zap"></i> Epsilon (Null) Transitions</h4>
          <p>Use the exact character <code>ε</code> or input <code>eps</code>/<code>lambda</code>. The engine treats these as spontaneous moves without consuming tape input.</p>
        </div>
        <div class="guide-item">
          <h4><i data-lucide="check-circle-2"></i> Final (Accepting) States</h4>
          <p>Select any state and click <strong>Set Final</strong>. Accepting states render with a double border per standard theoretical notation.</p>
        </div>
      </div>
    </section>

    <!-- Section 2: Core Converter Algorithms -->
    <section id="algorithms" class="content-block glass">
      <div class="block-header">
        <i data-lucide="workflow" class="block-icon"></i>
        <h2>2. Converter Algorithms Explained</h2>
      </div>

      <div class="accordion-item">
        <h3><i data-lucide="shuffle"></i> NFA to DFA (Powerset Subset Construction)</h3>
        <p>
          Given an NFA $M = (Q, \Sigma, \delta, q_0, F)$, the converter computes the equivalent DFA $M' = (2^Q, \Sigma, \delta', \{q_0\}, F')$. 
          The engine begins at $\{q_0\}$ and iteratively computes the target composite state for every symbol $a \in \Sigma$ using $\delta'(R, a) = \bigcup_{r \in R} \delta(r, a)$. Dead/trap states are grouped explicitly into $\emptyset$.
        </p>
      </div>

      <div class="accordion-item">
        <h3><i data-lucide="binary"></i> NFA to Regular Expression (State Elimination Method)</h3>
        <p>
          The converter normalizes the automaton into a Generalized Transition Graph (GNFA) with a single initial state and single accepting state. States are eliminated one by one, updating parallel and sequential transition expressions using Arden's algebraic rule: $R_{ij} \leftarrow R_{ij} \cup R_{ik}(R_{kk})^*R_{kj}$.
        </p>
      </div>

      <div class="accordion-item">
        <h3><i data-lucide="code-2"></i> Regular Expression to NFA (Thompson's Construction)</h3>
        <p>
          Constructs an NFA inductively from regular expressions using standard primitive subgraphs for union ($r_1 \mid r_2$), concatenation ($r_1 r_2$), and Kleene star ($r_1^*$). Each sub-automaton has exactly one initial and one accept state connected via $\varepsilon$-transitions.
        </p>
      </div>
    </section>

    <!-- Section 3: Complexity & Edge Cases -->
    <section id="complexity" class="content-block glass">
      <div class="block-header">
        <i data-lucide="alert-triangle" class="block-icon"></i>
        <h2>3. Computational Complexity & Edge Cases</h2>
      </div>
      <div class="callout callout-warning">
        <i data-lucide="alert-circle" class="callout-icon"></i>
        <div>
          <strong>State Space Explosion ($O(2^{|Q|})$):</strong>
          In worst-case scenarios, converting an NFA with $n$ states can produce up to $2^n$ DFA states. For browser stability, we recommend keeping visual NFA inputs under 12 states.
        </div>
      </div>
      <ul class="spec-list">
        <li><strong>Unreachable States:</strong> The subset construction algorithm only generates states reachable from the initial state, preventing unnecessary $2^n$ bloat.</li>
        <li><strong>Ambiguous RegEx:</strong> Always use explicit parentheses (e.g. <code>(a|b)*abb</code>) to avoid operator precedence errors between concatenation and union.</li>
      </ul>
    </section>

    <!-- Section 4: FAQ -->
    <section id="faq" class="content-block glass">
      <div class="block-header">
        <i data-lucide="message-circle" class="block-icon"></i>
        <h2>4. Frequently Asked Questions</h2>
      </div>
      <div class="faq-list">
        <details class="faq-item">
          <summary>Can I export the generated graph diagrams for lecture slides or papers?</summary>
          <p>Yes! You can right-click the interactive canvas to save high-resolution PNG images directly, or copy the tabular transition matrix text into LaTeX.</p>
        </details>
        <details class="faq-item">
          <summary>Why is the DFA Minimizer or PDA to CFG marked as "Experimental"?</summary>
          <p>The visual builder UI is functional, while full algorithmic calculation engines for these modules are undergoing rigorous theoretical verification before final stabilization.</p>
        </details>
      </div>
    </section>
  </main>

  <div id="site-footer-container"></div>
</body>
</html>
```

---

### 4.3 Contact Page (`contact.html`)

#### Purpose & Audience Alignment
The Contact page facilitates direct feedback, academic collaboration, bug reporting, and course adoption inquiries.
- **For Students:** Report confusing conversion steps or request solved examples.
- **For Educators:** Inquire about adopting the tool in university curricula or request lecture integration features.
- **For Researchers & Devs:** Submit algorithm corrections, edge-case bugs, and GitHub pull requests.

#### HTML Structure (`contact.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Contact & Collaboration | Automata Theory Visualizer Pro</title>
  <meta name="description" content="Get in touch with the Automata Visualizer Pro team for academic inquiries, bug reports, feature suggestions, or educational collaboration."/>
  <link rel="stylesheet" href="styles.css"/>
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="js/components.js" defer></script>
  <script src="js/theme.js" defer></script>
</head>
<body>
  <div id="site-header-container"></div>

  <main class="page-container">
    <header class="page-hero text-center">
      <div class="hero-badge">
        <i data-lucide="mail" class="badge-icon"></i>
        <span>Get in Touch</span>
      </div>
      <h1 class="page-title">Academic Inquiries & <span class="gradient">Feedback</span></h1>
      <p class="page-subtitle">Have a feature suggestion, theoretical edge-case bug report, or university curriculum adoption request? We would love to hear from you.</p>
    </header>

    <div class="contact-layout">
      <!-- Contact Info Cards -->
      <div class="contact-info-col">
        <div class="contact-card glass">
          <div class="contact-icon-box"><i data-lucide="github"></i></div>
          <h3>GitHub Repository</h3>
          <p>Submit issues, report algorithmic edge cases, or contribute code directly to the repository.</p>
          <a href="https://github.com/Husrocks/Automata-Converter" target="_blank" rel="noopener noreferrer" class="link-with-arrow">
            <span>github.com/Husrocks/Automata-Converter</span>
            <i data-lucide="external-link"></i>
          </a>
        </div>

        <div class="contact-card glass">
          <div class="contact-icon-box"><i data-lucide="linkedin"></i></div>
          <h3>Professional Inquiries</h3>
          <p>Connect with the creator, Hussnain Bashir, for research collaboration and CS education consulting.</p>
          <a href="https://www.linkedin.com/in/hussnain-bashir/" target="_blank" rel="noopener noreferrer" class="link-with-arrow">
            <span>linkedin.com/in/hussnain-bashir</span>
            <i data-lucide="external-link"></i>
          </a>
        </div>

        <div class="contact-card glass">
          <div class="contact-icon-box"><i data-lucide="graduation-cap"></i></div>
          <h3>Classroom Adoption</h3>
          <p>Teaching Automata Theory this semester? Reach out for customized problem sets and embeddable widgets.</p>
          <span class="contact-email">edu@automatapro.dev</span>
        </div>
      </div>

      <!-- Contact Interactive Form -->
      <div class="contact-form-col">
        <form class="contact-form glass" id="contact-form" onsubmit="event.preventDefault(); document.getElementById('form-success-msg').style.display='block';">
          <h3><i data-lucide="send"></i> Send a Message</h3>

          <div class="form-group">
            <label for="user-name">Your Full Name</label>
            <input type="text" id="user-name" name="name" required placeholder="Dr. Alan Turing" class="form-input" />
          </div>

          <div class="form-group">
            <label for="user-email">Email Address</label>
            <input type="email" id="user-email" name="email" required placeholder="turing@princeton.edu" class="form-input" />
          </div>

          <div class="form-group">
            <label for="user-role">Your Academic / Professional Role</label>
            <select id="user-role" name="role" class="form-input">
              <option value="student">Undergraduate / Graduate Student</option>
              <option value="educator">Lecturer / Professor / TA</option>
              <option value="researcher">CS Researcher / Professional</option>
              <option value="other">Other Technical Enthusiast</option>
            </select>
          </div>

          <div class="form-group">
            <label for="user-topic">Inquiry Type</label>
            <select id="user-topic" name="topic" class="form-input">
              <option value="bug">Algorithmic Bug / Edge Case Report</option>
              <option value="feature">Feature Request (New Converter)</option>
              <option value="education">Classroom Curriculum Adoption</option>
              <option value="feedback">General Feedback</option>
            </select>
          </div>

          <div class="form-group">
            <label for="user-message">Message Details</label>
            <textarea id="user-message" name="message" rows="5" required placeholder="Describe the inquiry or include state diagram details..." class="form-input"></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%;">
            <i data-lucide="send"></i>
            <span>Submit Message</span>
          </button>

          <div id="form-success-msg" class="form-alert-success" style="display: none;">
            <i data-lucide="check-circle-2"></i>
            <span>Thank you! Your message has been received. We will respond promptly.</span>
          </div>
        </form>
      </div>
    </div>
  </main>

  <div id="site-footer-container"></div>
</body>
</html>
```

---

### 4.4 CSS Styling for New Pages (`about.html`, `help.html`, `contact.html`)
Add to `styles.css`:

```css
/* ==========================================================================
   Informational Pages (About, Help, Contact)
   ========================================================================== */
.page-container {
  max-width: 1140px;
  margin: 3rem auto 5rem auto;
  padding: 0 1.5rem;
}

.page-hero {
  margin-bottom: 3.5rem;
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.page-subtitle {
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: #64748b;
  line-height: 1.6;
}

body.dark .page-subtitle {
  color: #94a3b8;
}

.content-block {
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  border-radius: 18px;
}

.block-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1.2rem;
}

.block-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.block-icon {
  width: 26px;
  height: 26px;
  color: #0284c7;
}

body.dark .block-icon {
  color: #38bdf8;
}

.content-block p {
  font-size: 1.02rem;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 1rem;
}

.content-block p:last-child {
  margin-bottom: 0;
}

.spec-list {
  padding-left: 1.4rem;
  line-height: 1.8;
  font-size: 0.98rem;
}

/* About Us Pillars */
.pillars-section {
  margin: 3.5rem 0;
}

.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.8rem;
  margin-top: 2rem;
}

@media (max-width: 860px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }
}

.pillar-card {
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
}

.pillar-icon-box {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem auto;
}

body.dark .pillar-icon-box {
  color: #38bdf8;
}

.pillar-icon-box i {
  width: 26px;
  height: 26px;
}

/* Help Page Navigation Pills */
.help-nav-pills {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.help-nav-pills a {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text);
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  transition: background 0.2s ease, color 0.2s ease;
}

.help-nav-pills a:hover {
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
}

body.dark .help-nav-pills a:hover {
  color: #7dd3fc;
}

.help-nav-pills a i {
  width: 16px;
  height: 16px;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }
}

.guide-item {
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

body.dark .guide-item {
  background: rgba(255, 255, 255, 0.02);
  border-color: rgba(255, 255, 255, 0.06);
}

.guide-item h4 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 0.5rem 0;
  font-size: 1.05rem;
}

.guide-item h4 i {
  width: 18px;
  height: 18px;
  color: #0284c7;
}

body.dark .guide-item h4 i {
  color: #38bdf8;
}

.accordion-item {
  padding: 1.4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

body.dark .accordion-item {
  border-color: rgba(255, 255, 255, 0.07);
}

.accordion-item h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.15rem;
  margin: 0 0 0.6rem 0;
}

.accordion-item h3 i {
  width: 20px;
  height: 20px;
  color: #0284c7;
}

body.dark .accordion-item h3 i {
  color: #38bdf8;
}

.callout {
  display: flex;
  gap: 1rem;
  padding: 1.2rem;
  border-radius: 12px;
  margin: 1.2rem 0;
}

.callout-warning {
  background: rgba(245, 158, 11, 0.12);
  border: 1px solid rgba(245, 158, 11, 0.25);
  color: var(--text);
}

.callout-icon {
  width: 24px;
  height: 24px;
  color: #b45309;
  flex-shrink: 0;
}

body.dark .callout-icon {
  color: #fbbf24;
}

.faq-item {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.faq-item summary {
  font-weight: 600;
  font-size: 1.05rem;
  cursor: pointer;
  outline: none;
}

.faq-item p {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  color: #64748b;
}

body.dark .faq-item p {
  color: #94a3b8;
}

/* Contact Page Layout */
.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 2.5rem;
}

@media (max-width: 860px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }
}

.contact-info-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-card {
  padding: 1.8rem;
  border-radius: 16px;
}

.contact-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(56, 189, 248, 0.15);
  color: #0284c7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

body.dark .contact-icon-box {
  color: #38bdf8;
}

.contact-icon-box i {
  width: 22px;
  height: 22px;
}

.contact-card h3 {
  font-size: 1.15rem;
  margin: 0 0 0.5rem 0;
}

.contact-card p {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0 0 1rem 0;
}

body.dark .contact-card p {
  color: #94a3b8;
}

.link-with-arrow {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #0284c7;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
}

body.dark .link-with-arrow {
  color: #38bdf8;
}

.link-with-arrow i {
  width: 15px;
  height: 15px;
}

.contact-email {
  display: inline-block;
  font-weight: 700;
  color: #6366f1;
}

/* Contact Form */
.contact-form {
  padding: 2.2rem;
  border-radius: 18px;
}

.contact-form h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.35rem;
  margin: 0 0 1.5rem 0;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  font-size: 0.88rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--text);
}

.form-input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.8);
  font-family: inherit;
  font-size: 0.95rem;
  color: var(--text);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

body.dark .form-input {
  background: rgba(30, 30, 47, 0.7);
  border-color: rgba(255, 255, 255, 0.12);
  color: #f1f5f9;
}

.form-input:focus {
  outline: none;
  border-color: #38bdf8;
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
}

.form-alert-success {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: #15803d;
  padding: 0.9rem;
  border-radius: 10px;
  margin-top: 1.2rem;
  font-size: 0.92rem;
  font-weight: 600;
}

body.dark .form-alert-success {
  background: rgba(34, 197, 94, 0.2);
  color: #4ade80;
}
```

---

## 5. Reusable Component Engine (`js/components.js`)

To fix the design inconsistency bug identified in the architecture report (where the `<nav>` was duplicated across 9 HTML files and had comments, extra spaces, and mismatched SVG paths), we introduce a single Vanilla JS component engine: `js/components.js`.

### 5.1 JavaScript Implementation (`js/components.js`)

```javascript
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
                <i data-lucide="github"></i>
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
    // 1. If #site-header-container exists, insert into it
    // 2. Otherwise replace existing <nav class="navbar glass">
    const headerContainer = document.getElementById('site-header-container');
    if (headerContainer) {
      headerContainer.innerHTML = navHTML;
    } else {
      const existingNav = document.querySelector('nav.navbar');
      if (existingNav) {
        existingNav.outerHTML = navHTML;
      }
    }

    // Attach Mobile Toggle logic
    const mobileBtn = document.getElementById('nav-mobile-toggle');
    const navContent = document.getElementById('nav-content');
    if (mobileBtn && navContent) {
      mobileBtn.addEventListener('click', function () {
        const isOpen = navContent.classList.toggle('mobile-open');
        mobileBtn.setAttribute('aria-expanded', isOpen);
      });
    }
  }

  function renderFooter() {
    const footerHTML = `
      <footer class="custom-footer glass">
        <div class="footer-content" style="display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 1140px; margin: 0 auto; flex-wrap: wrap; gap: 1rem;">
          <span class="footer-text">
            © 2026 <strong>Automata Visualizer Pro</strong>. Developed by Hussnain Bashir. Open-source educational project.
          </span>
          <div class="footer-icons">
            <a href="https://github.com/Husrocks" target="_blank" rel="noopener noreferrer" aria-label="GitHub" class="footer-icon-link">
              <i data-lucide="github"></i>
            </a>
            <a href="https://www.linkedin.com/in/hussnain-bashir/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-icon-link">
              <i data-lucide="linkedin"></i>
            </a>
            <a href="https://www.instagram.com/imhussnain.001/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-icon-link">
              <i data-lucide="instagram"></i>
            </a>
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

  // Execute component mounting and icon initialization
  function init() {
    renderNavbar();
    renderFooter();

    // Re-initialize Lucide Icons across freshly injected DOM nodes
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
```

### 5.2 Updated Theme Switcher with Lucide (`js/theme.js`)
To maintain complete dark mode compatibility and ensure the theme icon switches smoothly between the Lucide `sun` and `moon` icons, simplify and update `js/theme.js`:

```javascript
/**
 * Automata Visualizer Pro - Theme Controller
 * Handles light/dark mode persistence and Lucide Icon synchronization.
 */

(function () {
  'use strict';

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
      }
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    applyTheme(isDark);

    // Global event delegation for #theme-toggle button
    document.addEventListener('click', function (e) {
      const toggleBtn = e.target.closest('#theme-toggle');
      if (!toggleBtn) return;

      const currentlyDark = document.body.classList.contains('dark');
      const nextDark = !currentlyDark;
      applyTheme(nextDark);
      localStorage.setItem('theme', nextDark ? 'dark' : 'light');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();
```

---

## 6. Implementation Checklist & Migration Guide

### 6.1 File Action Plan

| File Path | Action | Description |
| :--- | :--- | :--- |
| `index.html` | **[MODIFY]** | Replace old hero and animated cards with new accessible hero, 3 feature pillars, and categorized converter catalog. Include Lucide CDN and `js/components.js`. |
| `styles.css` | **[MODIFY]** | Append Navigation styles, Hero styles, Catalog styles, and New Page layouts. Remove or override `.cards .card` 1.6s infinite loop. |
| `about.html` | **[NEW]** | Create About Us page with project story, educational pillars, and architecture overview. |
| `help.html` | **[NEW]** | Create Help & Documentation page with input syntax guide, algorithm explanations, complexity notes, and FAQs. |
| `contact.html` | **[NEW]** | Create Contact & Feedback page with inquiry form and direct academic links. |
| `js/components.js` | **[NEW]** | Centralized component injector for `<nav>` and `<footer>` that eliminates HTML duplication across all pages. |
| `js/theme.js` | **[MODIFY]** | Update theme script to toggle Lucide `sun`/`moon` icons and use delegated click events. |
| All 9 Converter Pages | **[MODIFY]** | Add `<script src="https://unpkg.com/lucide@latest"></script>` and `<script src="js/components.js" defer></script>`. Replace duplicated `<nav>` with `<div id="site-header-container"></div>` and footer with `<div id="site-footer-container"></div>`. |

### 6.2 Step-by-Step Instructions for Applying to Converter Pages
To standardize the 9 existing converter pages (`nfa-to-dfa.html`, `enfa-to-dfa.html`, `nfa-to-regex.html`, `regex-to-nfa.html`, `pda-to-cfg.html`, `cfl-to-cfg.html`, `tm-to-fa.html`, `dfa-minimizer.html`) without breaking their internal Vis.js graph logic:

1. **Add Lucide CDN & Components script to `<head>`:**
   ```html
   <script src="https://unpkg.com/lucide@latest"></script>
   <script src="js/components.js" defer></script>
   ```
2. **Replace the existing `<nav class="navbar glass">...</nav>` block:**
   Replace the lines from `<nav class="navbar glass">` to `</nav>` with:
   ```html
   <div id="site-header-container"></div>
   ```
3. **Replace the existing `<footer>` block:**
   Replace `<footer class="glass custom-footer">...</footer>` (or add if missing in `pda-to-cfg.html`) with:
   ```html
   <div id="site-footer-container"></div>
   ```
4. **Verification:**
   Open the page in any browser. The new navigation bar will load automatically with the correct active link highlighted, Lucide icons rendered, and theme toggling fully operational.

### 6.3 Breaking Changes & Dependency Analysis
- **Dependency:** Lucide Icons CDN requires network connectivity on first load. For offline capability, developer may download `lucide.min.js` to `js/vendor/lucide.min.js`.
- **CSS Specificity:** The override `.cards .card { animation: none !important; }` prevents card jitter on `index.html`.
- **Vis.js Compatibility:** Graph canvases in `visual-builder.js` rely on `#nfa-graph-vis` and `#dfa-graph-vis`. None of these container IDs or element names are altered.

---

## 7. Verification & Acceptance Criteria

### 7.1 Automated & Manual Checks
- [ ] **Navigation Uniformity:** Ensure `<nav>` across all 12 pages displays identical structure and matching brand links.
- [ ] **Footer Presence:** Verify `pda-to-cfg.html` renders the footer correctly without layout breaks.
- [ ] **Lucide Icon Rendering:** Confirm no `<i>` tags remain empty (all replaced by SVG with class `lucide lucide-*`).
- [ ] **Dark Mode Sync:** Toggle theme on any page; reload; ensure dark state and `sun`/`moon` icons persist via `localStorage`.
- [ ] **Responsive Breakpoints:**
  - $1280\text{px}$: Dropdown menus display as 3 columns.
  - $768\text{px}$: Navigation gracefully collapses into mobile toggle drawer.
- [ ] **Accessibility (WCAG 2.1 AA):** All buttons have `aria-label`; dropdowns have `aria-haspopup` and `aria-expanded`; text contrast ratios exceed 4.5:1.
