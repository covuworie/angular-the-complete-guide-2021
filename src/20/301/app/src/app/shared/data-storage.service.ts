import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private static readonly baseUrl =
    'https://ng-course-recipe-book-bce51-default-rtdb.firebaseio.com';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.Recipes;
    this.http
      .put<Recipe[]>(`${DataStorageService.baseUrl}/recipes.json`, recipes)
      .subscribe((response) => console.log(response));
  }

  fetchRecipes() {
    return this.authService.user.pipe(
      // Take 1 value from the observable and then immediately unsubscribe
      take(1),
      // Waits for first Observable (i.e the user Observable) to complete and
      // passes the data through. We then return a new Observable (i.e. the http
      // Observable) which replaces the previous one in the Observable chain.
      exhaustMap((user) => {
        return this.http.get<Recipe[]>(
          `${DataStorageService.baseUrl}/recipes.json`,
          { params: new HttpParams().set('auth', user.token) }
        );
      }),
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
      }),
      tap((recipes) => (this.recipeService.Recipes = recipes))
    );
  }
}
