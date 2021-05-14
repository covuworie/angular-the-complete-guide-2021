import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';

// All items dispatched from the store reach every reducer in the app
// so these string must be unique across the app.
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public ingredients: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public ingredient: Ingredient) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;

  constructor() {}
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public id: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export type ShoppingListActions =
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
