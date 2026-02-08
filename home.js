class RecipeListPage {
  constructor() {
    this.recipes = RecipeStore.load();
    this.filters = { searchText: '', hideCompleted: false };
    this.container = document.querySelector('#recipes');
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    document.querySelector('input').addEventListener('input', (e) => {
      this.filters.searchText = e.target.value;
      this.render();
    });

    document.querySelector('#recipe_form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = e.target.elements.addRecipe.value.trim();
      if (name.length === 0) return;

      const recipe = new Recipe({ name });
      this.recipes.push(recipe);
      RecipeStore.save(this.recipes);
      e.target.elements.addRecipe.value = '';
      location.assign(`edit.html#${recipe.id}`);
    });
  }

  render() {
    this.container.innerHTML = '';

    const filtered = this.recipes.filter(recipe => {
      const searchMatch = recipe.name.toLowerCase().includes(this.filters.searchText.toLowerCase());
      const completedMatch = !this.filters.hideCompleted || !recipe.completed;
      return searchMatch && completedMatch;
    });

    filtered.forEach(recipe => {
      const recipeEl = document.createElement('p');
      const recipeName = document.createElement('a');
      const deleteEl = document.createElement('button');

      recipeName.textContent = recipe.name;
      recipeName.setAttribute('href', `edit.html#${recipe.id}`);

      deleteEl.textContent = 'Remove';
      deleteEl.classList.add('delete_button');
      deleteEl.addEventListener('click', () => {
        RecipeStore.delete(this.recipes, recipe.id);
        RecipeStore.save(this.recipes);
        this.render();
      });

      recipeEl.appendChild(deleteEl);
      recipeEl.appendChild(recipeName);
      this.container.appendChild(recipeEl);
    });
  }
}

new RecipeListPage();
