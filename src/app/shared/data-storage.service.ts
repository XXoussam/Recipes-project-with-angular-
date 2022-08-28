import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Ingredient} from "./Ingredient.model";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn:'root'})
export class DataStorageService{

  constructor(private http:HttpClient,
              private recipeService:RecipeService,
              private shoppListSer:ShoppingListService,
              private authService:AuthService) {
  }

  storeRecipe(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-project-bba62-default-rtdb.firebaseio.com/recipes.json',recipes)
      .subscribe(response=>{
        console.log(response);
      });
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>('https://recipe-project-bba62-default-rtdb.firebaseio.com/recipes.json'
      )
        .pipe(map(recipes=>{
        return recipes.map(recipe=>{
          return {
            ...recipe,
            ingredients:recipe.ingredients?recipe.ingredients:[]}
        })
      }),
      tap(recipes=>{
        console.log('recipes Fetched')
        this.recipeService.setRecipes(recipes);
      }));
  }

  storeIngredients(){
    const ingredients = this.shoppListSer.getIngredients();
    this.http.put('https://recipe-project-bba62-default-rtdb.firebaseio.com/shopping-list.json',ingredients)
      .subscribe(ingredients=>{
        console.log(ingredients);
      })
  }

  fetchIngredients(){
        return this.http.get<Ingredient[]>('https://recipe-project-bba62-default-rtdb.firebaseio.com/shopping-list.json'
        ).pipe(
      tap(ingredients=>{
        console.log('ingredients fetched');
        this.shoppListSer.setIngredients(ingredients);
      })
    )
  }













  /*fetchIngredients(){
    return this.authService.user.pipe(take(1),exhaustMap(user=>{
      return this.http.get<Ingredient[]>('https://recipe-project-bba62-default-rtdb.firebaseio.com/shopping-list.json'
      ,{
          params: new HttpParams().set('auth',<string>user.token)
        })
    }),
      tap(ingredients=>{
        console.log('ingredients fetched');
        this.shoppListSer.setIngredients(ingredients);
      })
      )
  }*/
}
