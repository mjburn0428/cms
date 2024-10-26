import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { WindRefService } from '../../win-ref.service';



@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class DocumentDetailComponent implements OnInit {
  document!: Document;
  nativeWindow: any; // Property to hold the reference to the window object

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute,
    private windRefService: WindRefService // Inject WindRefService
  ) {}

  ngOnInit() {
    // Initialize nativeWindow with the window reference from WindRefService
    this.nativeWindow = this.windRefService.getNativeWindow();

    // Subscribe to route parameters to get the document ID
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        const document = this.documentService.getDocument(id); // Fetch document by ID
        if (document) {
          this.document = document;
        } else {
          console.error('Document not found');
          this.router.navigate(['/documents']); // Redirect if document not found
        }
      }
    });
  }

  onView() {
    // Open the document URL in a new tab
    if (this.document && this.document.url) {
      this.nativeWindow.open(this.document.url, '_blank');
    }
  }

  onDeleteDocument() {
    if (this.document) {
      this.documentService.deleteDocument(this.document.id);
      this.router.navigate(['/documents']);
    }
  }
}
