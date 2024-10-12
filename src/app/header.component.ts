import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './shared/dropdown.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelect(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
