import {Ingredient} from "../shared/Ingredient.model";
import {Subject} from "rxjs";
import {Recipe} from "../recipes/recipe.model";

export class ShoppingListService{
   ingredientChanged = new Subject <Ingredient[]>();
   startedEditing = new Subject<number>();
  private ingredients : Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  /*private ingredients : Ingredient[] =[];*/

    getIngredients(){
    return this.ingredients.slice();
  }

  setIngredients(ingredients:Ingredient[]){
    this.ingredients=ingredients;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredient:Ingredient){
    let exist = false;
    for (let ig of this.getIngredients()){
      if (ingredient.name === ig.name){
        ig.amount = ig.amount + ingredient.amount;
        exist=true;
        break;
      }
    }
    if (!exist){
      this.ingredients.push(ingredient);
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients:Ingredient[]){
      for (let ing of ingredients){
        this.addIngredient(ing);
      }
    //this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
