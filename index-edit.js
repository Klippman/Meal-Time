const recipeId = location.hash.substring(1)
const recipes = getSavedRecipes()
const recipe = recipes.find((recipe) => {
    return recipe.id === recipeId
})

if (recipe === undefined) {
    location.assign('/index.html')
}