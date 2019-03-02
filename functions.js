// Read existing notes from localStorage
const getSavedIngredients = function () {
    const ingredientsJSON = localStorage.getItem('ingredients')
    
        if (ingredientsJSON !== null) {
            return JSON.parse(ingredientsJSON)
        } else {
            return []
        }
}

// Save ingredients to localStorage
const saveIngredients = function (ingredients) {
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
}

// Generate DOM structure for ingredient
const generateIngredientDOM = function (ingredient) {
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
        return ingredient.name.toLowerCase().includes(ingredientFilters.searchText.toLowerCase())
    })

    document.querySelector('#ingredients').innerHTML = ''

    filteredIngredients.map(ingredient => {
        // Create a container for the ingredients
        const ingredientEl = document.createElement('p')
        const ingredientName = generateIngredientDOM(ingredient)
        const checkBox = document.createElement('input')
        const removeEl = document.createElement('button')
    
        document.querySelector('#ingredients').appendChild(ingredientEl)
    
        checkBox.checked = ingredient.completed
        checkBox.setAttribute('type', 'checkbox')
        removeEl.innerHTML = 'Remove'
        removeEl.classList.add('remove_button')

        // Add all elements to the ingredientEl as you create them
        ingredientEl.appendChild(checkBox)
        ingredientEl.appendChild(ingredientName)
        ingredientEl.appendChild(removeEl)
    })
}
