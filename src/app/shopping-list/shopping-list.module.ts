import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";
import {AuthGuard} from "../auth/auth.guard";

@NgModule({
  declarations:[
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports:[FormsModule,RouterModule.forChild([
    {path: '', component : ShoppingListComponent,canActivate:[AuthGuard]},
  ]),SharedModule],
  //providers : [LoggingService]
})

export class ShoppingListModule{

}
