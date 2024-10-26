import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  selectedDocument: Document | undefined;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Subscribe to documentChangedEvent to update the document list when a document is deleted
    this.documentService.documentChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });

    // Initialize the document list
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }

  onDeleteDocument(document: Document) {
    // Call deleteDocument from the service; subscription will update the document list
    this.documentService.deleteDocument(document.id);
    // Clear selectedDocument if it was deleted
    if (this.selectedDocument?.id === document.id) {
      this.selectedDocument = undefined;
    }
  }
}







