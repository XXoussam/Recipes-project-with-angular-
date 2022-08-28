import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/Ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm!:NgForm;
  subscription! : Subscription;
  editMode=false;
  editedItemIndex!:number;
  editedItem!: Ingredient;

  constructor(private shoppingListService:ShoppingListService,private dataStorageService:DataStorageService) { }

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index;
        this.editMode=true;
        this.editedItem=this.shoppingListService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount:this.editedItem.amount
        })
      }
    );
  }

  onSubmit(form:NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name,value.amount);
    if (this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient)
    }else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode=false;
    //this.dataStorageService.storeIngredients();
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDeleteItem(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
    //this.dataStorageService.storeIngredients();
  }

}
