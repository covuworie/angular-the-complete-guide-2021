import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredients, ADD_INGREDIENTS } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: AddIngredients
) {
  switch (action.type) {
    case ADD_INGREDIENTS:
      // Immutable update
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients],
      };
    default:
      return state;
  }
}
