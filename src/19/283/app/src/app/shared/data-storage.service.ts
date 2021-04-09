import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private static readonly baseUrl =
    'https://ng-course-recipe-book-bce51-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.Recipes;
    this.http
      .put<Recipe[]>(`${DataStorageService.baseUrl}/recipes.json`, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(`${DataStorageService.baseUrl}/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            // Prevent ingredients from being null as the user is not
            // required to enter ingredients for a recipe.
            // Note that alternatively we could have done this in addRecipe
            // and updateRecipe methods of the RecipeService.
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        })
      )
      .subscribe((recipes) => {
        this.recipeService.Recipes = recipes;
      });
  }
}
