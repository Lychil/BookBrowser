# 📚 Book Browser

Book Browser — это приложение для поиска и просмотра книг с использованием Google Books API. Позволяет фильтровать книги по различным параметрам и категориям.

## 🚀 Основные возможности
- Поиск книг через Google Books API
- Фильтрация по параметрам q (запрос) и filter (категории)
- Удобный интерфейс просмотра результатов
- Адаптивный дизайн

## Технологии
- Библиотека: React
- Управление состоянием: Context API + useReducer
- HTTP-клиент: Fetch API
- Стилизация: CSS Modules
- Сборка: Vite
- Язык: TypeScript
- Маршрутизация: React Router
- Уведомления: react-toastify

## Структура проекта
```
src/
├── common/       # Общие компоненты, типы, стили
├── pages/        # Компоненты страниц
├── store/        # Логика состояния и API
├── App.tsx       # Корневой компонент
└── main.tsx      # Точка входа
```

## Установка и запуск
```bash
git clone https://github.com/Lychil/BookBrowser.git
npm i
npm run dev
```
