// VisGraphRenderer: Uses Vis.js to render NFA/DFA graphs

class VisGraphRenderer {
    constructor(containerId) {
        this.containerId = containerId;
        this.network = null;
    }

    renderAutomaton(automaton, type = 'nfa') {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        if (this.network) {
            this.network.destroy();
            this.network = null;
        }

        // Prepare nodes and edges
        const nodes = new vis.DataSet();
        const edges = new vis.DataSet();

        // Add a hidden start node for the initial arrow
        nodes.add({ id: 'start_node', hidden: true, physics: false });

        automaton.states.forEach(state => {
            const isFinal = automaton.finalStates && automaton.finalStates.includes(state);
            const isStart = automaton.initialState === state;
            const isTrap = state === '∅';
            let label = state;
            if (type === 'dfa' && automaton.stateMap && automaton.stateMap.has(state)) {
                const nfaSet = automaton.stateMap.get(state);
                const setString = `{${[...nfaSet].sort().join(',')}}`;
                label = `${state}\n${setString}`;
            }
            nodes.add({
                id: state,
                label: label,
                shape: 'circle',
                color: {
                    border: isTrap ? '#64748b' : (isFinal ? '#38a169' : '#667eea'),
                    background: '#ffffff',
                    highlight: { border: '#c026d3', background: '#f5d0fe' },
                },
                borderWidth: isFinal ? 4 : 2,
                font: { size: 16, color: '#1e293b' },
                margin: 10,
            });
            if (isStart) {
                edges.add({
                    id: `start_edge_${state}`,
                    from: 'start_node',
                    to: state,
                    arrows: 'to',
                    color: '#16a34a',
                    length: 50,
                    smooth: { type: 'curvedCW', roundness: 0.2 },
                });
            }
        });

        // Add edges (combine labels for same from-to)
        const edgeMap = new Map();
        const isPDA = automaton.stackAlphabet !== undefined || type === 'pda';
        const isTM = automaton.tapeAlphabet !== undefined || type === 'tm';
        for (const fromState in automaton.transitions) {
            const transitions = automaton.transitions[fromState];
            for (const symbol in transitions) {
                const targets = Array.isArray(transitions[symbol]) ? transitions[symbol] : [transitions[symbol]];
                for (const toStateObj of targets) {
                    let toState = toStateObj;
                    let label = symbol;
                    if (isPDA && typeof toStateObj === 'object' && toStateObj.to) {
                        toState = toStateObj.to;
                        let input = '', stackRead = '', stackWrite = '';
                        if (symbol.includes(',')) {
                            [input, stackRead] = symbol.split(',');
                        } else {
                            input = symbol;
                        }
                        stackWrite = toStateObj.push !== undefined ? toStateObj.push : '';
                        label = `${input || 'ε'},${stackRead || 'ε'}/${stackWrite || 'ε'}`;
                    } else if (isTM && typeof toStateObj === 'object' && toStateObj.to) {
                        toState = toStateObj.to;
                        const read = symbol || 'ε';
                        const write = toStateObj.write !== undefined ? toStateObj.write : 'ε';
                        const move = toStateObj.move !== undefined ? toStateObj.move : '';
                        label = `${read}/${write}${move ? ',' + move : ''}`;
                    }
                    const edgeKey = `${fromState}-${toState}`;
                    if (fromState === toState) {
                        if (edgeMap.has(edgeKey)) {
                            const existingEdge = edgeMap.get(edgeKey);
                            existingEdge.label += `, ${label}`;
                            edges.update(existingEdge);
                        } else {
                            const newEdge = {
                                id: `${fromState}-${toState}-self` ,
                                from: fromState,
                                to: toState,
                                label: label,
                                font: { align: 'top' },
                                color: { color: '#334155', highlight: '#ef4444' },
                                selfReference: { size: 20, angle: Math.PI / 4 }
                            };
                            edgeMap.set(edgeKey, newEdge);
                            edges.add(newEdge);
                        }
                    } else if (edgeMap.has(edgeKey)) {
                        const existingEdge = edgeMap.get(edgeKey);
                        existingEdge.label += `, ${label}`;
                        edges.update(existingEdge);
                    } else {
                        const newEdge = {
                            id: `${fromState}-${toState}-${label}`,
                            from: fromState,
                            to: toState,
                            label: label,
                            arrows: 'to',
                            font: { align: 'top' },
                            color: { color: '#334155', highlight: '#ef4444' },
                            smooth: { enabled: true, type: 'curvedCW', roundness: 0.1 }
                        };
                        edgeMap.set(edgeKey, newEdge);
                        edges.add(newEdge);
                    }
                }
            }
        }

        const data = { nodes, edges };
        const options = {
            layout: { hierarchical: { enabled: false } },
            physics: {
                solver: 'forceAtlas2Based',
                forceAtlas2Based: {
                    gravitationalConstant: -80,
                    centralGravity: 0.01,
                    springConstant: 0.08,
                    springLength: 150,
                    damping: 0.4,
                    avoidOverlap: 0.8
                }
            },
            interaction: { dragNodes: true, hover: true, zoomView: true, tooltipDelay: 100 },
        };
        this.network = new vis.Network(container, data, options);
    }

    destroy() {
        if (this.network) {
            this.network.destroy();
            this.network = null;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VisGraphRenderer;
} 