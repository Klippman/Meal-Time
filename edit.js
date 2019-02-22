const ingredients = [{
    name: 'pepper',
    completed: false
},{
    name: 'salt',
    completed: false
},{
    name: 'oregano',
    completed: false
}]

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
    })
}

renderIngredients(ingredients, ingredientFilters)

document.querySelector('input').addEventListener('input', (e) => {
    ingredientFilters.searchText = e.target.value
    renderIngredients(ingredients, ingredientFilters)
})

// Add a new ingredient
document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
    e.preventDefault()
    ingredients.push({
        name: e.target.elements.addIngredient.value,
        completed: false
    })
    renderIngredients(ingredients, ingredientFilters)
    e.target.elements.addIngredient.value = ''
})