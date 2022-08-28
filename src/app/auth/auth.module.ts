import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations :[
    AuthComponent,
  ],
  imports :[
    CommonModule,SharedModule,
    FormsModule,RouterModule.forChild([{path: '', component : AuthComponent}])
  ]
})
export class AuthModule{

}
