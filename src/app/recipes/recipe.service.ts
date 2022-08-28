import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/Ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
@Injectable()
export class RecipeService{
  recipeChanged = new Subject<Recipe[]>();

 /* private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel','A super tasty schnitzel','https://thumbs.dreamstime.com/b/' +
      'plate-fried-breaded-chicken-meat-schnitzel-french-fries-' +
      'salad-isolated-white-background-top-view-209378981.jpg',
      [
        new Ingredient('Meat',1),
        new Ingredient('French Fries',20)
      ]),
    new Recipe(
      'Big Fat Burger','just awesome!','https://www.kindpng.com/picc/m' +
      '/537-5374610_veg-patties-png-burger-images-hd-png-transparent.png',
      [
        new Ingredient('Buns',2),
        new Ingredient('Meat',1)
      ]),
    new Recipe(
      'Italian spaghetti','mi amor','https://thumbs.dreamstime.com/b/tomato-spaghetti' +
      '-gray-bowl-isolated-white-background-sauce-pasta-classic-italian-cuisine-dish-popular-food-top' +
      '-view-186210092.jpg',
      [
        new Ingredient('spaghetti',100),
        new Ingredient('Meat',1)
      ])
  ];*/

  private recipes: Recipe[] =[];

    constructor(private slService:ShoppingListService) {
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
      this.slService.addIngredients(ingredients);
  }

  getRecipeById(index : number){
    return this.recipes[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }


}
