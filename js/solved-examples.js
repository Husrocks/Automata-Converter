// Solved examples for Automata Visualizer Pro
window.solvedExamples = [
  // NFA→RegEx Example 1
  {
    title: 'NFA → RegEx: a*',
    nfa: {
      states: ['q0'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'] }
      }
    },
    regex: 'a*',
    steps: [
      'Single state with self-loop on a.',
      'Accepts any number of a, including empty string.'
    ]
  },
  // NFA→RegEx Example 2
  {
    title: 'NFA → RegEx: ab',
    nfa: {
      states: ['s', 'a', 'b'],
      alphabet: ['a', 'b'],
      initialState: 's',
      finalStates: ['b'],
      transitions: {
        's': { 'a': ['a'] },
        'a': { 'b': ['b'] },
        'b': {}
      }
    },
    regex: 'ab',
    steps: [
      's --a--> a --b--> b (final)',
      'Accepts only the string ab.'
    ]
  },
  // NFA→RegEx Example 3
  {
    title: 'NFA → RegEx: a+b',
    nfa: {
      states: ['q', 'e', 'w'],
      alphabet: ['a', 'b'],
      initialState: 'q',
      finalStates: ['e'],
      transitions: {
        'q': { 'a': ['q', 'w'], 'b': ['e'] },
        'w': { 'b': ['e'] },
        'e': {}
      }
    },
    regex: 'a*b+a*b',
    steps: [
      'q --a--> q (loop), q --b--> e (final), q --a--> w --b--> e (final)',
      'Accepts any number of a followed by b, or a then b.'
    ]
  },
  // NFA→RegEx Example 4
  {
    title: 'NFA → RegEx: (a|b)*',
    nfa: {
      states: ['x'],
      alphabet: ['a', 'b'],
      initialState: 'x',
      finalStates: ['x'],
      transitions: {
        'x': { 'a': ['x'], 'b': ['x'] }
      }
    },
    regex: '(a+b)*',
    steps: [
      'Single state with self-loops on a and b.',
      'Accepts any string of a and b.'
    ]
  },
  // NFA→RegEx Example 5
  {
    title: 'NFA → RegEx: a*ba',
    nfa: {
      states: ['q', 'b', 'f'],
      alphabet: ['a', 'b'],
      initialState: 'q',
      finalStates: ['f'],
      transitions: {
        'q': { 'a': ['q'], 'b': ['b'] },
        'b': { 'a': ['f'] },
        'f': {}
      }
    },
    regex: 'a*ba',
    steps: [
      'q --a--> q (loop), q --b--> b, b --a--> f (final)',
      'Accepts any number of a, then b, then a.'
    ]
  },
  // RegEx→NFA Example 1
  {
    title: 'RegEx → NFA: a*',
    regex: 'a*',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q3'],
      transitions: {
        'q0': { 'ε': ['q1', 'q3'] },
        'q1': { 'a': ['q2'] },
        'q2': { 'ε': ['q1', 'q3'] },
        'q3': {}
      }
    },
    steps: [
      'Thompson construction for a*',
      'Start state q0 with ε-transitions to both q1 and final state q3',
      'State q1 reads a and goes to q2',
      'State q2 has ε-transitions back to q1 (loop) and to final state q3'
    ]
  },
  // RegEx→NFA Example 2
  {
    title: 'RegEx → NFA: ab',
    regex: 'ab',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q3'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'ε': ['q2'] },
        'q2': { 'b': ['q3'] },
        'q3': {}
      }
    },
    steps: [
      'Thompson construction for concatenation ab',
      'Start state q0 reads a and goes to q1',
      'State q1 has ε-transition to q2',
      'State q2 reads b and goes to final state q3'
    ]
  },
  // RegEx→NFA Example 3
  {
    title: 'RegEx → NFA: a|b',
    regex: 'a|b',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q5'],
      transitions: {
        'q0': { 'ε': ['q1', 'q3'] },
        'q1': { 'a': ['q2'] },
        'q2': { 'ε': ['q5'] },
        'q3': { 'b': ['q4'] },
        'q4': { 'ε': ['q5'] },
        'q5': {}
      }
    },
    steps: [
      'Thompson construction for alternation a|b',
      'Start state q0 has ε-transitions to both branches',
      'Left branch: q1 reads a, goes to q2, then ε to final q5',
      'Right branch: q3 reads b, goes to q4, then ε to final q5'
    ]
  },
  // RegEx→NFA Example 4
  {
    title: 'RegEx → NFA: (a|b)*',
    regex: '(a|b)*',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q7'],
      transitions: {
        'q0': { 'ε': ['q1', 'q7'] },
        'q1': { 'ε': ['q2', 'q4'] },
        'q2': { 'a': ['q3'] },
        'q3': { 'ε': ['q6'] },
        'q4': { 'b': ['q5'] },
        'q5': { 'ε': ['q6'] },
        'q6': { 'ε': ['q1', 'q7'] },
        'q7': {}
      }
    },
    steps: [
      'Thompson construction for (a|b)*',
      'Kleene star of alternation a|b',
      'Start state q0 has ε-transitions to both q1 and final q7',
      'State q1 handles the alternation a|b',
      'State q6 has ε-transitions back to q1 (loop) and to final q7'
    ]
  },
  // RegEx→NFA Example 5
  {
    title: 'RegEx → NFA: a*ba',
    regex: 'a*ba',
    nfa: {
      states: ['q0', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q7'],
      transitions: {
        'q0': { 'ε': ['q1', 'q3'] },
        'q1': { 'a': ['q2'] },
        'q2': { 'ε': ['q1', 'q3'] },
        'q3': { 'ε': ['q4'] },
        'q4': { 'b': ['q5'] },
        'q5': { 'ε': ['q6'] },
        'q6': { 'a': ['q7'] },
        'q7': {}
      }
    },
    steps: [
      'Thompson construction for a*ba',
      'Concatenation of a* + b + a',
      'First part: a* with states q0-q3',
      'Second part: b with states q3-q5',
      'Third part: a with states q5-q7'
    ]
  },
  // TOA→FA Example 1
  {
    title: 'TOA → FA: Simple Example',
    toa: {
      states: ['s', 'q', 'd'],
      alphabet: ['a', 'b'],
      initialState: 's',
      finalStates: ['d'],
      transitions: {
        's': { 'a': ['q'], 'b': ['s'] },
        'q': { 'a': ['q'], 'b': ['d'] },
        'd': {}
      }
    },
    fa: {
      states: ['S', 'Q', 'D'],
      alphabet: ['a', 'b'],
      initialState: 'S',
      finalStates: ['D'],
      transitions: {
        'S': { 'a': ['Q'], 'b': ['S'] },
        'Q': { 'a': ['Q'], 'b': ['D'] },
        'D': {}
      }
    },
    steps: [
      'Start with TOA: states {s, q, d}, initial state s, final state d.',
      'Transition: s --a--> q, s --b--> s, q --a--> q, q --b--> d.',
      'Rename states for FA: s→S, q→Q, d→D.',
      'Resulting FA: S --a--> Q, S --b--> S, Q --a--> Q, Q --b--> D, D is final.'
    ]
  },
  // TOA→FA Example 2
  {
    title: 'TOA → FA: Looping State',
    toa: {
      states: ['p', 'q'],
      alphabet: ['a'],
      initialState: 'p',
      finalStates: ['q'],
      transitions: {
        'p': { 'a': ['p', 'q'] },
        'q': { 'a': ['q'] }
      }
    },
    fa: {
      states: ['P', 'Q'],
      alphabet: ['a'],
      initialState: 'P',
      finalStates: ['Q'],
      transitions: {
        'P': { 'a': ['P', 'Q'] },
        'Q': { 'a': ['Q'] }
      }
    },
    steps: [
      'Start with TOA: states {p, q}, initial state p, final state q.',
      'Transitions: p --a--> p, p --a--> q, q --a--> q.',
      'Rename states for FA: p→P, q→Q.',
      'Resulting FA: P --a--> P, P --a--> Q, Q --a--> Q. Q is final.'
    ]
  },
  // TOA→FA Example 3
  {
    title: 'TOA → FA: Dead State',
    toa: {
      states: ['s', 'd'],
      alphabet: ['a', 'b'],
      initialState: 's',
      finalStates: ['d'],
      transitions: {
        's': { 'a': ['s'], 'b': ['d'] },
        'd': { 'a': ['d'], 'b': ['d'] }
      }
    },
    fa: {
      states: ['S', 'D'],
      alphabet: ['a', 'b'],
      initialState: 'S',
      finalStates: ['D'],
      transitions: {
        'S': { 'a': ['S'], 'b': ['D'] },
        'D': { 'a': ['D'], 'b': ['D'] }
      }
    },
    steps: [
      'Start with TOA: states {s, d}, initial state s, final state d.',
      'Transitions: s --a--> s, s --b--> d, d --a--> d, d --b--> d.',
      'Rename states for FA: s→S, d→D.',
      'Resulting FA: S --a--> S, S --b--> D, D --a--> D, D --b--> D. D is final.'
    ]
  },
  // TOA→FA Example 4
  {
    title: 'TOA → FA: Branching',
    toa: {
      states: ['x', 'y', 'z'],
      alphabet: ['0', '1'],
      initialState: 'x',
      finalStates: ['z'],
      transitions: {
        'x': { '0': ['y'], '1': ['z'] },
        'y': { '1': ['z'] },
        'z': {}
      }
    },
    fa: {
      states: ['X', 'Y', 'Z'],
      alphabet: ['0', '1'],
      initialState: 'X',
      finalStates: ['Z'],
      transitions: {
        'X': { '0': ['Y'], '1': ['Z'] },
        'Y': { '1': ['Z'] },
        'Z': {}
      }
    },
    steps: [
      'Start with TOA: states {x, y, z}, initial state x, final state z.',
      'Transitions: x --0--> y, x --1--> z, y --1--> z.',
      'Rename states for FA: x→X, y→Y, z→Z.',
      'Resulting FA: X --0--> Y, X --1--> Z, Y --1--> Z. Z is final.'
    ]
  },
  // TOA→FA Example 5
  {
    title: 'TOA → FA: Multiple Finals',
    toa: {
      states: ['a', 'b', 'c'],
      alphabet: ['x', 'y'],
      initialState: 'a',
      finalStates: ['b', 'c'],
      transitions: {
        'a': { 'x': ['b'], 'y': ['c'] },
        'b': { 'x': ['b'], 'y': ['c'] },
        'c': { 'x': ['c'], 'y': ['c'] }
      }
    },
    fa: {
      states: ['A', 'B', 'C'],
      alphabet: ['x', 'y'],
      initialState: 'A',
      finalStates: ['B', 'C'],
      transitions: {
        'A': { 'x': ['B'], 'y': ['C'] },
        'B': { 'x': ['B'], 'y': ['C'] },
        'C': { 'x': ['C'], 'y': ['C'] }
      }
    },
    steps: [
      'Start with TOA: states {a, b, c}, initial state a, final states b, c.',
      'Transitions: a --x--> b, a --y--> c, b --x--> b, b --y--> c, c --x--> c, c --y--> c.',
      'Rename states for FA: a→A, b→B, c→C.',
      'Resulting FA: A --x--> B, A --y--> C, B --x--> B, B --y--> C, C --x--> C, C --y--> C. B and C are final.'
    ]
  },
  // PDA→CFG Example 1
  {
    title: 'PDA → CFG: a^n b^n',
    pda: {
      states: ['q0', 'q1', 'qf'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A'],
      initialState: 'q0',
      finalStates: ['qf'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'b,A': [{ to: 'q1', push: '' }]
        },
        'q1': {
          'b,A': [{ to: 'q1', push: '' }],
          '': [{ to: 'qf', push: '' }]
        }
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
      'PDA pushes A for each a, pops A for each b.',
      'Accepts equal number of a and b.',
      'CFG: S → aSb | ε.'
    ]
  },
  // PDA→CFG Example 2
  {
    title: 'PDA → CFG: a^n b^n c^n',
    pda: {
      states: ['q0', 'q1', 'q2', 'qf'],
      alphabet: ['a', 'b', 'c'],
      stackAlphabet: ['Z', 'A', 'B'],
      initialState: 'q0',
      finalStates: ['qf'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'b,A': [{ to: 'q1', push: 'A' }]
        },
        'q1': {
          'b,A': [{ to: 'q1', push: 'A' }],
          'c,A': [{ to: 'q2', push: '' }]
        },
        'q2': {
          'c,A': [{ to: 'q2', push: '' }],
          '': [{ to: 'qf', push: '' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b', 'c'],
      startVariable: 'S',
      productions: {
        'S': ['aSbSc', '']
      }
    },
    steps: [
      'PDA pushes A for each a, for each b pushes A, for each c pops A.',
      'Accepts equal number of a, b, c in order.',
      'CFG: S → aSbSc | ε.'
    ]
  },
  // PDA→CFG Example 3
  {
    title: 'PDA → CFG: Palindrome over {a, b}',
    pda: {
      states: ['q0', 'q1', 'qf'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A', 'B'],
      initialState: 'q0',
      finalStates: ['qf'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'b,Z': [{ to: 'q0', push: 'BZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'b,B': [{ to: 'q0', push: 'BB' }],
          '': [{ to: 'q1', push: '' }]
        },
        'q1': {
          'a,A': [{ to: 'q1', push: '' }],
          'b,B': [{ to: 'q1', push: '' }],
          '': [{ to: 'qf', push: '' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'bSb', 'a', 'b', '']
      }
    },
    steps: [
      'PDA pushes A for a, B for b, then pops matching symbols.',
      'Accepts palindromes over {a, b}.',
      'CFG: S → aSa | bSb | a | b | ε.'
    ]
  },
  // PDA→CFG Example 4
  {
    title: 'PDA → CFG: Even length',
    pda: {
      states: ['q0', 'q1', 'qf'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A'],
      initialState: 'q0',
      finalStates: ['qf'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q1', push: 'AZ' }],
          'b,Z': [{ to: 'q1', push: 'AZ' }]
        },
        'q1': {
          'a,A': [{ to: 'q0', push: '' }],
          'b,A': [{ to: 'q0', push: '' }],
          '': [{ to: 'qf', push: '' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'bSb', '']
      }
    },
    steps: [
      'PDA alternates between q0 and q1 for each input, stack tracks even length.',
      'Accepts even length strings.',
      'CFG: S → aSa | bSb | ε.'
    ]
  },
  // PDA→CFG Example 5
  {
    title: 'PDA → CFG: a^n b^m c^n d^m',
    pda: {
      states: ['q0', 'q1', 'q2', 'q3', 'qf'],
      alphabet: ['a', 'b', 'c', 'd'],
      stackAlphabet: ['Z', 'A', 'B'],
      initialState: 'q0',
      finalStates: ['qf'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'b,A': [{ to: 'q1', push: 'A' }]
        },
        'q1': {
          'b,A': [{ to: 'q1', push: 'A' }],
          'c,A': [{ to: 'q2', push: '' }]
        },
        'q2': {
          'c,A': [{ to: 'q2', push: '' }],
          'd,Z': [{ to: 'q3', push: 'Z' }],
          'd,A': [{ to: 'q3', push: 'A' }]
        },
        'q3': {
          'd,A': [{ to: 'q3', push: 'A' }],
          '': [{ to: 'qf', push: '' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b', 'c', 'd'],
      startVariable: 'S',
      productions: {
        'S': ['aSbScd', '']
      }
    },
    steps: [
      'PDA pushes A for a, for each b pushes A, for each c pops A, for each d pops A.',
      'Accepts strings with equal number of a and c, and equal number of b and d.',
      'CFG: S → aSbScd | ε.'
    ]
  },
  // CFL→CFG Example 1
  {
    title: 'CFL → CFG: a^n b^n',
    cflDescription: 'All strings of the form a^n b^n, n ≥ 0',
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSb', '']
      }
    },
    steps: [
      'The language consists of equal numbers of a followed by b.',
      'The classic CFG for this is S → aSb | ε.'
    ]
  },
  // CFL→CFG Example 2
  {
    title: 'CFL → CFG: a^n b^m c^n',
    cflDescription: 'All strings of the form a^n b^m c^n, n, m ≥ 0',
    cfg: {
      variables: ['S', 'B'],
      terminals: ['a', 'b', 'c'],
      startVariable: 'S',
      productions: {
        'S': ['aSc', 'B'],
        'B': ['bB', '']
      }
    },
    steps: [
      'The language consists of equal numbers of a and c, with any number of b in the middle.',
      'CFG: S → aSc | B, B → bB | ε.'
    ]
  },
  // CFL→CFG Example 3
  {
    title: 'CFL → CFG: Palindromes over {a, b}',
    cflDescription: 'All palindromes over the alphabet {a, b}',
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'bSb', 'a', 'b', '']
      }
    },
    steps: [
      'A palindrome reads the same forwards and backwards.',
      'CFG: S → aSa | bSb | a | b | ε.'
    ]
  },
  // CFL→CFG Example 4
  {
    title: 'CFL → CFG: Even length strings',
    cflDescription: 'All strings of even length over {a, b}',
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'aSb', 'bSa', 'bSb', '']
      }
    },
    steps: [
      'Even length strings can be built by adding two symbols at a time.',
      'CFG: S → aSa | aSb | bSa | bSb | ε.'
    ]
  },
  // CFL→CFG Example 5
  {
    title: 'CFL → CFG: a^n b^n c^n (not context-free)',
    cflDescription: 'All strings of the form a^n b^n c^n, n ≥ 0 (not a CFL)',
    cfg: {
      variables: [],
      terminals: ['a', 'b', 'c'],
      startVariable: '',
      productions: {}
    },
    steps: [
      'This language is not context-free and cannot be generated by any CFG.'
    ]
  }
];

// Update example click logic for both NFA→RegEx and RegEx→NFA pages
window.addEventListener('DOMContentLoaded', () => {
  const examplesDiv = document.getElementById('examples-content');
  if (!examplesDiv || !window.solvedExamples) return;
  
  const isNfaToRegexPage = window.location.pathname.includes('nfa-to-regex.html');
  const isRegexToNfaPage = window.location.pathname.includes('regex-to-nfa.html');
  const isToaToFaPage = window.location.pathname.includes('toa-to-fa.html');
  
  let examples = window.solvedExamples;
  
  // Filter examples based on page
  if (isNfaToRegexPage) {
    // Show only NFA→RegEx examples (first 5)
    examples = window.solvedExamples.slice(0, 5);
  } else if (isRegexToNfaPage) {
    // Show only RegEx→NFA examples (last 5)
    examples = window.solvedExamples.slice(5, 10);
  } else if (isToaToFaPage) {
    // Show only TOA→FA examples (last 5)
    examples = window.solvedExamples.slice(10, 15);
  }
  
  examplesDiv.innerHTML = examples.map((ex, i) =>
    `<button class="btn-secondary example-btn" data-idx="${i}">${ex.title}</button>`
  ).join(' ');

  examplesDiv.querySelectorAll('.example-btn').forEach((btn, i) => {
    btn.onclick = () => {
      const ex = examples[i];
      
      if (isNfaToRegexPage && ex.nfa && ex.regex) {
        // NFA→RegEx example
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.nfa);
        }
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        window.nfaGraphRenderer = nfaRenderer;
        // Show regex
        const regexResult = document.getElementById('regex-result');
        if (regexResult) {
          regexResult.textContent = ex.regex;
        }
      } else if (isRegexToNfaPage && ex.regex && ex.nfa) {
        // RegEx→NFA example
        // Set the regex input
        const regexInput = document.getElementById('regex-input');
        if (regexInput) {
          regexInput.value = ex.regex;
        }
        // Render the NFA
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.nfa);
        }
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        window.nfaGraphRenderer = nfaRenderer;
      } else if (isToaToFaPage && ex.toa && ex.fa) {
        // TOA→FA example
        // Load the TOA into the visual builder (upper box)
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.toa);
        }
        // Render the FA in the lower box
        const faRenderer = new VisGraphRenderer('dfa-graph-vis');
        faRenderer.renderAutomaton(ex.fa, 'dfa');
        window.dfaGraphRenderer = faRenderer;
      }
      
      // Show steps
      const stepsDiv = document.getElementById('steps-content');
      if (stepsDiv) {
      stepsDiv.innerHTML = ex.steps.map(s => `<div class='step'>${s}</div>`).join('');
      }
    };
  });
}); 