// RegEx to NFA conversion and UI integration for Automata Visualizer Pro

// Add regex simplification before NFA construction
function simplifyRegexForNFA(regex) {
  // Remove duplicate alternatives: a*b+a*b => a*b
  const parts = regex.split('+').map(s => s.trim()).filter(Boolean);
  const unique = Array.from(new Set(parts));
  return unique.join('+');
}

// Thompson's construction for basic regex (a|b, ab, a*, etc.)
function regexToNFA(regex) {
  regex = simplifyRegexForNFA(regex);
  // Compact construction for simple patterns
  if (/^[a-zA-Z0-9]$/.test(regex)) {
    // Single symbol: a
    return {
      states: ['q0', 'q1'],
      alphabet: [regex],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: { 'q0': { [regex]: ['q1'] }, 'q1': {} }
    };
  }
  if (/^[a-zA-Z0-9]\*$/.test(regex)) {
    // a*
    const sym = regex[0];
    return {
      states: ['q0'],
      alphabet: [sym],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: { 'q0': { [sym]: ['q0'] } }
    };
  }
  if (/^[a-zA-Z0-9]\+$/.test(regex)) {
    // a+
    const sym = regex[0];
    return {
      states: ['q0', 'q1'],
      alphabet: [sym],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: { 'q0': { [sym]: ['q1'] }, 'q1': { [sym]: ['q1'] } }
    };
  }
  if (/^[a-zA-Z0-9]{2}$/.test(regex)) {
    // ab
    const s1 = regex[0], s2 = regex[1];
    return {
      states: ['q0', 'q1', 'q2'],
      alphabet: [s1, s2],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: { 'q0': { [s1]: ['q1'] }, 'q1': { [s2]: ['q2'] }, 'q2': {} }
    };
  }
  // Special case: (a|b|c...)* (robust to spaces)
  const matchStarUnion = /^\(\s*([a-zA-Z0-9](\s*\|\s*[a-zA-Z0-9])*)\s*\)\*$/;
  const starUnion = regex.replace(/\s+/g, '').match(/^\(([a-zA-Z0-9](\|[a-zA-Z0-9])*)\)\*$/);
  if (starUnion) {
    // Extract symbols from inside the parentheses
    const syms = starUnion[1].split('|');
    const alphabet = Array.from(new Set(syms));
    const transitions = { 'q0': {} };
    for (const sym of alphabet) {
      transitions['q0'][sym] = ['q0'];
    }
    return {
      states: ['q0'],
      alphabet,
      initialState: 'q0',
      finalStates: ['q0'],
      transitions
    };
  }
  // Otherwise, use Thompson's construction
  let stateCount = 0;
  function newState() { return 'q' + (stateCount++); }

  // Helper: create NFA fragment
  function fragment(start, end, transitions) {
    return { start, end, transitions };
  }

  // Helper: merge transitions
  function mergeTransitions(t1, t2) {
    const t = JSON.parse(JSON.stringify(t1));
    for (const s in t2) {
      if (!t[s]) t[s] = {};
      for (const sym in t2[s]) {
        if (!t[s][sym]) t[s][sym] = [];
        t[s][sym].push(...t2[s][sym]);
      }
    }
    return t;
  }

  // Recursive descent parser for regex
  let i = 0;
  function parseExpr() {
    let term = parseTerm();
    while (regex[i] === '|') {
      i++;
      const right = parseTerm();
      term = alternate(term, right);
    }
    return term;
  }
  function parseTerm() {
    let factor = parseFactor();
    while (i < regex.length && regex[i] !== ')' && regex[i] !== '|') {
      const next = parseFactor();
      factor = concat(factor, next);
    }
    return factor;
  }
  function parseFactor() {
    let base = parseBase();
    while (regex[i] === '*') {
      i++;
      base = star(base);
    }
    return base;
  }
  function parseBase() {
    if (regex[i] === '(') {
      i++;
      const expr = parseExpr();
      if (regex[i] !== ')') throw new Error('Unmatched (');
      i++;
      return expr;
    } else if (regex[i] && regex[i] !== ')' && regex[i] !== '|' && regex[i] !== '*') {
      const s = newState(), e = newState();
      const sym = regex[i++];
      return fragment(s, e, { [s]: { [sym]: [e] } });
    } else {
      throw new Error('Unexpected character: ' + regex[i]);
    }
  }
  function alternate(f1, f2) {
    const s = newState(), e = newState();
    const t = mergeTransitions(
      mergeTransitions(f1.transitions, f2.transitions),
      { [s]: { 'ε': [f1.start, f2.start] }, [f1.end]: { 'ε': [e] }, [f2.end]: { 'ε': [e] } }
    );
    return fragment(s, e, t);
  }
  function concat(f1, f2) {
    const t = mergeTransitions(
      mergeTransitions(f1.transitions, f2.transitions),
      { [f1.end]: { 'ε': [f2.start] } }
    );
    return fragment(f1.start, f2.end, t);
  }
  function star(f) {
    const s = newState(), e = newState();
    const t = mergeTransitions(
      f.transitions,
      { [s]: { 'ε': [f.start, e] }, [f.end]: { 'ε': [f.start, e] } }
    );
    return fragment(s, e, t);
  }

  const nfaFrag = parseExpr();
  if (i !== regex.length) throw new Error('Unexpected end');

  // Collect all states and alphabet
  const states = new Set();
  const alphabet = new Set();
  for (const from in nfaFrag.transitions) {
    states.add(from);
    for (const sym in nfaFrag.transitions[from]) {
      if (sym !== 'ε') alphabet.add(sym);
      for (const to of nfaFrag.transitions[from][sym]) states.add(to);
    }
  }
  return {
    states: Array.from(states),
    alphabet: Array.from(alphabet),
    initialState: nfaFrag.start,
    finalStates: [nfaFrag.end],
    transitions: nfaFrag.transitions
  };
}

// UI integration
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('regex-input');
  const convertBtn = document.getElementById('convert-btn');
  const stepsDiv = document.getElementById('steps-content');
  const resetBtn = document.getElementById('reset-nfa');

  if (!input || !convertBtn) return;

  convertBtn.onclick = () => {
    const regex = input.value.trim();
    if (!regex) {
      alert('Please enter a regular expression.');
      return;
    }
    try {
      const nfa = regexToNFA(regex);
      // Render NFA
      const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
      nfaRenderer.renderAutomaton(nfa, 'nfa');
      // Show steps (simple for now)
      stepsDiv.innerHTML = `<div class='step'>Constructed NFA for regex: <code>${regex}</code></div>`;
    } catch (e) {
      stepsDiv.innerHTML = `<div class='step' style='color:red;'>Error: ${e.message}</div>`;
    }
  };

  if (resetBtn) {
    resetBtn.onclick = () => {
      input.value = '';
      const nfaGraph = document.getElementById('nfa-graph-vis');
      if (nfaGraph) nfaGraph.innerHTML = '';
      stepsDiv.innerHTML = '';
    };
  }
}); 