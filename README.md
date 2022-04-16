# Exchange Frontend
## [Ссылка на сайт](https://besthack.alersh.ru/) 

## Запуск

**Для запуска поднадобится npm версии 7 и node js версии 16**

Перед запуском создайте .env файл и добавьте туда следующие данные

```bash
# URL бекенда
API_URL=http://localhost:4000
```

```
npm ci
```

### Сборка для разработки

```
npm run dev
```

### Сборка для прода

```
npm run build
```

## Технические решения

Проект написан с использование React + Typescript + Redux Toolkit. Библиотека компонентов, на которой базируется прект - Fluent UI Майкрософта https://developer.microsoft.com/en-us/fluentui

Для отрисовки графиков используется https://tradingview.github.io/lightweight-charts/

Добавлена поддержка нескольких видов графиков, за разный период и возможностью отобразить/скрыть объем продаж
