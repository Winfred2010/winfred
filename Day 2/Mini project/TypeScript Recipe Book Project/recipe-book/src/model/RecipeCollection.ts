import { RecipeItem } from './RecipeItem';

/**
 * Manages the complete collection of recipes.
 * Handles adding, removing, toggling favorites, and persistence to localStorage.
 */
export class RecipeCollection {
  private recipes: RecipeItem[] = [];
  private readonly storageKey: string = 'recipe_book_data';

  constructor() {
    this.loadFromLocalStorage();
  }

  /**
   * Get all recipes in the collection.
   */
  getRecipes(): RecipeItem[] {
    return [...this.recipes];
  }

  /**
   * Get only favorite recipes.
   */
  getFavoriteRecipes(): RecipeItem[] {
    return this.recipes.filter((recipe) => recipe.isFavorite);
  }

  /**
   * Get the total number of recipes.
   */
  getRecipeCount(): number {
    return this.recipes.length;
  }

  /**
   * Get the number of favorite recipes.
   */
  getFavoriteCount(): number {
    return this.recipes.filter((r) => r.isFavorite).length;
  }

  /**
   * Add a new recipe to the collection.
   */
  addRecipe(recipe: RecipeItem): void {
    this.recipes.push(recipe);
    this.saveToLocalStorage();
  }

  /**
   * Remove a recipe by its ID.
   */
  removeRecipe(id: string): void {
    this.recipes = this.recipes.filter((recipe) => recipe.id !== id);
    this.saveToLocalStorage();
  }

  /**
   * Toggle the favorite status of a recipe by its ID.
   */
  toggleFavorite(id: string): void {
    const recipe = this.recipes.find((r) => r.id === id);
    if (recipe) {
      recipe.toggleFavorite();
      this.saveToLocalStorage();
    }
  }

  /**
   * Clear all recipes from the collection.
   */
  clearAllRecipes(): void {
    this.recipes = [];
    this.saveToLocalStorage();
  }

  /**
   * Save the current collection to localStorage.
   */
  saveToLocalStorage(): void {
    try {
      const serialized = this.recipes.map((recipe) => recipe.serialize());
      localStorage.setItem(this.storageKey, JSON.stringify(serialized));
    } catch (error) {
      console.error('Failed to save recipes to localStorage:', error);
    }
  }

  /**
   * Load the collection from localStorage.
   */
  loadFromLocalStorage(): void {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (data) {
        const parsed = JSON.parse(data);
        this.recipes = parsed.map((item: any) => RecipeItem.deserialize(item));
      }
    } catch (error) {
      console.error('Failed to load recipes from localStorage:', error);
      this.recipes = [];
    }
  }
}
