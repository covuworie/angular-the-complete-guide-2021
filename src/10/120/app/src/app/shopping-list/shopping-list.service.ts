import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  public get Ingredients() {
    return this.ingredients.slice(); // return a copy
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
