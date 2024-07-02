let recipesData;

async function getData(data) {
  try {
    let my_obj = await fetch(data);
    let my_text = await my_obj.text();
    recipesData = JSON.parse(my_text);

    let uniqueCategories = Array.from(
      new Set(recipesData.map((recipe) => recipe.category))
    );

    let categoryDropdown = $("#categoryFilter");
    categoryDropdown.empty();

    categoryDropdown.append(`<option value="all">All</option>`);

    uniqueCategories.forEach((category) => {
      categoryDropdown.append(
        `<option value="${category}">${category}</option>`
      );
    });

    displayRecipes(recipesData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayRecipes(recipes) {
  $("#recipe_gallery").empty();

  for (let i = 0; i < recipes.length; i++) {
    let card =
      '<div class="col-lg-4 col-sm-6 col-6"><div class="card"><img src="../img/' +
      recipes[i].image +
      '" class="card-img-top" alt="' +
      recipes[i].name +
      '" /><div class="card-body"><h2>' +
      recipes[i].name +
      '</h2><p><span class="description">' +
      recipes[i].description +
      '</span><br /><strong>Cook Time: </strong><span id="cook_time">' +
      recipes[i].cookTime +
      '</span><br /><strong>Category: </strong><span class="category">' +
      recipes[i].category +
      '</span></p></div><div class="card-footer  text-center"><a href="recipe_details.html?id=' +
      recipes[i].id +
      '" class="btn btn-primary">View Recipe</a></div></div></div>';
    $("#recipe_gallery").append(card);
  }
}
// http://localhost:4000/api/recipes"
// getData("https://mp2-api-recipe.onrender.com/api/recipes/");
getData("http://localhost:4000/api/recipes");

function searchRecipes() {
  const searchTerm = $("#searchInput").val().toLowerCase();
  const recipeCards = $("#recipe_gallery").children();
  let found = false;

  recipeCards.each(function () {
    const recipeName = $(this).find("h2").text().toLowerCase();
    const recipeCategory = $(this).find(".category").text().toLowerCase();

    if (
      recipeName.includes(searchTerm) ||
      recipeCategory.includes(searchTerm)
    ) {
      $(this).show();
      found = true;
    } else {
      $(this).hide();
    }
  });

  if (!found) {
    $("#recipe_gallery").append(
      "<div class='row'><div class='col-lg-6 offset-lg-3 text-center'><h1>No recipe found</h1></div></div>"
    );
  }
}

function filterByCategory() {
  const selectedCategory = $("#categoryFilter").val().toLowerCase();
  let filteredRecipes;

  if (selectedCategory === "all") {
    filteredRecipes = recipesData;
  } else {
    filteredRecipes = recipesData.filter(
      (recipe) => recipe.category.toLowerCase() === selectedCategory
    );
  }

  displayRecipes(filteredRecipes);
}
