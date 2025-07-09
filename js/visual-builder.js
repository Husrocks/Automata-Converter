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
}); 