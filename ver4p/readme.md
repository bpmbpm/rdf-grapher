### ver4 Process

RDF Grapher ver4p — сервис для парсинга RDF данных и их визуализации в виде графа с поддержкой режима VAD (Value Added Chain Diagram). Этот сервис является расширенным аналогом LDF RDF Grapher.

Новые возможности ver4p:
- Режим VAD: визуализация цепочки добавленной стоимости с процессами и исполнителями
- Процессы отображаются как cds-фигуры (chevron) с зеленой заливкой
- Исполнители процессов показываются как подписи под процессами
- Валидация данных на соответствие схеме VAD

### run
https://bpmbpm.github.io/rdf-grapher/ver4p/  
- после запуска (github Pages) в "Загрузить пример RDF данных" выбрать например, Turtle в кнопка "Визуализировать". Будет построен граф. Управлять видимостью элементов графа можно через фильтры ("Фильтры типов:"), в данном варианте только через типы предикатов, но можно дополнить и фильтрацию через типы \ классы объектов-сущностей (субъектов).  
- простой пример идеи: открыли ссылку, выбрали Turtle VAD кнопка визуализировать, в фильтрах убрали галку с vad:hasExecutor и на схеме VAD исчезли Исполнители под процессами (шагами).
  
### task
ver4p - "полпути", т.е. более ранние verХ - это в сторону классических rdf-grapher (ver1 = classic rdf-grapher) с их ограничением по визуализации. От ver1 к ver4p - это добавление возможностей по визуализации.  
Последующие verХ (от ver4p)- это в сторону классических ARIS-подобных систем, только основанных на семантическом клеи (сахаре). 

### problem
- "Режим VAD" - работает, если выбран был "Turtle VAD"

### dot
- [xlabel GraphvizOnline](
https://dreampuf.github.io/GraphvizOnline/?engine=dot#digraph%20G%20%7B%0A%0A%20complete%20%5Bxlp%3D%22-10%2C-20%22%20xlabel%3Dcomplete%2C%20shape%3Ddoublecircle%2C%20label%3D%20%22111%22%5D%0A%7D) ; https://graphviz.org/docs/attrs/xlabel/ ; https://stackoverflow.com/questions/30689533/graphviz-graph-positioning-xlabels ; https://graphviz.org/gallery/ ;
- https://habr.com/ru/articles/682346/
- https://github.com/ppareit/graphviz-dot-mode/tree/master
- https://hackage-content.haskell.org/package/graphviz-2999.20.2.1/docs/Data-GraphViz-Attributes.html
- https://lib.custis.ru/Graphviz
- https://graphviz.org/doc/info/shapes.html

### alt
- [Осторожная попытка переосмыслить сложное: Как связать документы, диаграммы и знания?](https://habr.com/ru/articles/1079138/)
- [Проект Xanadu: концепция интернета, которая 50 лет была в разработке и за это время сильно устарела](https://thecode.media/proekt-xanadu-kontseptsiya-interneta-kotoraya-ustarela/)
