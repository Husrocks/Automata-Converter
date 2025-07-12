// Visual NFA Builder for Automata Visualizer Pro
// Features: add/remove/edit states & transitions, set initial/final, drag-and-drop, live graph

class VisualNFABuilder {
  constructor(nfaGraphId) {
    this.nfaGraphId = nfaGraphId;
    this.nfa = {
      states: [],
      alphabet: [],
      initialState: null,
      finalStates: [],
      transitions: {}
    };
    this.statePositions = {}; // state -> {x, y}
    this.selectedState = null;
    this.selectedTransition = null;
    this.visNetwork = null;
    this.initUI();
    this.render();
  }

  initUI() {
    // Button handlers
    document.getElementById('add-state').onclick = () => this.addStatePrompt();
    document.getElementById('add-transition').onclick = () => this.addTransitionPrompt();
    document.getElementById('set-initial').onclick = () => this.setInitialPrompt();
    document.getElementById('set-final').onclick = () => this.setFinalPrompt();
    document.getElementById('reset-nfa').onclick = () => this.reset();
    const fitBtn = document.getElementById('fit-nfa-view');
    if (fitBtn) fitBtn.onclick = () => this.fitView();
  }

  addStatePrompt() {
    const name = prompt('Enter new state name (e.g., q0):');
    if (!name || this.nfa.states.includes(name)) return;
    this.nfa.states.push(name);
    this.nfa.transitions[name] = {};
    this.statePositions[name] = { x: 100 + 80 * this.nfa.states.length, y: 200 };
    this.render();
  }

  addTransitionPrompt() {
    if (this.nfa.states.length < 2) return alert('Add at least 2 states first.');
    const from = prompt('From state:');
    const symbol = prompt('Input symbol (use ε for epsilon):');
    const to = prompt('To state:');
    if (!from || !to || !symbol) return;
    if (!this.nfa.states.includes(from) || !this.nfa.states.includes(to)) return alert('Invalid state.');
    if (!this.nfa.alphabet.includes(symbol) && symbol !== 'ε') this.nfa.alphabet.push(symbol);
    if (!this.nfa.transitions[from][symbol]) this.nfa.transitions[from][symbol] = [];
    if (!this.nfa.transitions[from][symbol].includes(to)) this.nfa.transitions[from][symbol].push(to);
    this.render();
  }

  setInitialPrompt() {
    const state = prompt('Set initial state:');
    if (!this.nfa.states.includes(state)) return;
    this.nfa.initialState = state;
    this.render();
  }

  setFinalPrompt() {
    const state = prompt('Set final state:');
    if (!this.nfa.states.includes(state)) return;
    if (!this.nfa.finalStates.includes(state)) this.nfa.finalStates.push(state);
    this.render();
  }

  reset() {
    if (!confirm('Reset NFA?')) return;
    this.nfa = {
      states: [],
      alphabet: [],
      initialState: null,
      finalStates: [],
      transitions: {}
    };
    this.statePositions = {};
    this.selectedState = null;
    this.selectedTransition = null;
    this.render();
  }

  // Advanced: edit/remove state/transition by clicking
  handleNodeClick(nodeId) {
    if (!nodeId || nodeId === 'start_node') return;
    const action = prompt(`Edit state '${nodeId}': [r]ename, [d]elete, [c]ancel`, 'c');
    if (action === 'r') {
      const newName = prompt('New state name:', nodeId);
      if (!newName || this.nfa.states.includes(newName)) return;
      // Rename in states, transitions, finalStates, initialState
      this.nfa.states = this.nfa.states.map(s => s === nodeId ? newName : s);
      this.nfa.finalStates = this.nfa.finalStates.map(s => s === nodeId ? newName : s);
      if (this.nfa.initialState === nodeId) this.nfa.initialState = newName;
      this.nfa.transitions[newName] = this.nfa.transitions[nodeId];
      delete this.nfa.transitions[nodeId];
      for (const from in this.nfa.transitions) {
        for (const sym in this.nfa.transitions[from]) {
          this.nfa.transitions[from][sym] = this.nfa.transitions[from][sym].map(t => t === nodeId ? newName : t);
        }
      }
      this.statePositions[newName] = this.statePositions[nodeId];
      delete this.statePositions[nodeId];
    } else if (action === 'd') {
      // Remove state
      this.nfa.states = this.nfa.states.filter(s => s !== nodeId);
      this.nfa.finalStates = this.nfa.finalStates.filter(s => s !== nodeId);
      if (this.nfa.initialState === nodeId) this.nfa.initialState = null;
      delete this.nfa.transitions[nodeId];
      for (const from in this.nfa.transitions) {
        for (const sym in this.nfa.transitions[from]) {
          this.nfa.transitions[from][sym] = this.nfa.transitions[from][sym].filter(t => t !== nodeId);
        }
      }
      delete this.statePositions[nodeId];
    }
    this.render();
  }

  handleEdgeClick(edgeId) {
    // Edge id: from-to-symbol
    const [from, to, symbol] = edgeId.split('-');
    const action = prompt(`Edit transition ${from} --${symbol}→ ${to}: [d]elete, [c]ancel`, 'c');
    if (action === 'd') {
      this.nfa.transitions[from][symbol] = this.nfa.transitions[from][symbol].filter(t => t !== to);
      if (this.nfa.transitions[from][symbol].length === 0) delete this.nfa.transitions[from][symbol];
      this.render();
    }
  }

  render() {
    // Save globally for conversion
    window.visualNFABuilder = this;
    // Render with Vis.js
    this.renderer = new VisGraphRenderer(this.nfaGraphId);
    this.renderer.renderAutomaton(this.nfa, 'nfa');
    // Add drag-and-drop and click handlers
    setTimeout(() => {
      const container = document.getElementById(this.nfaGraphId);
      if (!container || !this.renderer.network) return;
      this.renderer.network.on('dragEnd', params => {
        if (params.nodes.length) {
          const nodeId = params.nodes[0];
          const pos = this.renderer.network.getPositions([nodeId])[nodeId];
          this.statePositions[nodeId] = pos;
        }
      });
      this.renderer.network.on('click', params => {
        if (params.nodes.length) {
          this.handleNodeClick(params.nodes[0]);
        } else if (params.edges.length) {
          this.handleEdgeClick(params.edges[0]);
        }
      });
    }, 100);
  }

  fitView() {
    if (this.renderer && this.renderer.network) {
      const positions = this.renderer.network.getPositions();
      const nodeIds = Object.keys(positions).filter(id => id !== 'start_node');
      if (nodeIds.length > 0) {
        // Calculate center
        let sumX = 0, sumY = 0;
        nodeIds.forEach(id => {
          sumX += positions[id].x;
          sumY += positions[id].y;
        });
        const center = { x: sumX / nodeIds.length, y: sumY / nodeIds.length };
        this.renderer.network.moveTo({ position: center, scale: 1, animation: true });
      }
      setTimeout(() => {
        this.renderer.network.redraw();
        this.renderer.network.fit({ animation: true });
      }, 100);
    }
  }

  // For loading an NFA (e.g., from solved example)
  loadNFA(nfa) {
    this.nfa = JSON.parse(JSON.stringify(nfa));
    // Reset positions
    this.statePositions = {};
    this.render();
  }
}

// Initialize builder on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  new VisualNFABuilder('nfa-graph-vis');

  // TM transition modal logic (only on TM to FA page)
  if (window.location.pathname.includes('tm-to-fa.html')) {
    const addTransBtn = document.getElementById('add-transition');
    const modal = document.getElementById('tm-transition-modal');
    const fromInput = document.getElementById('tm-from-state');
    const readInput = document.getElementById('tm-read');
    const writeInput = document.getElementById('tm-write');
    const moveInput = document.getElementById('tm-move');
    const toInput = document.getElementById('tm-to-state');
    const confirmBtn = document.getElementById('tm-add-transition-confirm');
    const cancelBtn = document.getElementById('tm-add-transition-cancel');
    if (addTransBtn && modal && fromInput && readInput && writeInput && moveInput && toInput && confirmBtn && cancelBtn) {
      addTransBtn.onclick = () => {
        fromInput.value = '';
        readInput.value = '';
        writeInput.value = '';
        moveInput.value = 'R';
        toInput.value = '';
        modal.style.display = 'flex';
      };
      cancelBtn.onclick = () => {
        modal.style.display = 'none';
      };
      confirmBtn.onclick = () => {
        const from = fromInput.value.trim();
        const read = readInput.value.trim();
        const write = writeInput.value.trim();
        const move = moveInput.value;
        const to = toInput.value.trim();
        if (!from || !to) {
          alert('Please enter both from and to states.');
          return;
        }
        // Add states if missing
        const builder = window.visualNFABuilder;
        if (!builder.nfa.states.includes(from)) builder.nfa.states.push(from);
        if (!builder.nfa.states.includes(to)) builder.nfa.states.push(to);
        // Add transition
        if (!builder.nfa.transitions[from]) builder.nfa.transitions[from] = {};
        const key = read;
        if (!builder.nfa.transitions[from][key]) builder.nfa.transitions[from][key] = [];
        builder.nfa.transitions[from][key].push({ to, write, move });
        builder.render();
        modal.style.display = 'none';
      };
    }

    // Tape simulation state
    let tape = [];
    let head = 0;
    let tmState = null;
    let halted = false;
    let tapeInput = '';
    let tmBuilder = window.visualNFABuilder;

    // Helper: update tape visualization
    function updateTapeViz() {
      const tapeDiv = document.getElementById('tm-tape-visualization');
      if (!tapeDiv) return;
      let html = '<div style="display:inline-flex; align-items:center; gap:2px;">';
      for (let i = 0; i < tape.length; ++i) {
        const isHead = i === head;
        html += `<div style="padding:0.5rem 0.7rem; border-radius:0.4rem; background:${isHead ? '#f59e42' : '#22223b'}; color:#fff; border:2px solid ${isHead ? '#fff' : '#6366f1'}; font-weight:bold; font-size:1.2rem; position:relative;">${tape[i] || 'B'}${isHead ? `<div style='position:absolute;top:100%;left:50%;transform:translateX(-50%);font-size:0.9rem;color:#fff;'>▼</div>` : ''}</div>`;
      }
      html += '</div>';
      html += `<div style='margin-top:0.7rem; color:#fff; font-size:1.1rem;'>Current State: <b>${tmState || ''}</b> ${halted ? '<span style="color:#f87171;">[HALTED]</span>' : ''}</div>`;
      tapeDiv.innerHTML = html;
    }

    // Helper: reset tape
    function resetTape() {
      const inputBox = document.getElementById('tm-tape-input');
      tapeInput = (inputBox && inputBox.value) ? inputBox.value : '';
      tape = tapeInput.split('');
      if (tape.length === 0) tape = ['B'];
      head = 0;
      tmState = tmBuilder.nfa.initialState || (tmBuilder.nfa.states[0] || 'q0');
      halted = false;
      updateTapeViz();
    }

    // Step simulation
    function tmStep() {
      if (halted) return;
      const currState = tmState;
      const currSymbol = tape[head] || 'B';
      const transitions = tmBuilder.nfa.transitions[currState] || {};
      const options = transitions[currSymbol] || transitions[''] || [];
      if (!options.length) {
        halted = true;
        updateTapeViz();
        return;
      }
      // Use the first available transition
      const t = options[0];
      // Write
      tape[head] = t.write || currSymbol;
      // Move
      if (t.move === 'R') {
        head++;
        if (head >= tape.length) tape.push('B');
      } else if (t.move === 'L') {
        head--;
        if (head < 0) {
          tape.unshift('B');
          head = 0;
        }
      }
      // State
      tmState = t.to;
      // Halt if in final state
      if (tmBuilder.nfa.finalStates && tmBuilder.nfa.finalStates.includes(tmState)) {
        halted = true;
      }
      updateTapeViz();
    }

    // Run simulation
    function tmRun() {
      let steps = 0;
      while (!halted && steps < 1000) {
        tmStep();
        steps++;
      }
    }

    // Wire up buttons
    const stepBtn = document.getElementById('tm-step-btn');
    const runBtn = document.getElementById('tm-run-btn');
    const resetBtn = document.getElementById('tm-reset-tape-btn');
    if (stepBtn) stepBtn.onclick = tmStep;
    if (runBtn) runBtn.onclick = tmRun;
    if (resetBtn) resetBtn.onclick = resetTape;
    // Reset tape on page load and when tape input changes
    resetTape();
    const tapeInputBox = document.getElementById('tm-tape-input');
    if (tapeInputBox) tapeInputBox.onchange = resetTape;
  }
}); 