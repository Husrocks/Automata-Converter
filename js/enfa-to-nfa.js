// ε-NFA → NFA conversion logic for Automata Visualizer Pro
// ε-closure computation and ε-transition removal

function convertEnfaToNfa(enfa) {
  const steps = [];
  const nfaStates = [...enfa.states];
  const nfaTransitions = {};
  const nfaFinalStates = [...enfa.finalStates];
  const nfaAlphabet = enfa.alphabet.filter(a => a !== 'ε');

  // Initialize transitions
  enfa.states.forEach(state => {
    nfaTransitions[state] = {};
    nfaAlphabet.forEach(symbol => {
      nfaTransitions[state][symbol] = [];
    });
  });

  steps.push(`Starting ε-NFA to NFA conversion. Removing ε-transitions and computing ε-closures.`);

  // ε-closure computation
  function epsilonClosure(states) {
    const stack = [...states];
    const closure = new Set(states);
    while (stack.length) {
      const state = stack.pop();
      (enfa.transitions[state]?.['ε'] || []).forEach(next => {
        if (!closure.has(next)) {
          closure.add(next);
          stack.push(next);
        }
      });
    }
    return closure;
  }

  // For each state and symbol, compute the new transitions
  for (const state of enfa.states) {
    const stateClosure = epsilonClosure([state]);
    steps.push(`Computing ε-closure for state ${state}: {${[...stateClosure].join(', ')}}`);

    for (const symbol of nfaAlphabet) {
      const reachableStates = new Set();
      
      // For each state in the ε-closure, find states reachable on symbol
      for (const closureState of stateClosure) {
        (enfa.transitions[closureState]?.[symbol] || []).forEach(next => {
          reachableStates.add(next);
        });
      }

      if (reachableStates.size > 0) {
        // Compute ε-closure of all reachable states
        const finalStates = epsilonClosure([...reachableStates]);
        nfaTransitions[state][symbol] = [...finalStates];
        
        steps.push(`  On '${symbol}' from ${state}: ${[...reachableStates].join(', ')} → ε-closure: {${[...finalStates].join(', ')}}`);
      }
    }
  }

  // Update final states: any state that can reach a final state via ε-transitions becomes final
  const newFinalStates = new Set(enfa.finalStates);
  for (const state of enfa.states) {
    const stateClosure = epsilonClosure([state]);
    if ([...stateClosure].some(s => enfa.finalStates.includes(s))) {
      newFinalStates.add(state);
    }
  }

  steps.push(`Updated final states: {${[...newFinalStates].join(', ')}}`);

  // Build NFA object
  const nfa = {
    states: nfaStates,
    alphabet: nfaAlphabet,
    initialState: enfa.initialState,
    finalStates: [...newFinalStates],
    transitions: nfaTransitions
  };

  return { nfa, steps };
}

// Unified ε-NFA→NFA conversion with step-by-step and full conversion support
function convertEnfaToNfaWithSteps(enfa) {
  const steps = [];
  const nfaStates = [...enfa.states];
  const nfaTransitions = {};
  const nfaAlphabet = enfa.alphabet.filter(a => a !== 'ε');

  // Initialize transitions
  enfa.states.forEach(state => {
    nfaTransitions[state] = {};
    nfaAlphabet.forEach(symbol => {
      nfaTransitions[state][symbol] = [];
    });
  });

  steps.push({
    type: 'START_CONVERSION',
    message: `Starting ε-NFA to NFA conversion.\nWe will:\n1. Compute ε-closures for each state\n2. Remove ε-transitions\n3. Update final states\n4. Create new transitions based on ε-closures`
  });

  // ε-closure computation
  function epsilonClosure(states) {
    const stack = [...states];
    const closure = new Set(states);
    while (stack.length) {
      const state = stack.pop();
      (enfa.transitions[state]?.['ε'] || []).forEach(next => {
        if (!closure.has(next)) {
          closure.add(next);
          stack.push(next);
        }
      });
    }
    return closure;
  }

  // Compute ε-closures for all states
  const epsilonClosures = {};
  for (const state of enfa.states) {
    epsilonClosures[state] = epsilonClosure([state]);
    steps.push({
      type: 'EPSILON_CLOSURE',
      state: state,
      closure: epsilonClosures[state],
      message: `ε-closure(${state}) = {${[...epsilonClosures[state]].join(', ')}}`
    });
  }

  // Create new transitions
  for (const state of enfa.states) {
    const stateClosure = epsilonClosures[state];
    
    for (const symbol of nfaAlphabet) {
      const reachableStates = new Set();
      
      // For each state in the ε-closure, find states reachable on symbol
      for (const closureState of stateClosure) {
        (enfa.transitions[closureState]?.[symbol] || []).forEach(next => {
          reachableStates.add(next);
        });
      }

      if (reachableStates.size > 0) {
        // Compute ε-closure of all reachable states
        const finalStates = epsilonClosure([...reachableStates]);
        nfaTransitions[state][symbol] = [...finalStates];
        
        steps.push({
          type: 'NEW_TRANSITION',
          fromState: state,
          symbol: symbol,
          reachableStates: reachableStates,
          finalStates: finalStates,
          message: `For state ${state} on symbol '${symbol}':\n- From ε-closure {${[...stateClosure].join(', ')}}\n- Reachable states: {${[...reachableStates].join(', ')}}\n- ε-closure of reachable states: {${[...finalStates].join(', ')}}\n- Add transition: (${state}, '${symbol}') → {${[...finalStates].join(', ')}}`
        });
      }
    }
  }

  // Update final states
  const newFinalStates = new Set(enfa.finalStates);
  for (const state of enfa.states) {
    const stateClosure = epsilonClosures[state];
    if ([...stateClosure].some(s => enfa.finalStates.includes(s))) {
      newFinalStates.add(state);
    }
  }

  steps.push({
    type: 'UPDATE_FINAL_STATES',
    originalFinals: enfa.finalStates,
    newFinals: [...newFinalStates],
    message: `Update final states:\n- Original final states: {${enfa.finalStates.join(', ')}}\n- Any state that can reach a final state via ε-transitions becomes final\n- New final states: {${[...newFinalStates].join(', ')}}`
  });

  // Build NFA object
  const nfa = {
    states: nfaStates,
    alphabet: nfaAlphabet,
    initialState: enfa.initialState,
    finalStates: [...newFinalStates],
    transitions: nfaTransitions
  };

  return { nfa, steps };
}

// Export for use in UI
window.convertEnfaToNfaWithSteps = convertEnfaToNfaWithSteps;

// Integration: wire up convert button and step display
window.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  if (!convertBtn) return;
  
  convertBtn.onclick = () => {
    const enfa = window.visualENFABuilder?.enfa;
    if (!enfa) {
      alert('Please build an ε-NFA first.');
      return;
    }
    if (!enfa.initialState) {
      alert('Please set an initial state for the ε-NFA before converting.');
      return;
    }
    if (!enfa.finalStates || enfa.finalStates.length === 0) {
      alert('Please set at least one final state for the ε-NFA before converting.');
      return;
    }
    
    const { nfa, steps } = convertEnfaToNfa(enfa);
    const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
    nfaRenderer.renderAutomaton(nfa, 'nfa');
    // Save renderer globally for fit view
    window.nfaGraphRenderer = nfaRenderer;
    
    const stepsDiv = document.getElementById('steps-content');
    stepsDiv.innerHTML = steps.map(s => `<div class='step'>${s}</div>`).join('');
  };

  // Fit All Graphs button
  const fitAllBtn = document.getElementById('fit-all-view');
  if (fitAllBtn) {
    fitAllBtn.onclick = () => {
      // Fit ε-NFA
      if (window.visualENFABuilder && window.visualENFABuilder.renderer && window.visualENFABuilder.renderer.network) {
        const renderer = window.visualENFABuilder.renderer;
        const positions = renderer.network.getPositions();
        const nodeIds = Object.keys(positions).filter(id => id !== 'start_node');
        if (nodeIds.length === 0) {
          alert('ε-NFA graph is empty. Nothing to fit!');
        } else if (nodeIds.length === 1) {
          renderer.network.moveTo({ scale: 1.5, animation: true });
        } else {
          renderer.network.fit({ animation: true, padding: 40 });
        }
      }
      // Fit NFA
      if (window.nfaGraphRenderer && window.nfaGraphRenderer.network) {
        const renderer = window.nfaGraphRenderer;
        const positions = renderer.network.getPositions();
        const nodeIds = Object.keys(positions).filter(id => id !== 'start_node');
        if (nodeIds.length === 0) {
          alert('NFA graph is empty. Nothing to fit!');
        } else if (nodeIds.length === 1) {
          renderer.network.moveTo({ scale: 1.5, animation: true });
        } else {
          renderer.network.fit({ animation: true, padding: 40 });
        }
      }
    };
  }
}); 