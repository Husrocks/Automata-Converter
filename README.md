<div align="center">
  
  # ⚙️ Automata Visualizer Pro

  **An open-source, interactive web application for learning formal languages and automata theory algorithms.**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![Vanilla JS](https://img.shields.io/badge/Tech-Vanilla_JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Vis.js](https://img.shields.io/badge/Engine-Vis.js-brightgreen.svg)](https://visjs.org/)
  
  [**Live Demo**](https://husrocks.github.io/Automata-Converter/) •
  [**Documentation**](help.html) •
  [**Report Bug**](contact.html)

  <br />

  <!-- Placeholder for a high-quality GIF or Screenshot -->
  <img src="https://via.placeholder.com/800x450/0f172a/38bdf8?text=Automata+Visualizer+Pro+Demo" alt="Automata Visualizer Pro UI" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.15);" />

</div>

---

## 📖 Overview

**Automata Visualizer Pro** is a zero-dependency, client-side educational tool designed to demystify theoretical computer science. For decades, computer science students and educators have struggled with abstract state diagrams written statically on blackboards. 

This project bridges the gap between rigorous mathematical proofs and interactive visual feedback by providing a suite of dynamic automata converters. It allows students to visually build machines, test strings in real-time, and observe algorithms (like Powerset Subset Construction and State Elimination) execute step-by-step.

---

## ✨ Features & Converters

Automata Visualizer Pro supports **9 Integrated Converters** categorized across the core computer science curriculum:

### 🔄 Finite Automata
* **NFA to DFA:** Full implementation of the subset construction algorithm, removing non-determinism.
* **ε-NFA to DFA:** Computes Epsilon Closures and dynamically resolves spontaneous transitions.
* **DFA Minimizer:** Optimizes deterministic machines by merging equivalent states (Hopcroft's logic).

### 🔤 Regular Expressions
* **NFA to Regular Expression:** Utilizes Arden's Theorem and the State Elimination method.
* **Regular Expression to NFA:** Inductive compilation using Thompson's Construction with proper ε-links.

### 🌳 Grammars & Turing Machines
* **PDA to CFG:** Converts Pushdown Automata execution paths into Context-Free Grammars.
* **CFL to CFG:** Generators for Context-Free Languages.
* **Turing Machine to FA:** Experimental reduction modules.

---

## 🛠️ Interactive Capabilities

* **Visual Node Builder:** Drag-and-drop state creation powered by the physics-stabilized **Vis.js** network engine.
* **Multiple Input Methods:** Support for canvas drawing, transition table data entry, and JSON payload injection.
* **Real-time String Testing:** Instantly validate strings against your generated NFA/DFA paths.
* **Radical Transparency:** No black boxes. Every conversion step shows intermediate epsilon closures, transition matrices, and algebraic formulas.
* **100% Client-Side:** Absolute privacy and speed. Computations happen entirely within the browser.
* **Modern UI/UX:** Features a sleek Glassmorphism design system, integrated Light/Dark Modes, and crisp vector iconography.

---

## 🚀 Installation & Local Setup

Automata Visualizer Pro is intentionally engineered without heavy UI frameworks (React, Vue) to ensure long-term archival stability, zero build-step overhead, and lightweight execution on classroom hardware.

There are **no build steps, bundlers, or server dependencies** required to run it locally.

1. **Clone the repository:**
   \\\ash
   git clone https://github.com/Husrocks/Automata-Converter.git
   cd Automata-Converter
   \\\
2. **Run it:**
   Simply double-click index.html to open it in any modern web browser (Chrome, Firefox, Safari, Edge).
   
   *(Alternatively, you can serve it via a simple local server like 
px serve or VSCode Live Server to prevent strict CORS policies on local SVG loading).*

---

## 📚 Usage Guide

### Creating an Automaton visually
1. Navigate to any converter (e.g., **NFA to DFA**).
2. Click **+ Add State** to create nodes. The first node automatically becomes the initial state (q0).
3. Click **+ Add Transition**, select a source and target state, and input the transition symbol (use ε or eps for spontaneous transitions).
4. Select a state and click **Set Final** to mark it as an accepting state (double circle).

### Running a Conversion
1. Once your graph is built, click **Convert**.
2. A detailed log will appear showing the mathematical transition matrix, subsets, and Epsilon Closures generated.
3. The right-hand panel will render the newly constructed equivalent graph.

---

## 🏗️ Project Architecture

Recent architectural updates have centralized the UI to prevent code duplication and provide a seamless SPA-like feel:

* **index.html** - The primary Hero landing page and visual catalog.
* **styles.css** - Global CSS tokens, dark mode toggle logic, and responsive grid layouts.
* **js/components.js** - Centralized DOM injection engine. Dynamically loads the professional Navbar and Footer.
* **js/theme.js** - Manages localStorage persistence for the Light/Dark mode toggle.
* **[converter].html** - Independent module pages containing their respective algorithms and Vis.js initializers.

---

## 🤝 Contributing

Contributions from the academic and open-source community are highly encouraged! Whether you are implementing a new conversion algorithm, optimizing graph rendering, or improving accessibility, your help is welcome.

1. Fork the Project
2. Create your Feature Branch (\git checkout -b feature/AmazingFeature\)
3. Commit your Changes (\git commit -m 'Add some AmazingFeature'\)
4. Push to the Branch (\git push origin feature/AmazingFeature\)
5. Open a Pull Request

*Please ensure any UI additions utilize the existing Glassmorphism CSS classes and inline SVG iconography.*

---

## 📄 License

This project is open-source and available under the **MIT License**. See the LICENSE file for more information.

---

## 🏆 Acknowledgments

* Designed and Developed by **Hussnain Bashir**.
* Built upon classical theoretical computer science algorithms defined by Michael Sipser and Jeffrey Ullman.
* Visualization powered by the excellent [Vis.js library](https://visjs.org/).
