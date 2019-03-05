const recipes = getSavedRecipes()

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
        const recipeName = document.createElement('a')
        const deleteEl = document.createElement('button')

        document.querySelector('#recipes').appendChild(recipeEl)

        recipeName.textContent = recipe.name
        recipeName.setAttribute('href', '/edit.html')

        deleteEl.textContent = 'Remove'
        deleteEl.classList.add('delete_button')
        deleteEl.addEventListener('click', (id) => {
            deleteRecipe(recipe.id)
            saveRecipes(recipes)
            renderRecipes(recipes, filters)
        })

        recipeEl.appendChild(deleteEl)
        recipeEl.appendChild(recipeName)
    })
}

renderRecipes(recipes, filters)

const availRecipes = recipes.filter((recipe) => {
    return !recipe.completed
})

// Input field listening for pressed keys
document.querySelector('input').addEventListener('input', (e) => {
    filters.searchText = e.target.value
    renderRecipes(recipes, filters)
})

// Add new recipe name to the array
document.querySelector('#recipe_form').addEventListener('submit', (e) => {
    const recipe = e.target.elements.addRecipe.value.trim()
    const recipeId = uuidv4()
    e.preventDefault()
    recipes.push({
        id: recipeId, 
        name: recipe,
        completed: false
    })
    saveRecipes(recipes)
    renderRecipes(recipes, filters)
    e.target.elements.addRecipe.value = ''
})
    


