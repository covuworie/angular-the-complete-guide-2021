import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import { ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      // Immutable update
      // Note using action is technically incorrect, the new ingredient will be a payload
      // that is part of the action. Just consider action a placeholder for now.
      return { ...state, ingredients: [...state.ingredients, action] };
  }
}
