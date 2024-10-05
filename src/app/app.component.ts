import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { ContactsComponent } from './contacts/contacts.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, DocumentListComponent, MessageListComponent, ContactsComponent]
})
export class AppComponent {
  selectedFeature: string = localStorage.getItem('selectedFeature') || 'documents';  // Get from localStorage or default to 'documents'

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
    localStorage.setItem('selectedFeature', selectedFeature);  // Saves to localStorage
  }
}