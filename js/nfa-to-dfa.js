// NFA → DFA conversion logic for Automata Visualizer Pro
// Subset construction with step-by-step explanation

function convertNfaToDfa(nfa) {
  const steps = [];
  const dfaStates = [];
  const dfaTransitions = {};
  const dfaFinalStates = [];
  const stateMap = new Map(); // DFA state name -> Set of NFA states
  const nfaAlphabet = nfa.alphabet.filter(a => a !== 'ε');

  // Helper: set to string
  function setToName(set) {
    return [...set].sort().join('');
  }

  // ε-closure
  function epsilonClosure(states) {
    const stack = [...states];
    const closure = new Set(states);
    while (stack.length) {
      const state = stack.pop();
      (nfa.transitions[state]?.['ε'] || []).forEach(next => {
        if (!closure.has(next)) {
          closure.add(next);
          stack.push(next);
        }
      });
    }
    return closure;
  }

  // Initial DFA state
  const initialSet = epsilonClosure([nfa.initialState]);
  const initialName = setToName(initialSet);
  dfaStates.push(initialName);
  stateMap.set(initialName, initialSet);
  if ([...initialSet].some(s => nfa.finalStates.includes(s))) dfaFinalStates.push(initialName);
  steps.push(`Start with ε-closure of ${nfa.initialState}: {${[...initialSet].join(', ')}} → DFA state ${initialName}`);

  // Subset construction with trap state
  const queue = [initialName];
  const trapName = '∅'; // or 'TRAP'
  let trapNeeded = false;

  while (queue.length) {
    const current = queue.shift();
    const currentSet = stateMap.get(current);
    dfaTransitions[current] = {};
    for (const symbol of nfaAlphabet) {
      let moveSet = new Set();
      for (const nfaState of currentSet) {
        (nfa.transitions[nfaState]?.[symbol] || []).forEach(tgt => moveSet.add(tgt));
      }
      const closure = epsilonClosure([...moveSet]);
      let name;
      if (closure.size === 0) {
        name = trapName;
        trapNeeded = true;
      } else {
        name = setToName(closure);
        if (!stateMap.has(name)) {
          stateMap.set(name, closure);
          dfaStates.push(name);
          queue.push(name);
          steps.push(`On '${symbol}' from DFA state ${current}: {${[...currentSet].join(', ')}} → {${[...closure].join(', ')}} → DFA state ${name}`);
          if ([...closure].some(s => nfa.finalStates.includes(s))) dfaFinalStates.push(name);
        }
      }
      dfaTransitions[current][symbol] = name;
    }
  }

  // Add trap state if needed
  if (trapNeeded) {
    dfaStates.push(trapName);
    dfaTransitions[trapName] = {};
    for (const symbol of nfaAlphabet) {
      dfaTransitions[trapName][symbol] = trapName;
    }
  }

  // Remove duplicate finals
  const uniqueFinals = [...new Set(dfaFinalStates)];

  // Build DFA object
  const dfa = {
    states: dfaStates,
    alphabet: nfaAlphabet,
    initialState: initialName,
    finalStates: uniqueFinals,
    transitions: dfaTransitions,
    stateMap
  };
  return { dfa, steps };
}

// Unified NFA→DFA conversion with step-by-step and full conversion support
function convertNfaToDfaWithSteps(nfa) {
  const dfaStates = new Map();
  let dfaStateCounter = 0;
  const dfaTransitions = [];
  const dfaFinalStates = [];
  const TRAP_STATE_ID = '∅';
  let trapStateCreated = false;
  const steps = [];

  function setToString(set) {
    if (set.size === 0) return '{}';
    return `{${[...set].sort().join(',')}}`;
  }
  function getDfaStateName(nfaStateSet, createIfMissing = true) {
    const setString = setToString(nfaStateSet);
    if (dfaStates.has(setString)) return dfaStates.get(setString);
    if (!createIfMissing) return null;
    const newStateName = `S${dfaStateCounter++}`;
    dfaStates.set(setString, newStateName);
    return newStateName;
  }
  function epsilonClosure(states) {
    const closure = new Set(states);
    const stack = [...states];
    while (stack.length > 0) {
      const u = stack.pop();
      const epsilonTransitions = nfa.transitions[u]?.['ε'] || [];
      for (const v of epsilonTransitions) {
        if (!closure.has(v)) {
          closure.add(v);
          stack.push(v);
        }
      }
    }
    return closure;
  }
  function move(states, symbol) {
    const reachableStates = new Set();
    for (const state of states) {
      const transitions = nfa.transitions[state]?.[symbol] || [];
      for (const nextState of transitions) {
        reachableStates.add(nextState);
      }
    }
    return reachableStates;
  }

  const initialClosure = epsilonClosure(new Set([nfa.initialState || nfa.startState]));
  const q0_dfa = getDfaStateName(initialClosure);
  const worklist = [initialClosure];
  const processedSets = new Set([setToString(initialClosure)]);

  steps.push({
    type: 'START_STATE',
    nfaStartState: nfa.initialState || nfa.startState,
    closure: initialClosure,
    dfaStateName: q0_dfa,
    message: `The initial state of the DFA is the ε-closure of the NFA's start state '${nfa.initialState || nfa.startState}'.\nε-closure(${nfa.initialState || nfa.startState}) = ${setToString(initialClosure)}.\nLet's call this new state '${q0_dfa}'.`
  });

  while (worklist.length > 0) {
    const currentSet = worklist.shift();
    const currentDfaStateName = getDfaStateName(currentSet);
    const currentSetString = setToString(currentSet);

    steps.push({
      type: 'PROCESS_STATE',
      dfaStateName: currentDfaStateName,
      nfaStates: currentSet,
      message: `Processing DFA state '${currentDfaStateName}' which corresponds to NFA states ${currentSetString}.`
    });

    for (const symbol of nfa.alphabet) {
      const moveResult = move(currentSet, symbol);
      const nextClosure = epsilonClosure(moveResult);

      if (nextClosure.size === 0) {
        if (!trapStateCreated) {
          steps.push({ type: 'CREATE_TRAP_STATE' });
          trapStateCreated = true;
        }
        dfaTransitions.push({ from: currentDfaStateName, to: TRAP_STATE_ID, label: symbol });
        steps.push({
          type: 'TRANSITION_TO_TRAP',
          fromDfaState: currentDfaStateName,
          fromSet: currentSet,
          symbol: symbol,
          moveResult: moveResult,
          message: `For state '${currentDfaStateName}' and input '${symbol}':\n- move(${currentSetString}, '${symbol}') = ${setToString(moveResult)}\n- ε-closure of an empty set is the empty set.\n- This leads to the non-final trap state '${TRAP_STATE_ID}'.\n- Add transition: (${currentDfaStateName}, '${symbol}') -> ${TRAP_STATE_ID}`
        });
        continue;
      }

      const nextSetString = setToString(nextClosure);
      let nextDfaStateName = getDfaStateName(nextClosure, false);
      let isNewState = false;
      if (nextDfaStateName === null) {
        isNewState = true;
        nextDfaStateName = getDfaStateName(nextClosure, true);
        worklist.push(nextClosure);
        processedSets.add(nextSetString);
      }
      dfaTransitions.push({ from: currentDfaStateName, to: nextDfaStateName, label: symbol });
      steps.push({
        type: 'TRANSITION',
        fromDfaState: currentDfaStateName,
        fromSet: currentSet,
        symbol: symbol,
        moveResult: moveResult,
        nextClosure: nextClosure,
        toDfaState: nextDfaStateName,
        isNew: isNewState,
        message: `For state '${currentDfaStateName}' and input '${symbol}':\n- move(${currentSetString}, '${symbol}') = ${setToString(moveResult)}\n- ε-closure(${setToString(moveResult)}) = ${nextSetString}\n- This gives us state '${nextDfaStateName}'. ${isNewState ? 'This is a new state.' : 'We have seen this state before.'}\n- Add transition: (${currentDfaStateName}, '${symbol}') -> ${nextDfaStateName}`
      });
    }
  }
  // Add trap state transitions
  if (trapStateCreated) {
    for (const symbol of nfa.alphabet) {
      dfaTransitions.push({ from: TRAP_STATE_ID, to: TRAP_STATE_ID, label: symbol });
    }
  }
  // Final states
  for (const [setStr, dfaName] of dfaStates.entries()) {
    const nfaSet = setStr === '{}' ? new Set() : new Set(setStr.slice(1, -1).split(','));
    if ([...nfaSet].some(s => (nfa.finalStates || nfa.final || []).includes(s))) {
      dfaFinalStates.push(dfaName);
    }
  }
  if (trapStateCreated) dfaStates.set('{}', TRAP_STATE_ID);

  // Build stateMap for visualization
  const stateMap = new Map(Array.from(dfaStates.entries()).map(([setStr, name]) => [name, setStr]));

  steps.push({
    type: 'FINAL_STATES',
    finalStates: dfaFinalStates,
    message: `A DFA state is final if its set of NFA states contains any of the NFA's final states (${setToString(new Set(nfa.finalStates || nfa.final || []))}).\nThe final DFA states are: {${dfaFinalStates.join(', ')}}`
  });

  return {
    dfa: {
      states: Array.from(dfaStates.values()),
      alphabet: nfa.alphabet,
      initialState: q0_dfa,
      startState: q0_dfa, // for compatibility
      finalStates: dfaFinalStates,
      transitions: dfaTransitions,
      stateMap
    },
    steps
  };
}

// Export for use in UI
window.convertNfaToDfaWithSteps = convertNfaToDfaWithSteps;

// Integration: wire up convert button and step display
window.addEventListener('DOMContentLoaded', () => {
  const convertBtn = document.getElementById('convert-btn');
  if (!convertBtn) return;
  convertBtn.onclick = () => {
    const nfa = window.visualNFABuilder.nfa;
    if (!nfa.initialState) {
      alert('Please set an initial state for the NFA before converting.');
      return;
    }
    if (!nfa.finalStates || nfa.finalStates.length === 0) {
      alert('Please set at least one final state for the NFA before converting.');
      return;
    }
    const { dfa, steps } = convertNfaToDfa(nfa);
    const dfaRenderer = new VisGraphRenderer('dfa-graph-vis');
    dfaRenderer.renderAutomaton(dfa, 'dfa');
    // Save renderer globally for fit view
    window.dfaGraphRenderer = dfaRenderer;
    const stepsDiv = document.getElementById('steps-content');
    stepsDiv.innerHTML = steps.map(s => `<div class='step'>${s}</div>`).join('');
  };

  // Fit All Graphs button
  const fitAllBtn = document.getElementById('fit-all-view');
  if (fitAllBtn) {
    fitAllBtn.onclick = () => {
      // Fit NFA
      if (window.visualNFABuilder && window.visualNFABuilder.renderer && window.visualNFABuilder.renderer.network) {
        const renderer = window.visualNFABuilder.renderer;
        const positions = renderer.network.getPositions();
        const nodeIds = Object.keys(positions).filter(id => id !== 'start_node');
        if (nodeIds.length === 0) {
          alert('NFA graph is empty. Nothing to fit!');
        } else if (nodeIds.length === 1) {
          // Optionally zoom in on the single node
          renderer.network.moveTo({ scale: 1.5, animation: true });
        } else {
          renderer.network.fit({ animation: true, padding: 40 });
        }
      }
      // Fit DFA
      if (window.dfaGraphRenderer && window.dfaGraphRenderer.network) {
        const renderer = window.dfaGraphRenderer;
        const positions = renderer.network.getPositions();
        const nodeIds = Object.keys(positions).filter(id => id !== 'start_node');
        if (nodeIds.length === 0) {
          alert('DFA graph is empty. Nothing to fit!');
        } else if (nodeIds.length === 1) {
          renderer.network.moveTo({ scale: 1.5, animation: true });
        } else {
          renderer.network.fit({ animation: true, padding: 40 });
        }
      }
    };
  }
}); 