// TOA → FA conversion and UI integration for Automata Visualizer Pro

// For now, reuse VisualNFABuilder for TOA visual editing
window.addEventListener('DOMContentLoaded', () => {
  // Initialize the builder for the TOA graph
  if (!window.visualNFABuilder) {
    window.visualNFABuilder = new VisualNFABuilder('nfa-graph-vis');
  }

  // Convert to FA button logic
  const convertBtn = document.getElementById('convert-btn');
  if (convertBtn) {
    convertBtn.onclick = () => {
      const toa = window.visualNFABuilder.nfa;
      if (!toa.initialState) {
        alert('Please set an initial state for the TOA before converting.');
        return;
      }
      if (!toa.finalStates || toa.finalStates.length === 0) {
        alert('Please set at least one final state for the TOA before converting.');
        return;
      }
      // Simple TOA to FA conversion: just rename states to uppercase
      const stateMap = {};
      toa.states.forEach(s => { stateMap[s] = s.toUpperCase(); });
      const fa = {
        states: toa.states.map(s => stateMap[s]),
        alphabet: [...toa.alphabet],
        initialState: stateMap[toa.initialState],
        finalStates: toa.finalStates.map(s => stateMap[s]),
        transitions: {}
      };
      for (const from in toa.transitions) {
        fa.transitions[stateMap[from]] = {};
        for (const sym in toa.transitions[from]) {
          fa.transitions[stateMap[from]][sym] = toa.transitions[from][sym].map(t => stateMap[t]);
        }
      }
      // Render the FA
      const dfaRenderer = new VisGraphRenderer('dfa-graph-vis');
      dfaRenderer.renderAutomaton(fa, 'dfa');
      window.dfaGraphRenderer = dfaRenderer;
      // Show step-by-step explanation
      const steps = [
        `Start with TOA: states {${toa.states.join(', ')}}, initial state ${toa.initialState}, final states {${toa.finalStates.join(', ')}}.`,
        `Transitions: ` + Object.entries(toa.transitions).map(([from, trans]) => Object.entries(trans).map(([sym, tos]) => `${from} --${sym}--> ${tos.join(', ')}`).join('; ')).join('; '),
        `Rename states for FA: ${toa.states.map(s => `${s}→${stateMap[s]}`).join(', ')}.`,
        `Resulting FA: ` + Object.entries(fa.transitions).map(([from, trans]) => Object.entries(trans).map(([sym, tos]) => `${from} --${sym}--> ${tos.join(', ')}`).join('; ')).join('; ') + `. Final states: {${fa.finalStates.join(', ')}}.`
      ];
      const stepsDiv = document.getElementById('steps-content');
      if (stepsDiv) {
        stepsDiv.innerHTML = steps.map(s => `<div class='step'>${s}</div>`).join('');
      }
    };
  }
}); 