import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Document } from '../models/document.model';  

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,  // Mark as standalone
  imports: [CommonModule]  // Import CommonModule to use *ngFor and *ngIf
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document(1, 'CIT 260', 'Object Oriented Programming', 'http://example.com/cit260'),
    new Document(2, 'CIT 366', 'Full Web Stack Development', 'http://example.com/cit366'),
    new Document(3, 'CIT 425', 'Data Warehousing', 'http://example.com/cit425'),
    new Document(4, 'CIT 460', 'Enterprise Development', 'http://example.com/cit460'),
    new Document(5, 'CIT 495', 'Senior Practicum', 'http://example.com/cit495')
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}




