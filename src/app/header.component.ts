import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule for directives like ngIf

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,  // Mark the component as standalone
  imports: [CommonModule]  // Import CommonModule
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>();

  onSelect(feature: string) {
    this.selectedFeatureEvent.emit(feature);
  }
}
