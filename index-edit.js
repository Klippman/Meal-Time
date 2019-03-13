const textAreaEl = document.querySelector('#instruction_body')
const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()
const recipe = recipes.find((recipe) => {
    return recipe.id === recipeId
})

const filters = {
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
    e.target.elements.addIngredient.value = ''
    saveRecipes(recipes)
    renderRecipes(recipes)
})

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

// Remove ingredient from the list
const removeIngredient = (id) => {
    const ingredientIndex = recipes.findIndex((ingredient) => {
        return ingredient.id === id
    })

    if (ingredientIndex > -1) {
        recipes.splice(ingredientIndex, 1)
    }
}

// Toggle completed 
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    filters.hideCompleted = e.target.checked
    renderRecipes(recipes, filters)
})

// Toggle/hide completed ingredients
const toggleIngredient = (id) => {
    const toggleIndex = recipes.find((ingredient) => {
        return ingredient.id === id
    })

    if (toggleIndex !== undefined) {
        toggleIndex.completed = !toggleIndex.completed
    }
}

const filteredIngredients = recipe.ingredients.filter((ingredient) => {
    const hideCompletedMatch = !filters.hideCompleted || !ingredient.completed

        return hideCompletedMatch 
})

document.querySelector('#ingredients').innerHTML = ''

    filteredIngredients.map(ingredient => {
        // Create a container for the ingredients
        const ingredientEl = document.createElement('p')
        const ingredientName = generateIngredientDOM(ingredient)
        const checkBox = document.createElement('input')
        const removeEl = document.createElement('button')
    
        document.querySelector('#ingredients').appendChild(ingredientEl)
    
        // Setup checkbox
        checkBox.checked = ingredient.completed
        checkBox.setAttribute('type', 'checkbox')
        checkBox.addEventListener('change', function () {
            toggleIngredient(ingredient.id)
            saveRecipes(recipes)
            renderRecipes(recipes)
        })

        // Setup remove button
        removeEl.textContent = 'Remove'
        removeEl.classList.add('remove_button')
        removeEl.addEventListener('click', () => {
            removeIngredient(ingredient.id)
            saveRecipes(recipes)
            renderRecipes(recipes)
        })

        // Add all elements to the ingredientEl as you create them
        ingredientEl.appendChild(removeEl)
        ingredientEl.appendChild(ingredientName)
        ingredientEl.appendChild(checkBox)
    })