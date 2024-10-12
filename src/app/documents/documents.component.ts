import { Component } from '@angular/core';
import { Document } from './models/document.model';  // Ensure correct path
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule]  // Ensure proper imports
})
export class DocumentsComponent {
  selectedDocument!: Document;  // Holds the selected document

  // This method handles the event when a document is selected
  onDocumentSelected(document: Document) {
    this.selectedDocument = document;
  }
}
