import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
    // Close dropdown only if clicked outside the dropdown
    if (!this.elRef.nativeElement.contains(event.target) && this.isOpen) {
      this.isOpen = false;
    }
  }

  @HostListener('document:keydown.escape') closeOnEscape() {
    if (this.isOpen) {
      this.isOpen = false;  // Close the dropdown if "Escape" is pressed
    }
  }
}
