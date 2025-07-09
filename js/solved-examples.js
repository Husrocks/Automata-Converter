// Solved examples for Automata Visualizer Pro
window.solvedExamples = [
  {
    title: 'RegEx → NFA: (a|b)*abb',
    regex: '(a|b)*abb',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q3'],
      transitions: {
        'q0': { 'a': ['q0', 'q1'], 'b': ['q0'] },
        'q1': { 'b': ['q2'] },
        'q2': { 'b': ['q3'] },
        'q3': {}
      }
    },
    steps: [
      'Start with initial state q0.',
      'Loop on q0 for a and b to handle (a|b)*.',
      'On a from q0, move to q1 to start matching abb.',
      'On b from q1, move to q2.',
      'On b from q2, move to final state q3.',
      'q3 is the only final state, reached after reading abb at the end.'
    ]
  },
  {
    title: 'RegEx → NFA: (a|b)*a(a|b)',
    regex: '(a|b)*a(a|b)',
    nfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q0', 'q1'], 'b': ['q0'] },
        'q1': { 'a': ['q2'], 'b': ['q2'] },
        'q2': {}
      }
    },
    steps: [
      'Start with initial state q0.',
      'Loop on q0 for a and b to handle (a|b)*.',
      'On a from q0, move to q1 to start matching a(a|b).',
      'On a or b from q1, move to final state q2.',
      'q2 is the only final state, reached after reading a(a|b) at the end.'
    ]
  },
  {
    title: 'RegEx → NFA: a*b*',
    regex: 'a*b*',
    nfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0', 'q1'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'] },
        'q1': { 'b': ['q1'] }
      }
    },
    steps: [
      'Start with initial state q0.',
      'Loop on q0 for a to handle a*.',
      'On b from q0, move to q1 to start matching b*.',
      'Loop on q1 for b to handle b*.',
      'Both q0 and q1 are final states, accepting any number of a followed by any number of b.'
    ]
  },
  {
    title: 'TOA → FA: Simple Example',
    toa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q0'] }
      }
    },
    fa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q1' },
        'q1': { 'b': 'q0' }
      }
    },
    steps: [
      'Start with TOA.',
      'Convert transitions to FA format.',
      'Resulting FA accepts the same language.'
    ]
  },
  {
    title: 'PDA → CFG: Simple Example',
    pda: {
      states: ['q0', 'q1'],
      inputAlphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a,Z': [{ to: 'q0', push: 'AZ' }], 'b,A': [{ to: 'q1', push: '' }] }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSb', '']
      }
    },
    steps: [
      'Start with PDA.',
      'Construct variables and productions for each transition.',
      'Resulting CFG generates the same language.'
    ]
  },
  {
    title: 'CFG → PDA: Simple Example',
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSb', '']
      }
    },
    pda: {
      states: ['q0', 'q1'],
      inputAlphabet: ['a', 'b'],
      stackAlphabet: ['S', 'a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'ε,S': [{ to: 'q0', push: 'aSb' }], 'ε,S': [{ to: 'q0', push: '' }], 'a,a': [{ to: 'q0', push: '' }], 'b,b': [{ to: 'q0', push: '' }], 'ε,Z': [{ to: 'q1', push: 'Z' }] }
      }
    },
    steps: [
      'Start with CFG.',
      'Simulate leftmost derivation using stack.',
      'Resulting PDA accepts the same language.'
    ]
  },
  {
    title: 'TM → FA: Simple Example',
    tm: {
      states: ['q0', 'q1'],
      tapeAlphabet: ['a', 'b', '_'],
      inputAlphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': { to: 'q1', write: 'a', move: 'R' } }
      }
    },
    fa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q1' }
      }
    },
    steps: [
      'Start with TM.',
      'Simulate TM transitions as FA transitions (if possible).',
      'Resulting FA accepts a subset of the TM language.'
    ]
  },
  {
    title: 'DFA Minimizer: Simple Example',
    dfa: {
      states: ['A', 'B', 'C'],
      alphabet: ['0', '1'],
      initialState: 'A',
      finalStates: ['C'],
      transitions: {
        'A': { '0': 'B', '1': 'C' },
        'B': { '0': 'A', '1': 'C' },
        'C': { '0': 'C', '1': 'C' }
      }
    },
    minimizedDfa: {
      states: ['X', 'Y'],
      alphabet: ['0', '1'],
      initialState: 'X',
      finalStates: ['Y'],
      transitions: {
        'X': { '0': 'X', '1': 'Y' },
        'Y': { '0': 'X', '1': 'Y' }
      }
    },
    steps: [
      'Start with DFA.',
      'Group states by final/non-final.',
      'Merge equivalent states.',
      'Resulting DFA is minimized.'
    ]
  }
];

// Render solved examples as buttons and show graphs/steps on click
window.addEventListener('DOMContentLoaded', () => {
  const examplesDiv = document.getElementById('examples-content');
  if (!examplesDiv || !window.solvedExamples) return;
  examplesDiv.innerHTML = window.solvedExamples.map((ex, i) =>
    `<button class="btn-secondary example-btn" data-idx="${i}">${ex.title}</button>`
  ).join(' ');

  examplesDiv.querySelectorAll('.example-btn').forEach(btn => {
    btn.onclick = () => {
      const idx = btn.getAttribute('data-idx');
      const ex = window.solvedExamples[idx];
      
      // Check if this is an ε-NFA example, NFA→DFA example, or NFA→RegEx example
      if (ex.enfa) {
        // ε-NFA example
        const enfaRenderer = new VisGraphRenderer('enfa-graph-vis');
        enfaRenderer.renderAutomaton(ex.enfa, 'enfa');
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        // Load into builder
        if (window.visualENFABuilder) {
          window.visualENFABuilder.loadENFA(ex.enfa);
        }
      } else if (ex.regex) {
        // NFA→RegEx example
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        // Display regex result
        const regexResult = document.getElementById('regex-result');
        if (regexResult) {
          regexResult.textContent = ex.regex;
        }
        // Load into builder
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.nfa);
        }
      } else {
        // NFA→DFA example
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        const dfaRenderer = new VisGraphRenderer('dfa-graph-vis');
        dfaRenderer.renderAutomaton(ex.dfa, 'dfa');
        // Load into builder
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.nfa);
        }
      }
      
      // Show steps
      const stepsDiv = document.getElementById('steps-content');
      stepsDiv.innerHTML = ex.steps.map(s => `<div class='step'>${s}</div>`).join('');
    };
  });
}); 