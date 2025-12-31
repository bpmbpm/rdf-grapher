# SPARQL Test Queries for RDF Grapher

This document contains several test SPARQL queries for the example RDF data provided in RDF Grapher ver2.

## Example RDF Data (Turtle format)

```turtle
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix ex: <http://example.org/> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:john rdf:type foaf:Person ;
    foaf:name "John Doe" ;
    foaf:age 30 ;
    foaf:knows ex:jane, ex:bob .

ex:jane rdf:type foaf:Person ;
    foaf:name "Jane Smith" ;
    foaf:knows ex:john .

ex:bob rdf:type foaf:Person ;
    foaf:name "Bob Wilson" ;
    foaf:workplaceHomepage <http://example.org/company> .

ex:company rdf:type foaf:Organization ;
    foaf:name "Example Corp" ;
    foaf:member ex:bob, ex:jane .
```

---

## Test Queries

### 1. Get All Triples (Default Query)

Find all subjects, predicates, and objects in the graph.

```sparql
SELECT ?s ?p ?o
WHERE {
    ?s ?p ?o .
}
```

**Expected results:** All triples from the RDF data (14 rows).

---

### 2. Find All People

Find all entities of type foaf:Person.

```sparql
SELECT ?person ?name
WHERE {
    ?person a <http://xmlns.com/foaf/0.1/Person> .
    ?person <http://xmlns.com/foaf/0.1/name> ?name .
}
```

**Expected results:**
- ex:john - "John Doe"
- ex:jane - "Jane Smith"
- ex:bob - "Bob Wilson"

---

### 3. Find Who Knows Whom

Find all "knows" relationships between people.

```sparql
SELECT ?person ?knows
WHERE {
    ?person <http://xmlns.com/foaf/0.1/knows> ?knows .
}
```

**Expected results:**
- ex:john knows ex:jane
- ex:john knows ex:bob
- ex:jane knows ex:john

---

### 4. Find Organization Members

Find all members of organizations.

```sparql
SELECT ?org ?orgName ?member ?memberName
WHERE {
    ?org a <http://xmlns.com/foaf/0.1/Organization> .
    ?org <http://xmlns.com/foaf/0.1/name> ?orgName .
    ?org <http://xmlns.com/foaf/0.1/member> ?member .
    ?member <http://xmlns.com/foaf/0.1/name> ?memberName .
}
```

**Expected results:**
- ex:company ("Example Corp") has members ex:bob ("Bob Wilson") and ex:jane ("Jane Smith")

---

### 5. Find All Types

Find all unique types used in the graph.

```sparql
SELECT DISTINCT ?type
WHERE {
    ?s a ?type .
}
```

**Expected results:**
- foaf:Person
- foaf:Organization

---

### 6. Find People with Age Information

Find people who have age information.

```sparql
SELECT ?person ?name ?age
WHERE {
    ?person a <http://xmlns.com/foaf/0.1/Person> .
    ?person <http://xmlns.com/foaf/0.1/name> ?name .
    ?person <http://xmlns.com/foaf/0.1/age> ?age .
}
```

**Expected results:**
- ex:john - "John Doe" - 30

---

### 7. Count Triples per Subject

Count how many triples each subject has.

```sparql
SELECT ?s (COUNT(?p) AS ?count)
WHERE {
    ?s ?p ?o .
}
GROUP BY ?s
ORDER BY DESC(?count)
```

**Expected results:** Count of triples per subject, ordered by count descending.

---

### 8. Find Mutual Relationships

Find people who know each other mutually.

```sparql
SELECT ?person1 ?person2
WHERE {
    ?person1 <http://xmlns.com/foaf/0.1/knows> ?person2 .
    ?person2 <http://xmlns.com/foaf/0.1/knows> ?person1 .
    FILTER(?person1 < ?person2)
}
```

**Expected results:**
- ex:john and ex:jane know each other mutually

---

### 9. Find All Literal Values

Find all literal values (strings, numbers) in the graph.

```sparql
SELECT ?s ?p ?literal
WHERE {
    ?s ?p ?literal .
    FILTER(isLiteral(?literal))
}
```

**Expected results:** All triples where the object is a literal value.

---

### 10. Find All Predicates Used

List all unique predicates used in the graph.

```sparql
SELECT DISTINCT ?predicate
WHERE {
    ?s ?predicate ?o .
}
```

**Expected results:**
- rdf:type
- foaf:name
- foaf:age
- foaf:knows
- foaf:workplaceHomepage
- foaf:member

---

## Usage Instructions

1. Load the example RDF data by clicking "Turtle" in the "Load example RDF data" section
2. Click "Visualize" button to parse and display the RDF graph
3. Set "SPARQL Mode" to "Yes" to enable the SPARQL query panel
4. Copy any of the queries above into the SPARQL query textarea
5. Click "Execute Query" to run the query and see results

---

## Notes

- Comunica SPARQL engine is used for query execution
- Full URIs can be used in queries (prefix shortcuts not supported in the query itself)
- Results are displayed in a table format with clickable URIs
- Literal values are shown in quotes with purple color
- URI values are shown with blue color using prefixed names when available
