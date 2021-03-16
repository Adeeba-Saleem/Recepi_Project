import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }
@HostBinding('class.open') isOpened: boolean = false;

@HostListener('click') toggleOpen(){
  this.isOpened = !this.isOpened;
}

}
