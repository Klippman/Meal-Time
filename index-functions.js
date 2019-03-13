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

// Render application recipes
const renderRecipes = (recipes, filters) => {
    const filteredRecipes = recipes.filter((recipe) => {
        const searchTextMatch = recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !recipe.completed
            return searchTextMatch && hideCompletedMatch
    })
    
    document.querySelector('#recipes').innerHTML = ''
    
    filteredRecipes.map(recipe => {
        const recipeEl = document.createElement('p')
        const recipeName = document.createElement('a')
        const deleteEl = document.createElement('button')

        document.querySelector('#recipes').appendChild(recipeEl)

        recipeName.textContent = recipe.name
        recipeName.setAttribute('href', `/edit.html#${recipe.id}`)

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