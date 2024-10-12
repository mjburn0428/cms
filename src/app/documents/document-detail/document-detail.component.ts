import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';  

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css'],
  standalone: true,  
  imports: [CommonModule]  
})
export class DocumentDetailComponent {
  @Input() document: Document | null = null;
}

