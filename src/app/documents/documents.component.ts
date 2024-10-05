import { Component } from '@angular/core';
import { DocumentListComponent } from './document-list/document-list.component';  // Adjust the path if needed
import { DocumentDetailComponent } from './document-detail/document-detail.component';  // Adjust the path if necessary

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
  standalone: true,
  imports: [DocumentListComponent, DocumentDetailComponent]  // Import DocumentListComponent here
})
export class DocumentsComponent { }