const textAreaEl = document.querySelector('#instruction_body')
const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()
const recipe = recipes.find((recipe) => {
    return recipe.id === recipeId
})

let filters = {
    searchText: '',
    hideCompleted: false
}

if (recipe === undefined) {
    location.assign('/index.html')
}

textAreaEl.value = recipe.body

textAreaEl.addEventListener('input', (e) => {
    recipe.body = e.target.value
    saveRecipes(recipes)
})

// Add a new ingredient
document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
    const ingredient = e.target.elements.addIngredient.value.trim()
    e.preventDefault()
    recipe.ingredients.push({
        name: ingredient,
        completed: false
    })
    saveRecipes(recipes)
    e.target.elements.addIngredient.value = ''
})

// Remove ingredient from the list
const removeIngredient = (name) => {
    const ingredientIndex = recipe.ingredients.findIndex((ingredient) => ingredient.name === name)

        if (ingredientIndex > -1) {
            recipe.ingredients.splice(ingredientIndex, 1)
        }
}

// Toggle completed 
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    recipe.ingredients.completed = e.target.checked
    renderRecipes(recipes, filters)
})

// Toggle/hide completed ingredients
const toggleIngredient = (name) => {
    const ingredient = recipe.ingredients.find(ingredient => ingredient.name === name) 

        if (ingredient) {
            ingredient.completed = !ingredient.completed 
        }
        saveRecipes(recipes)
}

