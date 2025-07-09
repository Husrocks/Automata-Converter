// Visual ε-NFA Builder for Automata Visualizer Pro
// Extends visual builder with ε-transition support

class VisualENFABuilder {
  constructor(enfaGraphId) {
    this.enfaGraphId = enfaGraphId;
    this.enfa = {
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
    document.getElementById('add-epsilon').onclick = () => this.addEpsilonTransitionPrompt();
    document.getElementById('set-initial').onclick = () => this.setInitialPrompt();
    document.getElementById('set-final').onclick = () => this.setFinalPrompt();
    document.getElementById('reset-enfa').onclick = () => this.reset();
    const fitBtn = document.getElementById('fit-all-view');
    if (fitBtn) fitBtn.onclick = () => this.fitView();
  }

  addStatePrompt() {
    const name = prompt('Enter new state name (e.g., q0):');
    if (!name || this.enfa.states.includes(name)) return;
    this.enfa.states.push(name);
    this.enfa.transitions[name] = {};
    this.statePositions[name] = { x: 100 + 80 * this.enfa.states.length, y: 200 };
    this.render();
  }

  addTransitionPrompt() {
    if (this.enfa.states.length < 2) return alert('Add at least 2 states first.');
    const from = prompt('From state:');
    const symbol = prompt('Input symbol:');
    const to = prompt('To state:');
    if (!from || !to || !symbol) return;
    if (!this.enfa.states.includes(from) || !this.enfa.states.includes(to)) return alert('Invalid state.');
    if (!this.enfa.alphabet.includes(symbol) && symbol !== 'ε') this.enfa.alphabet.push(symbol);
    if (!this.enfa.transitions[from][symbol]) this.enfa.transitions[from][symbol] = [];
    if (!this.enfa.transitions[from][symbol].includes(to)) this.enfa.transitions[from][symbol].push(to);
    this.render();
  }

  addEpsilonTransitionPrompt() {
    if (this.enfa.states.length < 2) return alert('Add at least 2 states first.');
    const from = prompt('From state:');
    const to = prompt('To state:');
    if (!from || !to) return;
    if (!this.enfa.states.includes(from) || !this.enfa.states.includes(to)) return alert('Invalid state.');
    if (!this.enfa.transitions[from]['ε']) this.enfa.transitions[from]['ε'] = [];
    if (!this.enfa.transitions[from]['ε'].includes(to)) this.enfa.transitions[from]['ε'].push(to);
    this.render();
  }

  setInitialPrompt() {
    const state = prompt('Set initial state:');
    if (!this.enfa.states.includes(state)) return;
    this.enfa.initialState = state;
    this.render();
  }

  setFinalPrompt() {
    const state = prompt('Set final state:');
    if (!this.enfa.states.includes(state)) return;
    if (!this.enfa.finalStates.includes(state)) this.enfa.finalStates.push(state);
    this.render();
  }

  reset() {
    if (!confirm('Reset ε-NFA?')) return;
    this.enfa = {
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
      if (!newName || this.enfa.states.includes(newName)) return;
      // Rename in states, transitions, finalStates, initialState
      this.enfa.states = this.enfa.states.map(s => s === nodeId ? newName : s);
      this.enfa.finalStates = this.enfa.finalStates.map(s => s === nodeId ? newName : s);
      if (this.enfa.initialState === nodeId) this.enfa.initialState = newName;
      this.enfa.transitions[newName] = this.enfa.transitions[nodeId];
      delete this.enfa.transitions[nodeId];
      for (const from in this.enfa.transitions) {
        for (const sym in this.enfa.transitions[from]) {
          this.enfa.transitions[from][sym] = this.enfa.transitions[from][sym].map(t => t === nodeId ? newName : t);
        }
      }
      this.statePositions[newName] = this.statePositions[nodeId];
      delete this.statePositions[nodeId];
    } else if (action === 'd') {
      // Remove state
      this.enfa.states = this.enfa.states.filter(s => s !== nodeId);
      this.enfa.finalStates = this.enfa.finalStates.filter(s => s !== nodeId);
      if (this.enfa.initialState === nodeId) this.enfa.initialState = null;
      delete this.enfa.transitions[nodeId];
      for (const from in this.enfa.transitions) {
        for (const sym in this.enfa.transitions[from]) {
          this.enfa.transitions[from][sym] = this.enfa.transitions[from][sym].filter(t => t !== nodeId);
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
      this.enfa.transitions[from][symbol] = this.enfa.transitions[from][symbol].filter(t => t !== to);
      if (this.enfa.transitions[from][symbol].length === 0) delete this.enfa.transitions[from][symbol];
      this.render();
    }
  }

  render() {
    // Save globally for conversion
    window.visualENFABuilder = this;
    // Render with Vis.js
    this.renderer = new VisGraphRenderer(this.enfaGraphId);
    this.renderer.renderAutomaton(this.enfa, 'enfa');
    // Add drag-and-drop and click handlers
    setTimeout(() => {
      const container = document.getElementById(this.enfaGraphId);
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

  // For loading an ε-NFA (e.g., from solved example)
  loadENFA(enfa) {
    this.enfa = JSON.parse(JSON.stringify(enfa));
    // Reset positions
    this.statePositions = {};
    this.render();
  }
}

// Initialize builder on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  new VisualENFABuilder('enfa-graph-vis');
}); 