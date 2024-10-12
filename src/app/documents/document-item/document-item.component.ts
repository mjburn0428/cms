import { Component, Input } from '@angular/core';
import { Document } from '../models/document.model';  

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css'],
  standalone: true  
})
export class DocumentItemComponent {
  @Input() document!: Document;  
}
