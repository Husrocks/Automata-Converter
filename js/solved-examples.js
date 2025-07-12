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
    title: 'TOA → FA: accepts a*',
    toa: {
      states: ['q0'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'] }
      }
    },
    fa: {
      states: ['Q0'],
      alphabet: ['a'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q0' }
      }
    },
    steps: [
      'Subset construction for a single state TOA with self-loop on a.',
      'FA is identical to TOA.'
    ]
  },
  // TOA→FA Example 2
  {
    title: 'TOA → FA: accepts ab',
    toa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q2'] },
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Subset construction for TOA accepting ab.',
      'FA has a chain of three states.'
    ]
  },
  // TOA→FA Example 3
  {
    title: 'TOA → FA: accepts a+b',
    toa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'b': ['q2'] },
        'q1': {},
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1', 'Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Subset construction for TOA accepting a or b.',
      'FA has two final states.'
    ]
  },
  // TOA→FA Example 4
  {
    title: 'TOA → FA: accepts (ab)*',
    toa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q0'] },
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q0' },
        'Q1': { 'a': 'Q1', 'b': 'Q0' }
      }
    },
    steps: [
      'Subset construction for TOA accepting (ab)*.',
      'FA cycles between two states.'
    ]
  },
  // TOA→FA Example 5
  {
    title: 'TOA → FA: accepts a*b*',
    toa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'] },
        'q1': { 'b': ['q1'] }
      }
    },
    fa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q1' },
        'Q1': { 'a': 'Q0', 'b': 'Q1' }
      }
    },
    steps: [
      'Subset construction for TOA accepting a*b*.',
      'FA has two states, Q0 and Q1.'
    ]
  },
  // PDA→CFG Example 1
  {
    title: 'PDA → CFG: accepts a*',
    pda: {
      states: ['q0'],
      alphabet: ['a'],
      stackAlphabet: ['#'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': {
          'a,#': [{ to: 'q0', push: '#' }],
          'ε,#': [{ to: 'q0', push: '#' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a'],
      startVariable: 'S',
      productions: {
        'S': ['aS', 'a']
      }
    },
    steps: [
      'PDA accepts a* by pushing #, reading a, popping #, and pushing #.',
      'CFG generates a* by S -> aS -> aS -> ... -> a^nS -> a^n'
    ]
  },
  // PDA→CFG Example 2
  {
    title: 'PDA → CFG: accepts a*b*',
    pda: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['#'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': {
          'a,#': [{ to: 'q0', push: '#' }],
          'ε,#': [{ to: 'q1', push: '#' }]
        },
        'q1': {
          'b,#': [{ to: 'q1', push: '#' }],
          'ε,#': [{ to: 'q1', push: '#' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aS', 'bS', 'a', 'b']
      }
    },
    steps: [
      'PDA accepts a*b* by pushing #, reading a, popping #, pushing #, reading b, popping #, pushing #.',
      'CFG generates a*b* by S -> aS -> aS -> ... -> a^nS -> a^n -> bS -> bS -> ... -> b^mS -> b^m'
    ]
  },
  // PDA→CFG Example 3
  {
    title: 'PDA → CFG: accepts a^n b^n',
    pda: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'ε,Z': [{ to: 'q1', push: 'Z' }],
          'ε,A': [{ to: 'q1', push: 'A' }]
        },
        'q1': {
          'b,A': [{ to: 'q1', push: '' }],
          'ε,Z': [{ to: 'q2', push: 'Z' }]
        },
        'q2': {}
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSb', 'ε']
      }
    },
    steps: [
      'PDA pushes A for each a, pops for each b.',
      'CFG generates a^n b^n.'
    ]
  },
  // PDA→CFG Example 4
  {
    title: 'PDA → CFG: accepts palindromes over {a, b}',
    pda: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z', 'A', 'B'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q0', push: 'AZ' }],
          'a,A': [{ to: 'q0', push: 'AA' }],
          'b,Z': [{ to: 'q0', push: 'BZ' }],
          'b,B': [{ to: 'q0', push: 'BB' }],
          'ε,Z': [{ to: 'q1', push: 'Z' }],
          'ε,A': [{ to: 'q1', push: 'A' }],
          'ε,B': [{ to: 'q1', push: 'B' }]
        },
        'q1': {
          'a,A': [{ to: 'q1', push: '' }],
          'b,B': [{ to: 'q1', push: '' }],
          'ε,Z': [{ to: 'q2', push: 'Z' }]
        },
        'q2': {}
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'bSb', 'a', 'b', 'ε']
      }
    },
    steps: [
      'PDA pushes for first half, pops for second half.',
      'CFG generates palindromes.'
    ]
  },
  // PDA→CFG Example 5
  {
    title: 'PDA → CFG: accepts even length strings',
    pda: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      stackAlphabet: ['Z'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': {
          'a,Z': [{ to: 'q1', push: 'Z' }],
          'b,Z': [{ to: 'q1', push: 'Z' }]
        },
        'q1': {
          'a,Z': [{ to: 'q0', push: 'Z' }],
          'b,Z': [{ to: 'q0', push: 'Z' }]
        }
      }
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aS', 'bS', 'ε']
      }
    },
    steps: [
      'PDA alternates states for each symbol.',
      'CFG generates even length strings.'
    ]
  },
  // CFL→CFG Example 1
  {
    title: 'CFL → CFG: accepts a*b*',
    cfl: {
      productions: [
        { left: 'S', right: 'aS' },
        { left: 'S', right: 'bS' },
        { left: 'S', right: 'a' },
        { left: 'S', right: 'b' }
      ]
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aS', 'bS', 'a', 'b']
      }
    },
    steps: [
      'CFL accepts a*b* by generating a^n b^m for n, m >= 0.',
      'CFG generates a*b* by S -> aS -> aS -> ... -> a^nS -> a^n -> bS -> bS -> ... -> b^mS -> b^m'
    ]
  },
  // CFL→CFG Example 2
  {
    title: 'CFL → CFG: accepts (ab)*',
    cfl: {
      productions: [
        { left: 'S', right: 'aS' },
        { left: 'S', right: 'bS' },
        { left: 'S', right: 'a' },
        { left: 'S', right: 'b' }
      ]
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aS', 'bS', 'a', 'b']
      }
    },
    steps: [
      'CFL accepts (ab)^n for n >= 0.',
      'CFG generates (ab)^n by S -> aS -> aS -> ... -> a^nS -> a^n -> bS -> bS -> ... -> b^nS -> b^n'
    ]
  },
  // CFL→CFG Example 3
  {
    title: 'CFL → CFG: accepts a^n b^n c^n',
    cfl: {
      productions: [
        { left: 'S', right: 'aSBC' },
        { left: 'S', right: 'ε' },
        { left: 'B', right: 'bB' },
        { left: 'B', right: 'b' },
        { left: 'C', right: 'cC' },
        { left: 'C', right: 'c' }
      ]
    },
    cfg: {
      variables: ['S', 'B', 'C'],
      terminals: ['a', 'b', 'c'],
      startVariable: 'S',
      productions: {
        'S': ['aSBC', 'ε'],
        'B': ['bB', 'b'],
        'C': ['cC', 'c']
      }
    },
    steps: [
      'CFL generates a^n b^n c^n.',
      'CFG mirrors the CFL.'
    ]
  },
  // CFL→CFG Example 4
  {
    title: 'CFL → CFG: accepts strings with equal numbers of a and b',
    cfl: {
      productions: [
        { left: 'S', right: 'aSb' },
        { left: 'S', right: 'bSa' },
        { left: 'S', right: 'ε' }
      ]
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSb', 'bSa', 'ε']
      }
    },
    steps: [
      'CFL generates equal numbers of a and b.',
      'CFG mirrors the CFL.'
    ]
  },
  // CFL→CFG Example 5
  {
    title: 'CFL → CFG: accepts palindromes over {a, b}',
    cfl: {
      productions: [
        { left: 'S', right: 'aSa' },
        { left: 'S', right: 'bSb' },
        { left: 'S', right: 'a' },
        { left: 'S', right: 'b' },
        { left: 'S', right: 'ε' }
      ]
    },
    cfg: {
      variables: ['S'],
      terminals: ['a', 'b'],
      startVariable: 'S',
      productions: {
        'S': ['aSa', 'bSb', 'a', 'b', 'ε']
      }
    },
    steps: [
      'CFL generates palindromes.',
      'CFG mirrors the CFL.'
    ]
  },
  // TM→FA Example 1
  {
    title: 'TM → FA: accepts a*',
    tm: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a'],
      tapeAlphabet: ['a', '#'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1', 'R', 'a'] },
        'q1': { 'a': ['q1', 'R', 'a'] },
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1' },
        'Q1': { 'a': 'Q1' },
        'Q2': {}
      }
    },
    steps: [
      'TM accepts a* by reading a, moving right, and writing a.',
      'FA has a chain of three states.'
    ]
  },
  // TM→FA Example 2
  {
    title: 'TM → FA: accepts (ab)*',
    tm: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      tapeAlphabet: ['a', 'b', '#'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1', 'R', 'a'] },
        'q1': { 'b': ['q2', 'R', 'b'] },
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': {}
      }
    },
    steps: [
      'TM accepts (ab)* by reading a, moving right, and writing a.',
      'FA cycles between two states.'
    ]
  },
  // TM→FA Example 3
  {
    title: 'TM → FA: accepts 0*1',
    tm: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['0', '1'],
      tapeAlphabet: ['0', '1', '#'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { '0': ['q0', 'R', '0'], '1': ['q1', 'R', '1'] },
        'q1': { '1': ['q1', 'R', '1'] },
        'q2': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['0', '1'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { '0': 'Q0', '1': 'Q1' },
        'Q1': { '1': 'Q1' },
        'Q2': {}
      }
    },
    steps: [
      'TM accepts 0*1 by reading 0s, then 1s.',
      'FA has a chain of three states.'
    ]
  },
  // TM→FA Example 4
  {
    title: 'TM → FA: accepts only 0',
    tm: {
      states: ['q0', 'q1'],
      alphabet: ['0'],
      tapeAlphabet: ['0', '#'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { '0': ['q1', 'R', '0'] },
        'q1': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1'],
      alphabet: ['0'],
      initialState: 'Q0',
      finalStates: ['Q1'],
      transitions: {
        'Q0': { '0': 'Q1' },
        'Q1': {}
      }
    },
    steps: [
      'TM accepts only 0.',
      'FA has two states.'
    ]
  },
  // TM→FA Example 5
  {
    title: 'TM → FA: accepts palindromes over {0,1}',
    tm: {
      states: ['q0', 'q1', 'q2', 'q3'],
      alphabet: ['0', '1'],
      tapeAlphabet: ['0', '1', '#'],
      initialState: 'q0',
      finalStates: ['q3'],
      transitions: {
        'q0': { '0': ['q1', 'R', '0'], '1': ['q2', 'R', '1'] },
        'q1': { '0': ['q1', 'R', '0'], '1': ['q1', 'R', '1'], 'ε': ['q3', 'ε', 'ε'] },
        'q2': { '0': ['q2', 'R', '0'], '1': ['q2', 'R', '1'], 'ε': ['q3', 'ε', 'ε'] },
        'q3': {}
      }
    },
    fa: {
      states: ['Q0', 'Q1', 'Q2', 'Q3'],
      alphabet: ['0', '1'],
      initialState: 'Q0',
      finalStates: ['Q3'],
      transitions: {
        'Q0': { '0': 'Q1', '1': 'Q2' },
        'Q1': { '0': 'Q1', '1': 'Q1' },
        'Q2': { '0': 'Q2', '1': 'Q2' },
        'Q3': {}
      }
    },
    steps: [
      'TM accepts palindromes by simulating both directions.',
      'FA has four states.'
    ]
  },
  // DFA Minimizer Example 1
  {
    title: 'DFA Minimizer: accepts a*',
    dfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'a': ['q2'] },
        'q2': {}
      }
    },
    minDfa: {
      states: ['q0', 'q1'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q1' },
        'q1': {}
      }
    },
    steps: [
      'DFA accepts a* by reading a, going to q1, and then to q2.',
      'Minimized DFA has two states, q0 and q1.'
    ]
  },
  // DFA Minimizer Example 2
  {
    title: 'DFA Minimizer: accepts ab',
    dfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'b': ['q2'] },
        'q1': {},
        'q2': {}
      }
    },
    minDfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q1', 'b': 'q1' },
        'q1': {}
      }
    },
    steps: [
      'DFA accepts ab by reading a, going to q1, and then to q2.',
      'Minimized DFA has two states, q0 and q1.'
    ]
  },
  // DFA Minimizer Example 3
  {
    title: 'DFA Minimizer: accepts (a|b)*',
    dfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q0'] },
        'q1': { 'a': ['q1'], 'b': ['q1'] }
      }
    },
    minDfa: {
      states: ['q0'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': 'q0', 'b': 'q0' }
      }
    },
    steps: [
      'DFA accepts (a|b)* with a single state.',
      'Minimized DFA is the same.'
    ]
  },
  // DFA Minimizer Example 4
  {
    title: 'DFA Minimizer: accepts a*b*',
    dfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'] },
        'q1': { 'b': ['q2'] },
        'q2': {}
      }
    },
    minDfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q0', 'b': 'q1' },
        'q1': { 'b': 'q1' }
      }
    },
    steps: [
      'DFA accepts a*b*.',
      'Minimized DFA has two states.'
    ]
  },
  // DFA Minimizer Example 5
  {
    title: 'DFA Minimizer: accepts ab*',
    dfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q2'] },
        'q2': { 'b': ['q2'] }
      }
    },
    minDfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': 'q1' },
        'q1': { 'b': 'q1' }
      }
    },
    steps: [
      'DFA accepts ab*.',
      'Minimized DFA has two states.'
    ]
  },
  // ε-NFA→DFA Example 1
  {
    title: 'ε-NFA → DFA: accepts (a|b)*',
    enfa: {
      states: ['q0'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q0'], 'ε': ['q0'] }
      }
    },
    dfa: {
      states: ['Q0'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q0' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction.',
      'DFA accepts any string of a and b.'
    ]
  },
  // ε-NFA→DFA Example 2
  {
    title: 'ε-NFA → DFA: accepts ab',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'ε': ['q2'] },
        'q1': { 'b': ['q2'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for ab.',
      'DFA has three states.'
    ]
  },
  // ε-NFA→DFA Example 3
  {
    title: 'ε-NFA → DFA: accepts a+b',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'b': ['q2'], 'ε': ['q2'] },
        'q1': {},
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1', 'Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for a or b.',
      'DFA has two final states.'
    ]
  },
  // ε-NFA→DFA Example 4
  {
    title: 'ε-NFA → DFA: accepts (ab)*',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q1'], 'ε': ['q2'] },
        'q1': { 'b': ['q0'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q0' },
        'Q1': { 'a': 'Q1', 'b': 'Q0' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for (ab)*.',
      'DFA cycles between two states.'
    ]
  },
  // ε-NFA→DFA Example 5
  {
    title: 'ε-NFA → DFA: accepts a*b*',
    enfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'], 'ε': ['q1'] },
        'q1': { 'b': ['q1'] }
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q1' },
        'Q1': { 'a': 'Q0', 'b': 'Q1' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for a*b*.',
      'DFA has two states, Q0 and Q1.'
    ]
  }
];

// NFA→DFA Examples
window.nfaToDfaExamples = [
  // Example 1
  {
    title: 'NFA → DFA: accepts a*',
    nfa: {
      states: ['q0'],
      alphabet: ['a'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'] }
      }
    },
    dfa: {
      states: ['Q0'],
      alphabet: ['a'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q0' }
      }
    },
    steps: [
      'Subset construction for a single state NFA with self-loop on a.',
      'DFA is identical to NFA.'
    ]
  },
  // Example 2
  {
    title: 'NFA → DFA: accepts ab',
    nfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q2'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1' },
        'Q1': { 'b': 'Q2' },
        'Q2': {}
      }
    },
    steps: [
      'Subset construction for NFA accepting ab.',
      'DFA has a chain of three states.'
    ]
  },
  // Example 3
  {
    title: 'NFA → DFA: accepts a+b',
    nfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'b': ['q2'] },
        'q1': {},
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1', 'Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Subset construction for NFA accepting a or b.',
      'DFA has two final states.'
    ]
  },
  // Example 4
  {
    title: 'NFA → DFA: accepts (ab)*',
    nfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q1'] },
        'q1': { 'b': ['q0'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q0' },
        'Q1': { 'a': 'Q1', 'b': 'Q0' }
      }
    },
    steps: [
      'Subset construction for NFA accepting (ab)*.',
      'DFA cycles between two states.'
    ]
  },
  // Example 5
  {
    title: 'NFA → DFA: accepts a*b*',
    nfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'] },
        'q1': { 'b': ['q1'] }
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q1' },
        'Q1': { 'a': 'Q0', 'b': 'Q1' }
      }
    },
    steps: [
      'Subset construction for NFA accepting a*b*.',
      'DFA has two states, Q0 and Q1.'
    ]
  }
];
// ε-NFA→DFA Examples
window.enfaToDfaExamples = [
  // Example 1
  {
    title: 'ε-NFA → DFA: accepts (a|b)*',
    enfa: {
      states: ['q0'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q0'], 'ε': ['q0'] }
      }
    },
    dfa: {
      states: ['Q0'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q0' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction.',
      'DFA accepts any string of a and b.'
    ]
  },
  // Example 2
  {
    title: 'ε-NFA → DFA: accepts ab',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'ε': ['q2'] },
        'q1': { 'b': ['q2'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for ab.',
      'DFA has three states.'
    ]
  },
  // Example 3
  {
    title: 'ε-NFA → DFA: accepts a+b',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q2'],
      transitions: {
        'q0': { 'a': ['q1'], 'b': ['q2'], 'ε': ['q2'] },
        'q1': {},
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1', 'Q2'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1', 'Q2'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q2' },
        'Q1': { 'a': 'Q1', 'b': 'Q2' },
        'Q2': { 'a': 'Q1', 'b': 'Q2' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for a or b.',
      'DFA has two final states.'
    ]
  },
  // Example 4
  {
    title: 'ε-NFA → DFA: accepts (ab)*',
    enfa: {
      states: ['q0', 'q1', 'q2'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q0'],
      transitions: {
        'q0': { 'a': ['q1'], 'ε': ['q2'] },
        'q1': { 'b': ['q0'] },
        'q2': {}
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q0'],
      transitions: {
        'Q0': { 'a': 'Q1', 'b': 'Q0' },
        'Q1': { 'a': 'Q1', 'b': 'Q0' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for (ab)*.',
      'DFA cycles between two states.'
    ]
  },
  // Example 5
  {
    title: 'ε-NFA → DFA: accepts a*b*',
    enfa: {
      states: ['q0', 'q1'],
      alphabet: ['a', 'b'],
      initialState: 'q0',
      finalStates: ['q1'],
      transitions: {
        'q0': { 'a': ['q0'], 'b': ['q1'], 'ε': ['q1'] },
        'q1': { 'b': ['q1'] }
      }
    },
    dfa: {
      states: ['Q0', 'Q1'],
      alphabet: ['a', 'b'],
      initialState: 'Q0',
      finalStates: ['Q1'],
      transitions: {
        'Q0': { 'a': 'Q0', 'b': 'Q1' },
        'Q1': { 'a': 'Q0', 'b': 'Q1' }
      }
    },
    steps: [
      'Remove ε-transitions and apply subset construction for a*b*.',
      'DFA has two states, Q0 and Q1.'
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
  const isNfaToDfaPage = window.location.pathname.includes('nfa-to-dfa.html');
  const isEnfaToDfaPage = window.location.pathname.includes('enfa-to-dfa.html');
  
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
  } else if (isNfaToDfaPage) {
    // Show only NFA→DFA examples
    examples = window.nfaToDfaExamples;
  } else if (isEnfaToDfaPage) {
    // Show only ε-NFA→DFA examples
    examples = window.enfaToDfaExamples;
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
      } else if (isNfaToDfaPage && ex.nfa && ex.dfa) {
        // NFA→DFA example
        // Load the NFA into the visual builder (upper box)
        if (window.visualNFABuilder) {
          window.visualNFABuilder.loadNFA(ex.nfa);
        }
        // Render the NFA in the upper box
        const nfaRenderer = new VisGraphRenderer('nfa-graph-vis');
        nfaRenderer.renderAutomaton(ex.nfa, 'nfa');
        window.nfaGraphRenderer = nfaRenderer;
        // Render the DFA in the lower box
        const dfaRenderer = new VisGraphRenderer('dfa-graph-vis');
        dfaRenderer.renderAutomaton(ex.dfa, 'dfa');
        window.dfaGraphRenderer = dfaRenderer;
      } else if (isEnfaToDfaPage && ex.enfa && ex.dfa) {
        // ε-NFA→DFA example
        // Ensure the ENFA builder is initialized
        if (!window.visualENFABuilder) {
          window.visualENFABuilder = new VisualENFABuilder('enfa-graph-vis');
        }
        // Load the ε-NFA into the visual builder (upper box)
        window.visualENFABuilder.loadENFA(ex.enfa);
        // Render the DFA in the lower box
        const dfaRenderer = new VisGraphRenderer('dfa-graph-vis');
        dfaRenderer.renderAutomaton(ex.dfa, 'dfa');
        window.dfaGraphRenderer = dfaRenderer;
      }
      
      // Show steps
      const stepsDiv = document.getElementById('steps-content');
      if (stepsDiv) {
      stepsDiv.innerHTML = ex.steps.map(s => `<div class='step'>${s}</div>`).join('');
      }
    };
  });
}); 