// JavaScript Document


document.addEventListener('click', event => {
  if (event.target.id === 'recipebutton') changePageRecipe()
  if (event.target.id === 'aboutbutton') changePageAbout()
})

const changePageRecipe = () => {
	window.location.href = "pages/recipes.html"
}

const changePageAbout = () => {
	window.location.href = "pages/about.html"
}