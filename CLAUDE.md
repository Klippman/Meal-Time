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

### Script Load Order

Both HTML pages load scripts at the bottom of the body in a strict order: `uuidv4.js` → `models.js` → page script (`home.js` or `editor.js`). Classes from earlier scripts are used as globals by later ones (e.g., `RecipeStore`, `Recipe`, `Ingredient`). No module system.

### Rendering Pattern

Imperative DOM manipulation via `document.createElement()`. Filter objects (`{searchText, hideCompleted}`) control what's displayed. Changes trigger full re-renders of the relevant section (`.innerHTML = ''` then rebuild).

### Editor Toolbar

The edit page has a text toolbar with bullet list, numbered list, and clear buttons. Pressing Enter auto-continues the current list format (bullets or incrementing numbers). Typing on an empty list line and pressing Enter removes the prefix instead.

### Color Palette

The UI uses a consistent set of CSS colors: `#01204E` (dark navy), `#028391` (teal), `#F6DCAC` (warm beige), `#F85525` (orange-red), `#FAA968` (soft orange). Gradients built from these are used throughout. Font: Poppins (Google Fonts).
