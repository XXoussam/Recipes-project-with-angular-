import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/Ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";
import {LoggingService} from "../logging.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients! : Ingredient[];
  private igChangeSub!:Subscription;
  constructor(private shoppingListService : ShoppingListService,private loggingService:LoggingService) { }

  ngOnInit(): void {
    this.ingredients=this.shoppingListService.getIngredients();
    this.igChangeSub = this.shoppingListService.ingredientChanged
      .subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients=ingredients}
    );
    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }

}
