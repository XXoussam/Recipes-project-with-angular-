import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class
HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated!:boolean;
  userSub!:Subscription
  constructor(private dataStorageService:DataStorageService,
              private authService:AuthService) {
  }

  ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
  ngOnInit(): void {
    //this.onFetchData();
    this.userSub = this.authService.user.subscribe(user=>{
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipe();
    //this.dataStorageService.storeIngredients();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
   // this.dataStorageService.fetchIngredients().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}