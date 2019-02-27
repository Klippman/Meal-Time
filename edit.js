const ingredients = getSavedIngredients()

const ingredientFilters = {
    searchText: '',
    hideCompleted: false
}

renderIngredients(ingredients, ingredientFilters)

// Add a new ingredient
document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
    const ingredient = e.target.elements.addIngredient.value.trim()
    e.preventDefault()
    ingredients.push({
        name: ingredient,
        completed: false
    })
    saveIngredients(ingredients)
    renderIngredients(ingredients, ingredientFilters)
    e.target.elements.addIngredient.value = ''
})