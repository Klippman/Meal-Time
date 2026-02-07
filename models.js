class Ingredient {
  constructor({ id, name, completed = false }) {
    this.id = id || (typeof uuidv4 === 'function' ? uuidv4() : String(Date.now()));
    this.name = name;
    this.completed = completed;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

class Recipe {
  constructor({ id, name, body = '', ingredients = [], completed = false }) {
    this.id = id || (typeof uuidv4 === 'function' ? uuidv4() : String(Date.now()));
    this.name = name;
    this.body = body;
    this.ingredients = ingredients.map(ing => ing instanceof Ingredient ? ing : new Ingredient(ing));
    this.completed = completed;
  }

  addIngredient(name) {
    const ingredient = new Ingredient({ name, completed: false });
    this.ingredients.push(ingredient);
    return ingredient;
  }

  removeIngredient(id) {
    const index = this.ingredients.findIndex(ing => ing.id === id);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }

  toggleIngredient(id) {
    const ingredient = this.ingredients.find(ing => ing.id === id);
    if (ingredient) {
      ingredient.toggle();
    }
  }

  filteredIngredients(filters) {
    return this.ingredients.filter(ing => {
      const searchMatch = ing.name.toLowerCase().includes(filters.searchText.toLowerCase());
      const completedMatch = !filters.hideCompleted || !ing.completed;
      return searchMatch && completedMatch;
    });
  }
}

class RecipeStore {
  static load() {
    try {
      const data = JSON.parse(localStorage.getItem('recipes') || '[]');
      return data.map(r => new Recipe(r));
    } catch (e) {
      return [];
    }
  }

  static save(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  static delete(recipes, id) {
    const index = recipes.findIndex(r => r.id === id);
    if (index > -1) {
      recipes.splice(index, 1);
    }
  }
}
