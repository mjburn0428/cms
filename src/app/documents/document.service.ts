import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>(); // Optional: can use if needed for selection notifications
  documentChangedEvent = new Subject<Document[]>(); // Use Subject as an Observable
  private maxDocumentId: number = 0;
  private firebaseUrl = 'https://jbcms-6023e-default-rtdb.firebaseio.com/documents.json'; 

  constructor(private http: HttpClient) {
    this.fetchDocuments(); // Fetch documents from Firebase on initialization
  }

  // Fetch documents from Firebase
  fetchDocuments(): void {
    this.http.get<Document[]>(this.firebaseUrl).subscribe(
      (documents: Document[]) => {
        this.documents = documents || []; // Use empty array if null
        this.maxDocumentId = this.getMaxId(); // Recalculate maxDocumentId
        this.documents.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : 0
        );
        console.log('Fetched documents from Firebase:', this.documents); // Debug log
        this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to fetch documents:', error); // Log any fetch errors
      }
    );
  }

  // Store documents in Firebase
  private storeDocuments(): void {
    console.log('Storing documents to Firebase:', this.documents); // Debug log
    const documentsJson = JSON.stringify(this.documents);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.firebaseUrl, documentsJson, { headers }).subscribe(
      () => {
        console.log('Documents successfully stored in Firebase.');
        this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to store documents:', error); // Log any save errors
      }
    );
  }

  // Get a specific document by ID
  getDocument(id: number): Document | undefined {
    return this.documents.find((document) => document.id === id);
  }

  // Find the maximum ID to create unique IDs for new documents
  private getMaxId(): number {
    let maxId = 0;
    this.documents.forEach((document) => {
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
    console.log('Adding document:', newDocument); // Debug log
    this.storeDocuments(); // Store updated documents in Firebase
  }

  // Update an existing document
  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      console.warn('Document not found for update:', originalDocument); // Warn if not found
      return;
    }
    newDocument.id = originalDocument.id; // Preserve original ID
    this.documents[pos] = newDocument;
    console.log('Updating document:', newDocument); // Debug log
    this.storeDocuments(); // Store updated documents in Firebase
  }

  // Delete a document by ID
  deleteDocument(id: number): void {
    const pos = this.documents.findIndex((document) => document.id === id);
    if (pos < 0) {
      console.warn('Document not found for deletion:', id); // Warn if not found
      return;
    }
    console.log('Deleting document with ID:', id); // Debug log
    this.documents.splice(pos, 1); // Remove document from local array
    this.storeDocuments(); // Store updated documents in Firebase
  }
}



