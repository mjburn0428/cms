import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

import { DocumentsComponent } from './app/documents/documents.component';
import { DocumentDetailComponent } from './app/documents/document-detail/document-detail.component';
import { DocumentEditComponent } from './app/documents/document-edit/document-edit.component'; // Corrected path
import { MessageListComponent } from './app/messages/message-list/message-list.component';
import { ContactsComponent } from './app/contacts/contacts.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/documents', pathMatch: 'full' },
      { path: 'documents', component: DocumentsComponent, children: [
          { path: 'new', component: DocumentEditComponent },
          { path: ':id', component: DocumentDetailComponent },
          { path: ':id/edit', component: DocumentEditComponent }
        ]},
      { path: 'messages', component: MessageListComponent },
      { path: 'contacts', component: ContactsComponent }
    ])
  ]
}).catch(err => console.error(err));
