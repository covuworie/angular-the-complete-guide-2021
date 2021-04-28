import { Ingredient } from '../../shared/ingredient.model';
import {
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  ShoppingListActions,
  START_EDIT,
  STOP_EDIT,
  UPDATE_INGREDIENT,
} from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientId: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientId: -1,
};

export function shoppingListReducer(
  state: State = initialState,
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
    case START_EDIT:
      return {
        ...state,
        editedIngredientId: action.id,
        editedIngredient: { ...state.ingredients[action.id] },
      };
    case STOP_EDIT:
      return {
        ...state,
        editedIngredient: initialState.editedIngredient,
        editedIngredientId: initialState.editedIngredientId,
      };
    default:
      return state;
  }
}
