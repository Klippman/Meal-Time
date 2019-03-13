const ingredients = getSavedIngredients()

const ingredientFilters = {
    searchText: '',
    hideCompleted: false
}

renderIngredients(ingredients, ingredientFilters)

// Toggle completed 
document.querySelector('#hide-completed').addEventListener('change', (e) => {
    ingredientFilters.hideCompleted = e.target.checked
    renderIngredients(ingredients, ingredientFilters)
})