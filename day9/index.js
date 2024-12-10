// Guest and her preferences
const guest = {
  name: 'Alice',
  loves: ['avocado', 'quinoa', 'kale'],
  dislikes: ['pork', 'chicken', 'turkey', 'beef', 'dairy', 'butter', 'eggs', 'gluten', 'nuts', 'soy', 'flour'],
};

// List of Christmas-themed recipes with their ingredients
const recipes = [
  {
    name: 'Honey-Glazed Ham',
    ingredients: ['pork', 'honey', 'brown sugar', 'cloves', 'butter'],
  },
  {
    name: 'Roast Turkey with Stuffing',
    ingredients: ['turkey', 'bread crumbs', 'gluten', 'celery', 'onions', 'tomatoes', 'butter'],
  },
  {
    name: 'Classic Beef Wellington',
    ingredients: ['beef', 'mushrooms', 'puff pastry', 'eggs'],
  },
  {
    name: 'Gingerbread Cookies',
    ingredients: ['flour', 'molasses', 'ginger', 'cinnamon', 'butter', 'eggs'],
  },
  {
    name: 'Vegan Stuffed Peppers',
    ingredients: ['bell peppers', 'quinoa', 'black beans', 'corn', 'tomato sauce', 'kale'],
  },
  {
    name: 'Roasted Brussels Sprouts',
    ingredients: ['brussels sprouts', 'olive oil', 'garlic'],
  },
  {
    name: 'Vegan Avocado Chocolate Mousse',
    ingredients: ['avocado', 'cocoa powder', 'maple syrup', 'flour'],
  },
  {
    name: 'Vegan Christmas Cookies',
    ingredients: ['oats', 'maple syrup', 'vanilla extract'],
  },
  {
    name: 'Quinoa Salad',
    ingredients: ['kale', 'quinoa', 'cranberries', 'lemon juice'],
  },
  {
    name: 'Vegan Lentil Loaf',
    ingredients: ['lentils', 'carrots', 'celery', 'onions', 'tomato paste'],
  },
];

// Requirements for a suitable recipe
// 1: Contains at least one ingredient Alice likes
// 2: Contains zero ingredients that Alice dislikes

function findSuitableRecipes(guest, recipes) {
  return recipes.filter(recipe => 
      recipe.ingredients.some(ing => guest.loves.includes(ing)) &&
      !recipe.ingredients.some(ing => guest.dislikes.includes(ing))
  );
}

function displayRecipes(guest, recipes) {
  const outputElement = document.getElementById('recipe-output');
  const suitableRecipes = findSuitableRecipes(guest, recipes);
  
  outputElement.innerHTML = suitableRecipes.length 
      ? `<h1>Recipes for ${guest.name}:</h1>` + 
        suitableRecipes.map(recipe => `<p>${recipe.name}</p>`).join('')
      : `<h1>No suitable recipes found for ${guest.name}</h1>`;
}

// Call when page loads
document.addEventListener('DOMContentLoaded', () => displayRecipes(guest, recipes));

