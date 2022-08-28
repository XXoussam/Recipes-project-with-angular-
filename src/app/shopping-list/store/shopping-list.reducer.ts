import {Ingredient} from "../../shared/Ingredient.model";
import {Action} from "@ngrx/store";
import {state} from "@angular/animations";
import {ADD_INGREDIENT} from "./shopping-list.actions";

const initialState = {
  ingredients : [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ]
};
export class ShoppingListReducer(state=initialState,action:Action){
  switch (action.type){
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [state.ingredients,action]
      }
  }
}
