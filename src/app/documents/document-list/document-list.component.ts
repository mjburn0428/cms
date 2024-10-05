import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentItemComponent } from '../document-item/document-item.component';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [CommonModule, DocumentItemComponent]  // Ensure the necessary modules and components are imported
})
export class DocumentListComponent {
  documents = [
    {
      id: '1',
      name: 'Document 1',
      description: 'This is the first document'
    },
    {
      id: '2',
      name: 'Document 2',
      description: 'This is the second document'
    }
  ];
}
