import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

import { DocumentsComponent } from './app/documents/documents.component';
import { DocumentDetailComponent } from './app/documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './app/documents/document-edit/document-edit.component'; // Document Edit Component for new/edit routes
import { MessageListComponent } from './app/messages/message-list/message-list.component';
import { ContactsComponent } from './app/contacts/contacts.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      // Redirect root path to /documents
      { path: '', redirectTo: '/documents', pathMatch: 'full' },

      // Documents path with child routes for detail and edit
      { 
        path: 'documents', 
        component: DocumentsComponent, 
        children: [
          { path: 'new', component: DocumentEditComponent }, // New document
          { path: ':id', component: DocumentDetailComponent }, // Document detail view
          { path: ':id/edit', component: DocumentEditComponent } // Edit document
        ]
      },

      // Messages path
      { path: 'messages', component: MessageListComponent },

      // Contacts path
      { path: 'contacts', component: ContactsComponent }
    ])
  ]
}).catch(err => console.error(err));
