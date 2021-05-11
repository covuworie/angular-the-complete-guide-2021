import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  private readonly firebaseUrl =
    'https://ng-course-recipe-book-bce51-default-rtdb.firebaseio.com';

  constructor(private actions$: Actions, private http: HttpClient) {}

  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.FETCH_RECIPES),
      switchMap(() =>
        this.http.get<Recipe[]>(`${this.firebaseUrl}/recipes.json`)
      ),
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
      map((recipes) => new RecipesActions.SetRecipes(recipes))
    )
  );
}
