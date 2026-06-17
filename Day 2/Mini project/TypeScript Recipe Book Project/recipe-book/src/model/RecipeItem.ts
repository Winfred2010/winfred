import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a single recipe in the recipe book.
 * Each recipe has a unique ID, title, ingredients, instructions, and a favorite flag.
 */
export class RecipeItem {
  public readonly id: string;
  public title: string;
  public ingredients: string[];
  public instructions: string;
  public isFavorite: boolean;
  public createdAt: Date;

  constructor(
    title: string,
    ingredients: string[],
    instructions: string,
    isFavorite: boolean = false,
    id?: string,
    createdAt?: Date
  ) {
    this.id = id || uuidv4();
    this.title = title;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.isFavorite = isFavorite;
    this.createdAt = createdAt ? new Date(createdAt) : new Date();
  }

  /**
   * Toggle the favorite status of this recipe.
   */
  toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
  }

  /**
   * Serialize the recipe to a plain object for localStorage.
   */
  serialize(): object {
    return {
      id: this.id,
      title: this.title,
      ingredients: this.ingredients,
      instructions: this.instructions,
      isFavorite: this.isFavorite,
      createdAt: this.createdAt.toISOString(),
    };
  }

  /**
   * Create a RecipeItem instance from a plain object (deserialization).
   */
  static deserialize(data: any): RecipeItem {
    return new RecipeItem(
      data.title,
      data.ingredients,
      data.instructions,
      data.isFavorite,
      data.id,
      new Date(data.createdAt)
    );
  }
}
