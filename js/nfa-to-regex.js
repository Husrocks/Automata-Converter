// NFA → RegEx conversion logic for Automata Visualizer Pro
// State elimination method with step-by-step explanation

function convertNfaToRegex(nfa) {
  const steps = [];
  const regex = stateElimination(nfa, steps);
  return { regex, steps };
}

function stateElimination(nfa, steps) {
  // Create a copy of the NFA for manipulation
  const automaton = JSON.parse(JSON.stringify(nfa));
  const states = [...automaton.states];
  const finalStates = [...automaton.finalStates];
  
  steps.push('Starting NFA to RegEx conversion using state elimination method.');
  steps.push(`Initial states: ${states.join(', ')}`);
  steps.push(`Final states: ${finalStates.join(', ')}`);
  
  // If no final states, return empty language
  if (finalStates.length === 0) {
    steps.push('No final states found. The language is empty: ∅');
    return '∅';
  }
  
  // If no initial state, return empty language
  if (!automaton.initialState) {
    steps.push('No initial state found. The language is empty: ∅');
    return '∅';
  }
  
  // Add a new initial state if the current initial state has incoming transitions
  let hasIncomingToInitial = false;
  for (const state of states) {
    for (const symbol in automaton.transitions[state] || {}) {
      if (automaton.transitions[state][symbol].includes(automaton.initialState)) {
        hasIncomingToInitial = true;
        break;
      }
    }
    if (hasIncomingToInitial) break;
  }
  
  if (hasIncomingToInitial) {
    const newInitial = 'q_start';
    automaton.states.unshift(newInitial);
    automaton.transitions[newInitial] = { 'ε': [automaton.initialState] };
    automaton.initialState = newInitial;
    steps.push(`Added new initial state ${newInitial} with ε-transition to ${automaton.initialState}`);
  }
  
  // Add a new final state if there are multiple final states or outgoing transitions from final states
  let needsNewFinal = finalStates.length > 1;
  if (!needsNewFinal) {
    for (const symbol in automaton.transitions[finalStates[0]] || {}) {
      if (automaton.transitions[finalStates[0]][symbol].length > 0) {
        needsNewFinal = true;
        break;
      }
    }
  }
  
  if (needsNewFinal) {
    const newFinal = 'q_accept';
    automaton.states.push(newFinal);
    automaton.transitions[newFinal] = {};
    for (const finalState of finalStates) {
      if (!automaton.transitions[finalState]['ε']) automaton.transitions[finalState]['ε'] = [];
      automaton.transitions[finalState]['ε'].push(newFinal);
    }
    automaton.finalStates = [newFinal];
    steps.push(`Added new final state ${newFinal} with ε-transitions from all final states`);
  }
  
  // Eliminate states one by one (except initial and final)
  const statesToEliminate = automaton.states.filter(s => 
    s !== automaton.initialState && s !== automaton.finalStates[0]
  );
  
  steps.push(`States to eliminate: ${statesToEliminate.join(', ')}`);
  
  for (const state of statesToEliminate) {
    steps.push(`Eliminating state ${state}...`);
    
    // Find all incoming and outgoing transitions
    const incoming = [];
    const outgoing = [];
    const selfLoop = automaton.transitions[state][state] || [];
    
    for (const fromState of automaton.states) {
      for (const symbol in automaton.transitions[fromState] || {}) {
        if (automaton.transitions[fromState][symbol].includes(state)) {
          incoming.push({ from: fromState, symbol, to: state });
        }
      }
    }
    
    for (const symbol in automaton.transitions[state] || {}) {
      for (const toState of automaton.transitions[state][symbol]) {
        if (toState !== state) {
          outgoing.push({ from: state, symbol, to: toState });
        }
      }
    }
    
    // Create new transitions
    for (const inc of incoming) {
      for (const out of outgoing) {
        const newSymbol = combineRegex(inc.symbol, selfLoop, out.symbol);
        if (!automaton.transitions[inc.from][newSymbol]) {
          automaton.transitions[inc.from][newSymbol] = [];
        }
        if (!automaton.transitions[inc.from][newSymbol].includes(out.to)) {
          automaton.transitions[inc.from][newSymbol].push(out.to);
        }
      }
    }
    
    // Remove the eliminated state
    delete automaton.transitions[state];
    automaton.states = automaton.states.filter(s => s !== state);
    
    steps.push(`  Added transitions: ${incoming.length * outgoing.length} new transitions`);
  }
  
  // Now we have only initial and final states
  const initial = automaton.initialState;
  const final = automaton.finalStates[0];
  
  steps.push(`Final step: computing regex from ${initial} to ${final}`);
  
  // Get the direct transition from initial to final
  let regex = '';
  for (const symbol in automaton.transitions[initial] || {}) {
    if (automaton.transitions[initial][symbol].includes(final)) {
      if (regex) regex += '|';
      regex += symbol;
    }
  }
  
  if (!regex) {
    regex = '∅';
    steps.push('No path from initial to final state. Language is empty: ∅');
  } else {
    steps.push(`Final regular expression: ${regex}`);
  }
  
  return regex;
}

function combineRegex(symbol1, selfLoop, symbol2) {
  let result = '';
  
  // Handle symbol1
  if (symbol1 === 'ε') {
    result = '';
  } else {
    result = symbol1;
  }
  
  // Handle self-loop
  if (selfLoop && selfLoop.length > 0) {
    const selfLoopRegex = selfLoop.join('|');
    if (selfLoopRegex) {
      result += `(${selfLoopRegex})*`;
    }
  }
  
  // Handle symbol2
  if (symbol2 === 'ε') {
    // Do nothing
  } else {
    result += symbol2;
  }
  
  return result || 'ε';
}

// Export for use in UI
window.convertNfaToRegex = convertNfaToRegex;

// Integration: wire up convert button and step display
window.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  if (!convertBtn) return;
  
  convertBtn.onclick = () => {
    const nfa = window.visualNFABuilder?.nfa;
    if (!nfa) {
      alert('Please build an NFA first.');
      return;
    }
    if (!nfa.initialState) {
      alert('Please set an initial state for the NFA before converting.');
      return;
    }
    if (!nfa.finalStates || nfa.finalStates.length === 0) {
      alert('Please set at least one final state for the NFA before converting.');
      return;
    }
    
    const { regex, steps } = convertNfaToRegex(nfa);
    
    // Display the regex result
    const regexResult = document.getElementById('regex-result');
    if (regexResult) {
      regexResult.textContent = regex;
    }
    
    // Display the steps
    const stepsDiv = document.getElementById('steps-content');
    if (stepsDiv) {
      stepsDiv.innerHTML = steps.map(s => `<div class='step'>${s}</div>`).join('');
    }
  };
}); 