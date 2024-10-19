import { Component, OnInit } from '@angular/core';
import { Document } from './models/document.model';  
import { DocumentService } from './document.service';  
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentDetailComponent } from './document-detail/document-detail.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent, CommonModule]
})
export class DocumentsComponent implements OnInit {
  selectedDocument!: Document;  

  constructor(private documentService: DocumentService) {}  

  ngOnInit() {
    
    this.documentService.documentSelectedEvent.subscribe((document: Document) => {
      this.selectedDocument = document;  
    });
  }
}
