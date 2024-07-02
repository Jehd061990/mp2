const ex = require("express");
const rs = require("./recipes");
const cors = require("cors");

const app = ex();
const r = rs.recipes;

app.use(ex.json());
app.use(cors());

app.get("/api/recipes", (req, res) => {
  res.send(r);
});

app.get("/api/recipes/:id", (req, res) => {
  let recipe = false;
  for (let i = 0; i < r.length; i++) {
    if (r[i].id == Number(req.params.id)) {
      recipe = r[i];
      break;
    }
  }

  if (recipe) {
    res.send(recipe);
    console.log(recipe);
  } else {
    let err = "recipe not found!";
    res.status(404);
    res.send(err);
    console.error(err);
  }
});

app.get("/api/recipes/category/:category", (req, res) => {
  let filteredRecipes = [];
  for (let i = 0; i < recipes.length; i++) {
    if (
      recipes[i].category.toLowerCase() === req.params.category.toLowerCase()
    ) {
      filteredRecipes.push(recipes[i]);
    }
  }

  if (filteredRecipes.length > 0) {
    res.send(filteredRecipes);
  } else {
    let err = "No recipes in that category found!";
    res.status(404).send(err);
  }
});

let port = 4000;
app.listen(port);
console.log("Starting server at port " + port + "...");
