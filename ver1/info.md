# RDF Grapher ver1

## Issue информация
- **Issue номер:** #1
- **Issue title:** Clone1a

## Описание

Этот проект является клоном сервиса [LDF RDF Grapher](https://www.ldf.fi/service/rdf-grapher).

### Функциональность

RDF Grapher - сервис для парсинга RDF данных и их визуализации в виде графа.

### Используемые технологии

Оригинальный сервис использует:
- [Redland Raptor](http://librdf.org/raptor/rapper.html) - для парсинга RDF
- [Graphviz](http://graphviz.org/) - для визуализации графов

Данная реализация использует JavaScript аналоги для работы в браузере:
- [N3.js](https://github.com/rdfjs/N3.js) - быстрый JavaScript парсер RDF (замена Raptor)
- [Viz.js](https://github.com/mdaines/viz-js) - WebAssembly сборка Graphviz (замена серверного Graphviz)

### Поддерживаемые форматы

**Входные форматы:**
- Turtle (.ttl)
- N-Triples (.nt)
- N-Quads (.nq)
- TriG (.trig)

**Выходные форматы:**
- SVG (векторный)
- PNG (растровый)

**Движки компоновки графа:**
- dot (иерархическая)
- neato (spring model)
- fdp (force-directed)
- circo (круговая)
- twopi (радиальная)

### Запуск

Сервис запускается через файл `index.html` и работает полностью в браузере.
Может быть размещен на GitHub Pages без необходимости серверной части.

### Ссылки

- Запуск: https://bpmbpm.github.io/rdf-grapher/ver1/index.html
- Оригинальный сервис: https://www.ldf.fi/service/rdf-grapher
