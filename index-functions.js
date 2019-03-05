// Read existing recipes in localStorage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    
        if (recipesJSON !== null) {
            return JSON.parse(recipesJSON)
        } else {
            return []
        }
}

// Save recipes to localStorage
const saveRecipes = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

// Delete Recipes
const deleteRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => {
        return recipe.id === id
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
    }
}