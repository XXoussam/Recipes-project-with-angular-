import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') toggleStatus:boolean=false;

  @HostListener('click') openToggle(){
    this.toggleStatus=!this.toggleStatus;
  }

}
