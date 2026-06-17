import './style.css';
import { RecipeItem } from './model/RecipeItem';
import { RecipeCollection } from './model/RecipeCollection';
import { RecipeTemplate } from './templates/RecipeTemplate';

/**
 * Recipe Book Application
 * 
 * Bootstraps the application, sets up event listeners,
 * and initializes the recipe collection and template renderer.
 */

// Initialize the recipe collection and template
const recipeCollection = new RecipeCollection();
const recipeTemplate = new RecipeTemplate('recipeContainer', recipeCollection);

// DOM Element References
const recipeForm = document.getElementById('recipeEntryForm') as HTMLFormElement;
const titleInput = document.getElementById('recipeTitle') as HTMLInputElement;
const ingredientsInput = document.getElementById('ingredients') as HTMLTextAreaElement;
const instructionsInput = document.getElementById('instructions') as HTMLTextAreaElement;
const clearAllBtn = document.getElementById('clearRecipesButton') as HTMLButtonElement;
const filterBtns = document.querySelectorAll('.filter-btn');
const recipeCountEl = document.getElementById('recipeCount') as HTMLElement;
const favoriteCountEl = document.getElementById('favoriteCount') as HTMLElement;

/**
 * Update the recipe and favorite count display.
 */
function updateStats(): void {
  if (recipeCountEl) {
    recipeCountEl.textContent = String(recipeCollection.getRecipeCount());
  }
  if (favoriteCountEl) {
    favoriteCountEl.textContent = String(recipeCollection.getFavoriteCount());
  }
}

/**
 * Handle form submission to add a new recipe.
 */
function handleAddRecipe(event: Event): void {
  event.preventDefault();

  const title = titleInput.value.trim();
  const ingredientsText = ingredientsInput.value.trim();
  const instructions = instructionsInput.value.trim();

  // Validation
  if (!title) {
    alert('Please enter a recipe title.');
    return;
  }
  if (!ingredientsText) {
    alert('Please enter at least one ingredient.');
    return;
  }
  if (!instructions) {
    alert('Please enter cooking instructions.');
    return;
  }

  // Parse ingredients (one per line)
  const ingredients = ingredientsText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (ingredients.length === 0) {
    alert('Please enter valid ingredients.');
    return;
  }

  // Create and add the recipe
  const newRecipe = new RecipeItem(title, ingredients, instructions);
  recipeCollection.addRecipe(newRecipe);

  // Reset form and re-render
  recipeForm.reset();
  recipeTemplate.render();
  updateStats();
}

/**
 * Handle clearing all recipes.
 */
function handleClearAll(): void {
  const count = recipeCollection.getRecipeCount();
  if (count === 0) {
    alert('No recipes to clear.');
    return;
  }

  const confirmed = confirm(
    `Are you sure you want to delete all ${count} recipe(s)? This action cannot be undone.`
  );
  if (confirmed) {
    recipeCollection.clearAllRecipes();
    recipeTemplate.render();
    updateStats();
  }
}

/**
 * Handle filter button clicks (All / Favorites).
 */
function handleFilterClick(event: Event): void {
  const btn = event.currentTarget as HTMLButtonElement;
  const filter = btn.dataset.filter as string;

  // Update active button state
  filterBtns.forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');

  // Apply filter
  if (filter === 'favorites') {
    recipeTemplate.setShowFavoritesOnly(true);
  } else {
    recipeTemplate.setShowFavoritesOnly(false);
  }
  recipeTemplate.render();
}

// Event Listeners
recipeForm.addEventListener('submit', handleAddRecipe);
clearAllBtn.addEventListener('click', handleClearAll);
filterBtns.forEach((btn) => {
  btn.addEventListener('click', handleFilterClick);
});

// Initial render
recipeTemplate.render();
updateStats();
