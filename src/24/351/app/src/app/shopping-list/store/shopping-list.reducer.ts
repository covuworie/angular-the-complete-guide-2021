import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredient, ADD_INGREDIENT } from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: AddIngredient
) {
  switch (action.type) {
    case ADD_INGREDIENT:
      // Immutable update
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      };
    default:
      return state;
  }
}
