import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { Document } from '../models/document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule] // Add RouterModule here
})
export class DocumentDetailComponent {
  @Input() document!: Document;

  constructor(private documentService: DocumentService, private router: Router) {}

  onDeleteDocument() {
    if (this.document) {
      this.documentService.deleteDocument(this.document.id);
      this.router.navigate(['/documents']);
    }
  }
}
