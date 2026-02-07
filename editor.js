class RecipeEditPage {
  constructor() {
    this.recipes = RecipeStore.load();
    this.recipeId = location.hash.substring(1);
    this.recipe = this.recipes.find(r => r.id === this.recipeId);
    this.filters = { searchText: '', hideCompleted: false };

    if (!this.recipe) {
      location.assign('/index.html');
      return;
    }

    this.textArea = document.querySelector('#instruction_body');
    this.container = document.querySelector('#ingredients');
    this.textArea.value = this.recipe.body;

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
