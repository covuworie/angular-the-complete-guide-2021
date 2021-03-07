import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipesComponent } from './recipes.component';

@Injectable({
  providedIn: RecipesComponent,
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'
    ),
    new Recipe(
      'Another Test Recipe',
      'This is simply a test',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'
    ),
  ];

  public get Recipes() {
    return this.recipes.slice(); // return a copy
  }
}
