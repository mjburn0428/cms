import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule], // Add RouterModule here
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];
  selectedDocument: Document | undefined;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }

  onDeleteDocument(document: Document) {
    this.documentService.deleteDocument(document.id);
    this.documents = this.documents.filter(doc => doc.id !== document.id);

    if (this.selectedDocument?.id === document.id) {
      this.selectedDocument = undefined;
    }
  }
}







