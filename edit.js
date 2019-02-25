let ingredients = []

const ingredientFilters = {
    searchText: '',
    hideCompleted: false
}

const ingredientsJSON = localStorage.getItem('ingredients')
    if (ingredientsJSON !== null) {
        ingredients = JSON.parse(ingredientsJSON)
    } 

const renderIngredients = (ingredients, ingredientFilters) => {
    const filteredIngredients = ingredients.filter((ingredient) => {
        return ingredient.name.toLowerCase().includes(ingredientFilters.searchText.toLowerCase())
    })

    document.querySelector('#ingredients').innerHTML = ''

    filteredIngredients.map(ingredient => {
        // Create a container for the ingredients
        const ingredientEl = document.createElement('p')
        const ingredientName = document.createElement('label')
        const checkBox = document.createElement('input')
        const removeEl = document.createElement('button')
    
        document.querySelector('#ingredients').appendChild(ingredientEl)

        if (ingredient.name.length > 0) {
            ingredientName.textContent = ingredient.name
        } else {
            ingredientName.textContent = 'Unnamed Ingredient'
        }
        
    
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

renderIngredients(ingredients, ingredientFilters)

document.querySelector('input').addEventListener('input', (e) => {
    ingredientFilters.searchText = e.target.value
    renderIngredients(ingredients, ingredientFilters)
})

// Add a new ingredient
document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
    const ingredient = e.target.elements.addIngredient.value.trim()
    e.preventDefault()
    ingredients.push({
        name: ingredient,
        completed: false
    })
    localStorage.setItem('ingredients', JSON.stringify(ingredients))
    renderIngredients(ingredients, ingredientFilters)
    e.target.elements.addIngredient.value = ''
})