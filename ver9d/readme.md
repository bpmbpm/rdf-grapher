### ver9d
Ontology + SPARQL + Reasoner   
на основе ver9с 

### run

https://bpmbpm.github.io/rdf-grapher/ver9d/  


*Загрузить пример RDF данных:*
выбрать (choose): **Trig VADv8** (или другой) 
Данные автоматически загрузятся, пройдут валидацию и отобразятся в окне Publisher.  
В Дерево TriG выбирать объекты, схемы или процессы (как в любой ARIS - подобной системе). При выборе схемы процесса в treeview - в окне Диаграмма отобразится схема процесса.

Файлы с примерами RDF - данных в /dia:
- Trig_VADv5.ttl и Trig_VADv6.ttl разделитель "." Поэтому quadstore формирует полный адрес
- начиная с Trig_VADv7.ttl разделитель "_", поэтому quadstore уже "чище".

[Основные тезисы](https://github.com/bpmbpm/rdf-grapher/blob/main/introduction/theses.md)
см. https://github.com/bpmbpm/rdf-grapher/tree/main/introduction 

### target
Семантический аналог для http://www.bpm.processoffice.ru/  
Тезис: от табличек и SQL   
к онтологиям (Protege и т.п.) + tripleStore (quadstore) + SPARQL + Reasoner и т.п. (Linked Data RDF\RDFS\OWL)  
"формальная семантика (LD) во всем" = semantic BPM/EA/CMDB/Web и т.п.  
Принцип Семантический ARIS (BPM): UI на js (и подобном), а логика на SPARQL (SPARQL-Driven подход)  

### also
- https://github.com/bpmbpm/rdf-grapher/tree/main/ver8tree
- https://github.com/bpmbpm/SemanticBPM
