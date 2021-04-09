import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

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
      .subscribe((recipes) => {
        this.recipeService.Recipes = recipes;
      });
  }
}
