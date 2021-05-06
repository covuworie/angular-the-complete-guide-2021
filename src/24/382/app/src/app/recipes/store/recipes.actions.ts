import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public recipes: Recipe[]) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipesActions = SetRecipes | FetchRecipes;
