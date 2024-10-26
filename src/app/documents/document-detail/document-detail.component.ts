import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to route parameters to get the document ID
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const document = this.documentService.getDocument(id); // Fetch document by ID
        if (document) {
          this.document = document;
        } else {
          // Handle case where document is not found (navigate away or show a message)
          console.error('Document not found');
          this.router.navigate(['/documents']); // Redirect back to documents list if not found
        }
      }
    });
  }

  onDeleteDocument() {
    if (this.document) {
      this.documentService.deleteDocument(this.document.id);
      this.router.navigate(['/documents']);
    }
  }
}
