// // Read existing notes from localStorage
// const getSavedIngredients = () => {
//     const ingredientsJSON = localStorage.getItem('ingredients')
    
//         if (ingredientsJSON !== null) {
//             return JSON.parse(ingredientsJSON)
//         } else {
//             return []
//         }
// }

// // Save ingredients to localStorage
// const saveIngredients = (ingredients) => {
//     localStorage.setItem('ingredients', JSON.stringify(ingredients))
// }

// Remove ingredient from the list
const removeIngredient = (id) => {
    const ingredientIndex = ingredients.findIndex(function (ingredient) {
        return ingredient.id === id
    })

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
    }
}

// Toggle/hide completed ingredients
const toggleIngredient = (id) => {
    const toggleIndex = ingredients.find((ingredient) => {
        return ingredient.id === id
    })

    if (toggleIndex !== undefined) {
        toggleIndex.completed = !toggleIndex.completed
    }
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

// Render application ingredients
const renderIngredients = (ingredients, ingredientFilters) => {
    const filteredIngredients = ingredients.filter((ingredient) => {
        const searchTextMatch = ingredient.name.toLowerCase().includes(ingredientFilters.searchText.toLowerCase())
        const hideCompletedMatch = !ingredientFilters.hideCompleted || !ingredient.completed

        return searchTextMatch && hideCompletedMatch 
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
            renderIngredients(ingredients, ingredientFilters)
        })

        // Setup remove button
        removeEl.textContent = 'Remove'
        removeEl.classList.add('remove_button')
        removeEl.addEventListener('click', () => {
            removeIngredient(ingredient.id)
            saveRecipes(recipes)
            renderIngredients(ingredients, ingredientFilters)
        })

        // Add all elements to the ingredientEl as you create them
        ingredientEl.appendChild(removeEl)
        ingredientEl.appendChild(ingredientName)
        ingredientEl.appendChild(checkBox)
    })
}
