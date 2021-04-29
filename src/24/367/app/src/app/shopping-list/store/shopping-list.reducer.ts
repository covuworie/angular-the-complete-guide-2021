import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientId: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientId: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  // Immutable updates
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.ingredients],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientId];
      const updatedIngredient = {
        ...ingredient,
        ...action.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientId] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: initialState.editedIngredient,
        editedIngredientId: initialState.editedIngredientId,
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, id) => {
          return id !== state.editedIngredientId;
        }),
        editedIngredient: initialState.editedIngredient,
        editedIngredientId: initialState.editedIngredientId,
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientId: action.id,
        editedIngredient: { ...state.ingredients[action.id] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: initialState.editedIngredient,
        editedIngredientId: initialState.editedIngredientId,
      };
    default:
      return state;
  }
}
