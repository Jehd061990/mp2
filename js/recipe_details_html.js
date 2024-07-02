$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");

  async function getRecipeDetails() {
    try {
      let my_obj = await fetch(
        // "https://mp2-api-recipe.onrender.com/api/recipes/" + recipeId
        "http://localhost:4000/api/recipes/" + recipeId
      );
      let my_text = await my_obj.text();
      let recipeDetails = JSON.parse(my_text);

      $("#recipe_name").text(recipeDetails.name);
      $("#recipe_description").text(recipeDetails.description);
      $("#recipe_cook_time").text(recipeDetails.cookTime);
      $("#recipe_image").attr("src", "../img/" + recipeDetails.image);

      $("iframe#recipe_tutorial").attr("src", recipeDetails.iframe);

      const ingredientsList = recipeDetails.ingredients.map(
        (ingredient) => `<li>${ingredient}</li>`
      );
      $("#recipe_ingredients").html(`<ul>${ingredientsList.join("")}</ul>`);

      const instructionsList = recipeDetails.instructions.map(
        (instruction, index) => `${index + 1}. ${instruction}</br>`
      );
      $("#recipe_instructions").html(`<ol>${instructionsList.join("")}</ol>`);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  }

  getRecipeDetails();
});
