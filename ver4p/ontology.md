# Ontology Selection for VAD (Value Added Chain Diagram)

## Overview

This document describes the ontology selection and comparison for implementing VAD (Value Added Chain Diagram) visualization in RDF Grapher ver4p. VAD diagrams represent business processes with their executors/performers, showing the value chain flow.

## Ontology Comparison

### 1. BBO (BPMN 2.0 Based Ontology)

**Source:** https://hal.science/hal-02365012v1/document

**Description:** The BBO ontology is a BPMN 2.0-based ontology designed for business process representation. It formalizes BPMN 2.0 constructs (processes, tasks, sequence flows).

**Key Classes:**
- `bbo:Process` - Business process
- `bbo:Activity` - Activities within processes
- `bbo:SequenceFlow` - Connections between flow nodes
- `bbo:FlowElementsContainer` - Container for flow elements

**Pros:**
- Based on established BPMN 2.0 standard
- Rich expressivity for complex workflows
- Well-documented

**Cons:**
- Complex for simple VAD diagrams
- Requires SequenceFlow class for connections (verbose)
- BPMN-specific, may have unnecessary elements for VAD

---

### 2. W3C Organization Ontology (ORG)

**Source:** https://www.w3.org/TR/vocab-org/

**Namespace:** http://www.w3.org/ns/org#

**Description:** Core ontology for organizational structures, aimed at supporting linked data publishing of organizational information.

**Key Classes:**
- `org:Organization` - Collection of people organized together
- `org:OrganizationalUnit` - Departments or support units
- `org:Role` - Abstract roles that agents can fulfill
- `org:Membership` - N-ary relationships between agents and organizations

**Key Properties:**
- `org:hasMember` / `org:memberOf` - Membership relationships
- `org:role` - Role in membership
- `org:reportsTo` - Reporting structure

**Pros:**
- W3C Recommendation (well-standardized)
- Excellent for organizational structures and roles
- Extensible for domain-specific needs

**Cons:**
- No built-in process sequencing predicates
- Need to extend for process flow (hasNext)

---

### 3. EBTIC-BPM Ontology

**Source:** https://inria.hal.science/hal-01474693v1/document

**Description:** Lightweight RDF data model specifically designed for business process analysis.

**Key Properties:**
- `ebtic-bpm:followedBy` - Next task in sequence
- `ebtic-bpm:precededBy` - Previous task in sequence

**Pros:**
- Simple and lightweight
- Direct sequencing predicates
- Designed for process analysis

**Cons:**
- Less standardized
- Limited documentation
- May need extension for organizational roles

---

### 4. Dublin Core Terms (dcterms)

**Source:** https://www.dublincore.org/specifications/dublin-core/dcmi-terms/

**Namespace:** http://purl.org/dc/terms/

**Description:** Widely-used metadata vocabulary for describing resources.

**Key Properties:**
- `dcterms:title` - Title/name of resource
- `dcterms:description` - Description of resource
- `dcterms:identifier` - Unique identifier

**Pros:**
- Widely adopted standard
- Simple and well-understood
- Good for basic metadata (name, description)

**Cons:**
- Not process-specific
- No organizational or sequencing constructs

---

## Selected Approach: Custom VAD Ontology with Standard Vocabularies

For the VAD diagram implementation, we use a **hybrid approach** combining:

1. **Custom VAD namespace** (`vad:`) for VAD-specific concepts
2. **W3C ORG** for organizational structures
3. **Dublin Core** for basic metadata (description, title)
4. **RDFS** for labels and comments

### VAD Namespace

**Namespace:** http://example.org/vad#

**Prefix:** `vad:`

### VAD Classes

| Class | URI | Description |
|-------|-----|-------------|
| `vad:Process` | `http://example.org/vad#Process` | A business process in the value chain |
| `vad:ExecutorGroup` | `http://example.org/vad#ExecutorGroup` | Group of executors for a process |
| `vad:Executor` | `http://example.org/vad#Executor` | Individual process executor/performer |

### VAD Properties

| Property | Domain | Range | Description |
|----------|--------|-------|-------------|
| `vad:hasNext` | `vad:Process` | `vad:Process` | Links to the next process in sequence |
| `vad:hasExecutor` | `vad:Process` | `vad:ExecutorGroup` | Links process to its executor group |
| `vad:hasParent` | `vad:Process` | `vad:Process` | Links to parent/mother process |
| `vad:includes` | `vad:ExecutorGroup` | `vad:Executor` | Links executor group to its members |

### Supplementary Properties from Standard Vocabularies

| Property | Namespace | Usage |
|----------|-----------|-------|
| `rdfs:label` | RDFS | Name/label of resources |
| `dcterms:description` | Dublin Core | Process description |
| `rdf:type` | RDF | Type declaration |

## VAD Allowed Objects and Predicates

For VAD mode validation, only the following are allowed:

### Allowed Types (rdf:type values)
- `vad:Process`
- `vad:ExecutorGroup`
- `vad:Executor`

### Allowed Predicates
- `rdf:type` - Type declaration
- `rdfs:label` - Resource label
- `dcterms:description` - Description
- `vad:hasNext` - Process sequencing
- `vad:hasExecutor` - Process to executor group link
- `vad:hasParent` - Parent process link (not shown in VAD view)
- `vad:includes` - Executor group membership

## Visualization Rules for VAD Mode

1. **Process nodes** are rendered as `cds` (chevron) shapes with green fill
2. **Executor groups** are displayed as labels below the process cds shape
3. **hasNext edges** connect from east (right) to west (left) of cds shapes
4. **hasParent** relationships are hidden in VAD visualization but shown in properties panel
5. Validation ensures all triples use only allowed predicates and types

## References

1. W3C Organization Ontology: https://www.w3.org/TR/vocab-org/
2. BBO Ontology: https://hal.science/hal-02365012v1/document
3. Dublin Core Terms: https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
4. RDF Schema: https://www.w3.org/TR/rdf-schema/
5. EBTIC-BPM: https://inria.hal.science/hal-01474693v1/document
