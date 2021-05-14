import { Recipe } from '../recipe.model';
import * as RecipesActions from '../store/recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state: State = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.recipes],
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.recipe],
      };
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.id] = action.recipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.id;
        }),
      };
    default:
      return state;
  }
}
