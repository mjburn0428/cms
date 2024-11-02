import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './models/document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>(); // Optional: can use if needed for selection notifications
  documentChangedEvent = new Subject<Document[]>(); // Use Subject as an Observable
  private maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId(); // Initialize maxDocumentId
  }

  // Get a clone of the documents array
  getDocuments(): Document[] {
    return this.documents.slice(); 
  }

  // Get a specific document by ID
  getDocument(id: number): Document | undefined {
    return this.documents.find(document => document.id === id);
  }

  // Find the maximum ID to create unique IDs for new documents
  private getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      const currentId = parseInt(document.id.toString(), 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  // Add a new document
  addDocument(newDocument: Document): void {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId; // Assign a unique ID
    this.documents.push(newDocument);
    this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
  }

  // Update an existing document
  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id; // Preserve original ID
    this.documents[pos] = newDocument;
    this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
  }

  // Delete a document by ID
  deleteDocument(id: number): void {
    const pos = this.documents.findIndex(document => document.id === id);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1); // Remove document from list
    this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
  }
}


