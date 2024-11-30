import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Document } from './models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents: Document[] = [];
  documentSelectedEvent = new Subject<Document>();
  documentChangedEvent = new Subject<Document[]>();
  private maxDocumentId: number = 0;
  private baseUrl = 'http://localhost:3000/documents'; // Update to use NodeJS backend

  constructor(private http: HttpClient) {
    this.fetchDocuments(); // Fetch documents from NodeJS backend on initialization
  }

  // Fetch documents from the backend
  fetchDocuments(): void {
    this.http.get<{ message: string; documents: Document[] }>(this.baseUrl).subscribe(
      (responseData) => {
        this.documents = responseData.documents || []; // Use empty array if null
        this.maxDocumentId = this.getMaxId(); // Recalculate maxDocumentId
        this.documents.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : 0
        );
        console.log('Fetched documents from NodeJS:', this.documents); // Debug log
        this.documentChangedEvent.next(this.documents.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to fetch documents:', error); // Log any fetch errors
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

    // Ensure the ID is empty for the new document
    //newDocument.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; document: Document }>(this.baseUrl, newDocument, {
        headers: headers,
      })
      .subscribe(
        (responseData) => {
          this.documents.push(responseData.document);
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Failed to add document:', error); // Log any add errors
        }
      );
  }

  // Update an existing document
  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex((d) => d.id === originalDocument.id);
    if (pos < 0) {
      console.warn('Document not found for update:', originalDocument); // Warn if not found
      return;
    }

    // Preserve the original ID for the updated document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(this.baseUrl + '/' + originalDocument.id, newDocument, {
        headers: headers,
      })
      .subscribe(
        () => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        },
        (error: any) => {
          console.error('Failed to update document:', error); // Log any update errors
        }
      );
  }

  // Delete a document by ID
  deleteDocument(id: number): void {
    const pos = this.documents.findIndex((document) => document.id === id);
    if (pos < 0) {
      console.warn('Document not found for deletion:', id); // Warn if not found
      return;
    }

    this.http.delete(this.baseUrl + '/' + id).subscribe(
      () => {
        this.documents.splice(pos, 1); // Remove the document from the local array
        this.sortAndSend();
      },
      (error: any) => {
        console.error('Failed to delete document:', error); // Log any delete errors
      }
    );
  }

  // Sort documents and notify subscribers
  private sortAndSend(): void {
    this.documents.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1));
    this.documentChangedEvent.next(this.documents.slice());
  }
}


