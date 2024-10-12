import { Component, Input } from '@angular/core';
import { Document } from '../models/document.model';  // Ensure correct path

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  standalone: true  // Ensure this is true
})
export class DocumentItemComponent {
  @Input() document!: Document;  // Ensure this input property is defined
}
