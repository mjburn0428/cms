import { Injectable, EventEmitter } from '@angular/core';
import { Document } from './models/document.model';  
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();  // Add EventEmitter here

  constructor() {
    this.documents = MOCKDOCUMENTS;  
  }

  getDocuments(): Document[] {
    return this.documents;
  }

  getDocument(id: number): Document | undefined {  // Use number here
    return this.documents.find(document => document.id === id);
  }
}

