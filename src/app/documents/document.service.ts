import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './models/document.model';  
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();
  documentsChanged = new EventEmitter<Document[]>();  // Optional for notifying changes

  constructor() {
    this.documents = MOCKDOCUMENTS;  
  }

  getDocuments(): Document[] {
    return this.documents.slice();  // Return a copy of the array
  }

  getDocument(id: number): Document | undefined {
    return this.documents.find(document => document.id === id);
  }

  deleteDocument(id: number): void {
    this.documents = this.documents.filter(document => document.id !== id);
    this.documentsChanged.emit(this.documents.slice());  // Optional: emit updated list
  }
}
