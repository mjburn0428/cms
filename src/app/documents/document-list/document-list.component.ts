import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  selectedDocument: Document | undefined;
  private documentSubscription: Subscription | undefined; // Subscription for document changes

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Subscribe to changes in the documents list
    this.documentSubscription = this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    );

    // Fetch the documents from the service
    this.documentService.fetchDocuments();
  }

  onSelectedDocument(document: Document) {
    this.selectedDocument = document;
  }

  onDeleteDocument(document: Document) {
    this.documentService.deleteDocument(document.id);

    // Clear selectedDocument if it was deleted
    if (this.selectedDocument?.id === document.id) {
      this.selectedDocument = undefined;
    }
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.documentSubscription) {
      this.documentSubscription.unsubscribe();
    }
  }
}









