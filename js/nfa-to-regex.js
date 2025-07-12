// NFA → RegEx conversion logic for Automata Visualizer Pro
// State elimination method with step-by-step explanation

function convertNfaToRegex(nfa) {
  const steps = [];
  const regex = stateElimination(nfa, steps);
  return { regex, steps };
}

function stateElimination(nfa, steps) {
  // Standard state elimination using dynamic programming
  const states = [...nfa.states];
  const initial = nfa.initialState;
  const finals = nfa.finalStates;
  const n = states.length;
  const idx = Object.fromEntries(states.map((s, i) => [s, i]));

  // R[i][j][k]: regex for paths from i to j using only states <= k
  let R = Array.from({length: n}, () => Array.from({length: n}, () => Array(n+1).fill('∅')));

  // Base case: k = 0 (no intermediate states)
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      let labels = [];
      if (nfa.transitions[states[i]]) {
        for (const symbol in nfa.transitions[states[i]]) {
          for (const tgt of nfa.transitions[states[i]][symbol]) {
            if (tgt === states[j]) labels.push(symbol === 'ε' ? '' : symbol);
          }
        }
      }
      if (i === j) labels.push(''); // ε for self-loop
      R[i][j][0] = labels.length ? labels.join('+') : '∅';
    }
  }

  // DP: build up for k = 1..n
  for (let k = 1; k <= n; ++k) {
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < n; ++j) {
        const prev = R[i][j][k-1];
        const left = R[i][k-1][k-1];
        const loop = R[k-1][k-1][k-1];
        const right = R[k-1][j][k-1];
        let viaK = '∅';
        if (left !== '∅' && right !== '∅') {
          viaK = left + (loop !== '∅' ? `(${loop})*` : '') + right;
        }
        R[i][j][k] = joinRegex(prev, viaK);
      }
    }
  }

  // Combine all initial-to-final regexes
  const i0 = idx[initial];
  let regexes = finals.map(f => R[i0][idx[f]][n]).filter(r => r && r !== '∅');
  let regex = regexes.join('+') || '∅';
  regex = simplifyRegex(regex);
  steps.push(`Final regular expression: ${regex}`);
  return regex;
}

function joinRegex(r1, r2) {
  if (r1 === '∅') return r2;
  if (r2 === '∅') return r1;
  if (r1 === r2) return r1;
  return r1 + '+' + r2;
}

// Simplify the resulting regex for readability
function simplifyRegex(regex) {
  // Remove empty parentheses and ()*
  regex = regex.replace(/\(\)\*/g, '');
  regex = regex.replace(/\(\)/g, '');
  // Collapse repeated stars: a*a* => a*
  regex = regex.replace(/(\w)\*\1\*/g, '$1*');
  // Remove duplicate alternatives: a+a => a
  regex = regex.split('+').filter((v, i, a) => v && a.indexOf(v) === i).join('+');
  // Remove unnecessary pluses at start/end
  regex = regex.replace(/^\++|\++$/g, '');
  // Remove + before ) or after (
  regex = regex.replace(/\+\)/g, ')').replace(/\(\+/g, '(');
  // Remove +
  regex = regex.replace(/\++/g, '+');
  // Remove trailing +
  regex = regex.replace(/\+$/g, '');
  // Remove leading +
  regex = regex.replace(/^\+/, '');
  // Remove redundant parentheses around single symbols
  regex = regex.replace(/\((\w)\)/g, '$1');
  return regex;
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