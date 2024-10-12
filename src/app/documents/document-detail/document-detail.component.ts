import { Component, Input } from '@angular/core';
import { Document } from '../models/document.model';  // Ensure correct path

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true
})
export class DocumentDetailComponent {
  @Input() document!: Document;  // Input property to receive the selected document
}

