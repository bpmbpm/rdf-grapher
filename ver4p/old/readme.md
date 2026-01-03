### old

### index4fin1.html
https://bpmbpm.github.io/rdf-grapher/ver4p/old/index4fin1.html  
После нее:  
Технические характеристики
- Добавлена ​​новая generateVadNodeId(uri, prefixes)функция, которая:
  - Получает имя с префиксом из URI (например, http://example.org/vad#Process1→ vad:Process1).
  - Заменяет недопустимые символы точки ( :, -, ., пробелы) на_
- Обновлен весь код генерации VAD DOT для использования этой новой функции.
