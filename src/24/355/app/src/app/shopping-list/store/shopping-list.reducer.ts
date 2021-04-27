import { Ingredient } from '../../shared/ingredient.model';
import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  UpdateIngredient,
  UPDATE_INGREDIENT,
} from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions
) {
  // Immutable updates
  switch (action.type) {
    case ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients],
      };
    case UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.id];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.id] = updatedIngredient;

      return { ...state, ingredients: updatedIngredients };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, id) => {
          return id !== action.id;
        }),
      };
    default:
      return state;
  }
}
