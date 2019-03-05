const ingredients = getSavedIngredients()

const ingredientFilters = {
    searchText: '',
    hideCompleted: false
}

renderIngredients(ingredients, ingredientFilters)

// Add a new ingredient
document.querySelector('#ingredient_form').addEventListener('submit', (e) => {
    const ingredient = e.target.elements.addIngredient.value.trim()
    const id = uuidv4()
    e.preventDefault()
    ingredients.push({
        id,
        name: ingredient,
        completed: false
    })
    saveIngredients(ingredients)
    renderIngredients(ingredients, ingredientFilters)
    e.target.elements.addIngredient.value = ''
})