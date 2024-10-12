import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Document } from '../models/document.model';  

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,  
  imports: [CommonModule] 
})
export class DocumentListComponent {
  documents: Document[] = [
    new Document(1, 'CIT 260.','Object Oriented Programming.', 'https://content.byui.edu/file/22c0260d-e1b7-43a2-8903-8d8f948041ee/4/syllabus.html'),
    new Document(2, 'CIT 366', 'Full Web Stack Development', 'https://content.byui.edu/file/b7c3e5ed-6947-497f-9d32-4e5b6b397cac/1/CIT%20366%20course%20description.pdf'),
    new Document(3, 'CIT 425', 'Data Warehousing', 'https://content.byui.edu/file/d1e3efc9-cd15-43b1-9ebd-8b31a4a02e93/1/CIT%20425%20course%20description.pdf'),
    new Document(4, 'CIT 460', 'Enterprise Development', 'https://content.byui.edu/file/8399c128-ec9a-4e55-9262-4b42f3f82d2d/1/CIT%20460%20course%20description.pdf'),
    new Document(5, 'CIT 495', 'Senior Practicum', 'https://content.byui.edu/file/c7f455ef-6c77-4d7a-9f7c-d2b21bcdbe68/1/CIT%20495%20course%20description.pdf')
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}




