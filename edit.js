const ingredients = []

const ingredientFilters = {
    searchText: '',
    hideCompleted: false
}

const renderIngredients = (ingredients, ingredientFilters) => {
    const filteredIngredients = ingredients.filter((ingredient) => {
        return ingredient.name.toLowerCase().includes(ingredientFilters.searchText.toLowerCase())
    })

    document.querySelector('#ingredients').innerHTML = ''

    filteredIngredients.forEach((ingredient) => {
    const ingredientEl = document.createElement('p')
    ingredientEl.textContent = ingredient.name
    document.querySelector('#ingredients').appendChild(ingredientEl)

        
    const checkBox = document.createElement('input')
    checkBox.checked = ingredient.completed
    checkBox.setAttribute('type', 'checkbox')
    document.querySelector('p').appendChild(checkBox)
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
    renderIngredients(ingredients, ingredientFilters)
    e.target.elements.addIngredient.value = ''
})