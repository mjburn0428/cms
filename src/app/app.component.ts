import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';  
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';
import { Document } from './documents/models/document.model'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, DocumentListComponent, DocumentDetailComponent, MessageListComponent, ContactsComponent]
})
export class AppComponent {
  selectedFeature: string = localStorage.getItem('selectedFeature') || 'documents';  
  selectedDocument: Document | null = null;  

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
    localStorage.setItem('selectedFeature', selectedFeature);  
  }

  onDocumentSelected(document: Document) {
    this.selectedDocument = document;  
  }
}
