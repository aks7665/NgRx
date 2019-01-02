import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private _el: ElementRef) {}

  @HostListener('click') open() {
      this._el.nativeElement.querySelector('.dropdown-menu').classList.toggle('show')                
  }

}
