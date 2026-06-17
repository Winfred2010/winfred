import { RecipeItem } from '../model/RecipeItem';
import { RecipeCollection } from '../model/RecipeCollection';

/**
 * Handles DOM rendering for the recipe book application.
 * Creates recipe cards, manages event listeners, and updates the UI.
 */
export class RecipeTemplate {
  private container: HTMLElement;
  private recipeCollection: RecipeCollection;
  private showFavoritesOnly: boolean = false;

  constructor(containerId: string, recipeCollection: RecipeCollection) {
    const element = document.getElementById(containerId);
    if (!element) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    this.container = element;
    this.recipeCollection = recipeCollection;
  }

  /**
   * Set whether to show only favorite recipes.
   */
  setShowFavoritesOnly(show: boolean): void {
    this.showFavoritesOnly = show;
  }

  /**
   * Render the recipe list to the DOM.
   */
  render(): void {
    this.container.innerHTML = '';

    const recipes = this.showFavoritesOnly
      ? this.recipeCollection.getFavoriteRecipes()
      : this.recipeCollection.getRecipes();

    if (recipes.length === 0) {
      this.renderEmptyState();
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'recipe-grid';

    recipes.forEach((recipe) => {
      const card = this.createRecipeCard(recipe);
      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  }

  /**
   * Create a recipe card DOM element.
   */
  private createRecipeCard(recipe: RecipeItem): HTMLElement {
    const card = document.createElement('article');
    card.className = `recipe-card ${recipe.isFavorite ? 'favorite' : ''}`;
    card.dataset.id = recipe.id;

    // Card Header with title and favorite button
    const header = document.createElement('div');
    header.className = 'recipe-card-header';

    const title = document.createElement('h3');
    title.className = 'recipe-title';
    title.textContent = recipe.title;

    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = `favorite-btn ${recipe.isFavorite ? 'active' : ''}`;
    favoriteBtn.innerHTML = recipe.isFavorite ? '&#9733;' : '&#9734;';
    favoriteBtn.title = recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites';
    favoriteBtn.addEventListener('click', () => {
      this.recipeCollection.toggleFavorite(recipe.id);
      this.render();
    });

    header.appendChild(title);
    header.appendChild(favoriteBtn);

    // Ingredients section
    const ingredientsSection = document.createElement('div');
    ingredientsSection.className = 'recipe-ingredients';

    const ingredientsLabel = document.createElement('h4');
    ingredientsLabel.textContent = 'Ingredients';
    ingredientsSection.appendChild(ingredientsLabel);

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach((ingredient) => {
      const li = document.createElement('li');
      li.textContent = ingredient;
      ingredientsList.appendChild(li);
    });
    ingredientsSection.appendChild(ingredientsList);

    // Instructions section (collapsible)
    const instructionsSection = document.createElement('div');
    instructionsSection.className = 'recipe-instructions collapsed';

    const instructionsLabel = document.createElement('h4');
    instructionsLabel.textContent = 'Instructions';
    instructionsSection.appendChild(instructionsLabel);

    const instructionsText = document.createElement('p');
    instructionsText.textContent = recipe.instructions;
    instructionsSection.appendChild(instructionsText);

    // Toggle button for instructions
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toggle-instructions-btn';
    toggleBtn.textContent = 'Show Instructions';
    toggleBtn.addEventListener('click', () => {
      const isCollapsed = instructionsSection.classList.contains('collapsed');
      if (isCollapsed) {
        instructionsSection.classList.remove('collapsed');
        toggleBtn.textContent = 'Hide Instructions';
      } else {
        instructionsSection.classList.add('collapsed');
        toggleBtn.textContent = 'Show Instructions';
      }
    });

    // Card Footer with date and delete button
    const footer = document.createElement('div');
    footer.className = 'recipe-card-footer';

    const dateEl = document.createElement('span');
    dateEl.className = 'recipe-date';
    dateEl.textContent = this.formatDate(recipe.createdAt);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      if (confirm(`Are you sure you want to delete "${recipe.title}"?`)) {
        this.recipeCollection.removeRecipe(recipe.id);
        this.render();
      }
    });

    footer.appendChild(dateEl);
    footer.appendChild(deleteBtn);

    // Assemble card
    card.appendChild(header);
    card.appendChild(ingredientsSection);
    card.appendChild(toggleBtn);
    card.appendChild(instructionsSection);
    card.appendChild(footer);

    return card;
  }

  /**
   * Render an empty state message when no recipes exist.
   */
  private renderEmptyState(): void {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';

    const icon = document.createElement('div');
    icon.className = 'empty-state-icon';
    icon.innerHTML = '&#127860;';

    const message = document.createElement('p');
    message.textContent = this.showFavoritesOnly
      ? 'No favorite recipes yet. Star some recipes to see them here!'
      : 'No recipes yet. Add your first recipe above!';

    emptyState.appendChild(icon);
    emptyState.appendChild(message);
    this.container.appendChild(emptyState);
  }

  /**
   * Format a date for display.
   */
  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
}
