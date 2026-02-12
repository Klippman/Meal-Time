class RecipeEditPage {
  constructor() {
    this.recipes = RecipeStore.load();
    this.recipeId = location.hash.substring(1);
    this.recipe = this.recipes.find(r => r.id === this.recipeId);
    this.filters = { searchText: '', hideCompleted: false };

    if (!this.recipe) {
      location.assign('index.html');
      return;
    }

    this.textArea = document.querySelector('#instruction_body');
    this.container = document.querySelector('#ingredients');
    this.textArea.value = this.recipe.body;

    const recipeName = document.querySelector('#recipes');
    recipeName.textContent = this.recipe.name;

    this.bindEvents();
    this.renderIngredients();
  }

  bindEvents() {
    this.textArea.addEventListener('input', (e) => {
      this.recipe.body = e.target.value;
      RecipeStore.save(this.recipes);
    });

    document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.elements.addIngredient.value.trim();
      if (name.length === 0) return;

      this.recipe.addIngredient(name);
      RecipeStore.save(this.recipes);
      this.renderIngredients();
      e.target.elements.addIngredient.value = '';
    });

    document.querySelector('#hide-completed').addEventListener('change', (e) => {
      this.filters.hideCompleted = e.target.checked;
      this.renderIngredients();
    });

    document.querySelector('#btn-bullet').addEventListener('click', () => {
      this.insertPrefix('\u2022 ');
    });

    document.querySelector('#btn-number').addEventListener('click', () => {
      const text = this.textArea.value.substring(0, this.textArea.selectionStart);
      const lines = text.split('\n');
      let lastNum = 0;
      for (let i = lines.length - 1; i >= 0; i--) {
        const match = lines[i].match(/^(\d+)\.\s/);
        if (match) { lastNum = parseInt(match[1]); break; }
        if (lines[i].trim() !== '') break;
      }
      this.insertPrefix((lastNum + 1) + '. ');
    });

    this.textArea.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const ta = this.textArea;
      const pos = ta.selectionStart;
      const textBefore = ta.value.substring(0, pos);
      const lastNewline = textBefore.lastIndexOf('\n');
      const currentLine = textBefore.substring(lastNewline + 1);

      const numMatch = currentLine.match(/^(\d+)\.\s/);
      const bulletMatch = currentLine.match(/^\u2022\s/);

      if (numMatch) {
        // If the line is just the number prefix with nothing after, remove it instead
        if (currentLine.trim() === numMatch[0].trim()) {
          e.preventDefault();
          ta.setRangeText('\n', lastNewline + 1, pos, 'end');
          this.recipe.body = ta.value;
          RecipeStore.save(this.recipes);
          return;
        }
        e.preventDefault();
        const nextNum = parseInt(numMatch[1]) + 1;
        ta.setRangeText('\n' + nextNum + '. ', pos, pos, 'end');
        this.recipe.body = ta.value;
        RecipeStore.save(this.recipes);
      } else if (bulletMatch) {
        if (currentLine.trim() === '\u2022') {
          e.preventDefault();
          ta.setRangeText('\n', lastNewline + 1, pos, 'end');
          this.recipe.body = ta.value;
          RecipeStore.save(this.recipes);
          return;
        }
        e.preventDefault();
        ta.setRangeText('\n\u2022 ', pos, pos, 'end');
        this.recipe.body = ta.value;
        RecipeStore.save(this.recipes);
      }
    });

    document.querySelector('#btn-clear').addEventListener('click', () => {
      if (this.textArea.value.length === 0) return;
      if (confirm('Clear all instructions?')) {
        this.textArea.value = '';
        this.recipe.body = '';
        RecipeStore.save(this.recipes);
      }
    });
  }

  insertPrefix(prefix) {
    const ta = this.textArea;
    const start = ta.selectionStart;
    const val = ta.value;
    const needsNewline = start > 0 && val[start - 1] !== '\n';
    const insert = (needsNewline ? '\n' : '') + prefix;
    ta.setRangeText(insert, start, start, 'end');
    ta.focus();
    this.recipe.body = ta.value;
    RecipeStore.save(this.recipes);
  }

  renderIngredients() {
    this.container.innerHTML = '';

    this.recipe.filteredIngredients(this.filters).forEach(ingredient => {
      const ingredientEl = document.createElement('p');
      const ingredientName = document.createElement('label');
      const checkBox = document.createElement('input');
      const removeEl = document.createElement('button');

      ingredientName.textContent = ingredient.name.length > 0 ? ingredient.name : 'Unnamed Ingredient';

      checkBox.checked = !!ingredient.completed;
      checkBox.setAttribute('type', 'checkbox');
      checkBox.addEventListener('change', () => {
        this.recipe.toggleIngredient(ingredient.id);
        RecipeStore.save(this.recipes);
        this.renderIngredients();
      });

      removeEl.textContent = 'Remove';
      removeEl.classList.add('remove_button');
      removeEl.addEventListener('click', () => {
        this.recipe.removeIngredient(ingredient.id);
        RecipeStore.save(this.recipes);
        this.renderIngredients();
      });

      ingredientEl.appendChild(removeEl);
      ingredientEl.appendChild(ingredientName);
      ingredientEl.appendChild(checkBox);
      this.container.appendChild(ingredientEl);
    });
  }
}

new RecipeEditPage();
