// Test VADNodeStyles structure is valid
const VADNodeStyles = {
    'ProcessStyleBasic': {
        types: ['vad:Process', 'http://example.org/vad#Process'],
        subtypes: ['vad:Basic', 'http://example.org/vad#Basic'],
        dot: 'shape="cds" height="0.8" width="1.5" color="#2E7D32" fillcolor="#A5D6A7" fontname="Arial" fontsize="11" style="filled"',
        label: 'Процесс Базовый (vad:Basic)',
        description: 'Базовый бизнес-процесс в VAD диаграмме'
    },
    'ProcessStyleDetailed': {
        types: ['vad:Process', 'http://example.org/vad#Process'],
        subtypes: ['vad:Detailed', 'http://example.org/vad#Detailed'],
        dot: 'shape="cds" height="0.8" width="1.5" color="#1565C0" fillcolor="#90CAF9" fontname="Arial" fontsize="11" style="filled"',
        label: 'Процесс Детализированный (vad:Detailed)',
        description: 'Детализированный бизнес-процесс в VAD диаграмме'
    },
    'ExecutorGroupStyle': {
        types: ['vad:ExecutorGroup', 'http://example.org/vad#ExecutorGroup'],
        dot: 'shape="ellipse" color="#B8860B" fillcolor="#FFFFCC" fontname="Arial" fontsize="9" style="filled"',
        label: 'Группа исполнителей (vad:ExecutorGroup)',
        description: 'Группа исполнителей процесса'
    },
    'default': {
        types: [],
        dot: 'shape="ellipse" color="#1976D2" fillcolor="#CCE5FF" fontname="Arial" fontsize="10" style="filled"',
        label: 'По умолчанию',
        description: 'Другие объекты'
    }
};

// Test case 1: Process with Detailed subtype
const nodeTypesCache = {'process1': ['vad:Process'], 'process2': ['vad:Process'], 'process3': ['vad:Process']};
const nodeSubtypesCache = {'process1': ['vad:Detailed'], 'process2': ['vad:Basic'], 'process3': []};

function testGetNodeStyle(nodeUri) {
    const nodeTypes = nodeTypesCache[nodeUri] || [];
    const nodeSubtypes = nodeSubtypesCache[nodeUri] || [];

    // First, check styles that have subtypes defined (ProcessStyleBasic, ProcessStyleDetailed)
    for (const [styleName, styleConfig] of Object.entries(VADNodeStyles)) {
        if (styleName === 'default') continue;
        if (!styleConfig.subtypes) continue; // Skip styles without subtypes

        // Check if node has matching type
        const hasMatchingType = styleConfig.types.some(type => nodeTypes.includes(type));
        if (!hasMatchingType) continue;

        // Check if node has matching subtype
        const hasMatchingSubtype = styleConfig.subtypes.some(subtype => nodeSubtypes.includes(subtype));
        if (hasMatchingSubtype) return styleName;
    }

    // Then, check styles without subtypes (ExecutorGroupStyle, ExecutorStyle, etc.)
    for (const [styleName, styleConfig] of Object.entries(VADNodeStyles)) {
        if (styleName === 'default') continue;
        if (styleConfig.subtypes) continue; // Skip styles with subtypes (already checked)

        for (const type of styleConfig.types) {
            if (nodeTypes.includes(type)) return styleName;
        }
    }

    // For Process nodes without explicit subtype, default to ProcessStyleBasic
    const isProcess = nodeTypes.some(t =>
        t === 'vad:Process' || t === 'http://example.org/vad#Process'
    );
    if (isProcess) {
        return 'ProcessStyleBasic';
    }

    return 'default';
}

// Run tests
const tests = [
    { uri: 'process1', expected: 'ProcessStyleDetailed', desc: 'Process with vad:Detailed' },
    { uri: 'process2', expected: 'ProcessStyleBasic', desc: 'Process with vad:Basic' },
    { uri: 'process3', expected: 'ProcessStyleBasic', desc: 'Process without subtype (fallback to Basic)' },
];

console.log('Testing style selection logic:\n');

let allPassed = true;
tests.forEach(test => {
    const result = testGetNodeStyle(test.uri);
    const passed = result === test.expected;
    if (!passed) allPassed = false;
    console.log(`${passed ? 'PASS' : 'FAIL'}: ${test.desc}`);
    console.log(`  Expected: ${test.expected}`);
    console.log(`  Got: ${result}`);
    console.log('');
});

console.log(allPassed ? 'All tests passed!' : 'Some tests failed!');
process.exit(allPassed ? 0 : 1);
