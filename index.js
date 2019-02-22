const recipes = [{
    name: 'Chicken',
    completed: false
}, {
    name: 'Catfish',
    completed: false
}, {
    name: 'Beef', 
    completed: false
}]

const filters = {
    searchText: ''
}

const renderRecipes = (recipes, filters) => {
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#recipes').innerHTML = ''
    
    filteredRecipes.forEach((recipe) => {
        const recipeEl = document.createElement('p')
        recipeEl.textContent = recipe.name
        document.querySelector('#recipes').appendChild(recipeEl)
    })
}

renderRecipes(recipes, filters)

const availRecipes = recipes.filter((recipe) => {
    return !recipe.completed
})

document.querySelector('input').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

// Add new recipe name to the array
document.querySelector('#recipe_form').addEventListener('submit', (e) => {
    e.preventDefault()
    recipes.push({
        name: e.target.elements.createRecipe.value,
        completed: false
    })
    renderRecipes(recipes, filters)
    e.target.elements.createRecipe.value = ''
})
    


