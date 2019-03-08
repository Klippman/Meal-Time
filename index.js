const recipes = getSavedRecipes()

const filters = {
    searchText: ''
}

renderRecipes(recipes, filters)

const availRecipes = recipes.filter((recipe) => {
    return !recipe.completed
})

// Input field listening for pressed keys to filter recipes
document.querySelector('input').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

// Add new recipe name to the array
document.querySelector('#recipe_form').addEventListener('submit', (e) => {
    const recipe = e.target.elements.addRecipe.value.trim()
    const id = uuidv4()
    e.preventDefault()
    recipes.push({
        id, 
        name: recipe,
        completed: false
    })
    saveRecipes(recipes)
    e.target.elements.addRecipe.value = ''
    location.assign(`/edit.html#${id}`)
})
    


