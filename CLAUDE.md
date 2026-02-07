# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build system or package manager. Open `index.html` directly in a browser, or serve via:
```
python -m http.server
```

## Architecture

Vanilla JavaScript client-side recipe management app. No frameworks, no backend — all data persists in browser localStorage.

### Class-based structure

- **`models.js`** — Data model classes: `Ingredient` (toggle), `Recipe` (add/remove/toggle ingredients, filtering), `RecipeStore` (static localStorage CRUD).
- **`home.js`** — `RecipeListPage` class: binds events, manages filters, renders recipe list. Entry point for `index.html`.
- **`editor.js`** — `RecipeEditPage` class: binds events, manages filters, renders ingredients. Entry point for `edit.html`.
- **`uuidv4.js`** — UUID v4 generation (minified library, global `uuidv4()` function).

### Data Model

Recipes and ingredients are stored as JSON arrays in localStorage. Each recipe has `{id, name, body, ingredients[], completed}`. Each ingredient has `{id, name, completed}`. IDs are UUID v4 strings.

### Routing

Hash-based: `index.html#` for the list, `edit.html#<recipeId>` for editing. Navigation uses `location.assign()`.

### Rendering Pattern

Imperative DOM manipulation via `document.createElement()`. Filter objects (`{searchText, hideCompleted}`) control what's displayed. Changes trigger full re-renders of the relevant section.
