import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';  // Import the DocumentService

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class DocumentListComponent implements OnInit {  // Implement OnInit to initialize the list
  documents: Document[] = [];  // Remove the hardcoded array

  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  selectedDocument: Document | undefined;

  constructor(private documentService: DocumentService) {}  // Inject DocumentService

  ngOnInit() {
    this.documents = this.documentService.getDocuments();  // Fetch the documents from the service
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
    this.selectedDocumentEvent.emit(document); 
  }
}






