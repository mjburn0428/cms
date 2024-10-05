import { Component } from '@angular/core';
import { DocumentItemComponent } from '../document-item/document-item.component';  // Adjust the path if necessary

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  standalone: true,
  imports: [DocumentItemComponent]  // Import DocumentItemComponent here
})
export class DocumentListComponent { }