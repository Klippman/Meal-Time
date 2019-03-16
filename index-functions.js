// Read existing recipes in localStorage
const getSavedRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
        try {
            return recipesJSON ? JSON.parse(recipesJSON) : []
        } catch (e) {
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
    const recipeElContainer = document.querySelector('#recipes')
    const filteredRecipes = recipes.filter((recipe) => {
        const searchTextMatch = recipe.name.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !recipe.completed

            return searchTextMatch && hideCompletedMatch
    })
    
    recipeElContainer.innerHTML = ''
    
    filteredRecipes.map(recipe => {
        const recipeEl = document.createElement('p')
        const recipeName = document.createElement('a')
        const deleteEl = document.createElement('button')

        recipeElContainer.appendChild(recipeEl)

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

// Generate DOM structure for ingredient
const generateIngredientDOM = (ingredient) => {
    const ingredientName = document.createElement('label')
    
    if (ingredient.name.length > 0) {
        ingredientName.textContent = ingredient.name
    } else {
        ingredientName.textContent = 'Unnamed Ingredient'
    }
    
    return ingredientName
}

const renderIngredients = (recipes) => {
    const ingredientElContainer = document.querySelector('#ingredients')
    
    ingredientElContainer.innerHTML = ''

    recipe.ingredients.map(ingredient => {
        // Create a container for the ingredients
        const ingredientEl = document.createElement('p')
        const ingredientName = generateIngredientDOM(ingredient)
        const checkBox = document.createElement('input')
        const removeEl = document.createElement('button')
    
        ingredientElContainer.appendChild(ingredientEl)

        ingredientName.textContent = ingredient.name
    
        // Setup checkbox
        checkBox.checked = ingredient.completed
        checkBox.setAttribute('type', 'checkbox')
        checkBox.addEventListener('change', function () {
            toggleIngredient(ingredient.name)
            saveRecipes(recipes)
            renderIngredients(recipes)
        })

        // Setup remove button
        removeEl.textContent = 'Remove'
        removeEl.classList.add('remove_button')
        removeEl.addEventListener('click', () => {
            removeIngredient(ingredient.name)
            saveRecipes(recipes)
            renderIngredients(recipes)
        })

        // Add all elements to the ingredientEl as you create them
        ingredientEl.appendChild(removeEl)
        ingredientEl.appendChild(checkBox)
    })
}


