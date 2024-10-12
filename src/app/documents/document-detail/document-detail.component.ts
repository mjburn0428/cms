import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';  // Adjust the path if needed

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true,  // Standalone component
  imports: [CommonModule]  // Import CommonModule for *ngIf, *ngFor, etc.
})
export class DocumentDetailComponent {
  @Input() document: Document | null = null;
}

