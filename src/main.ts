import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

// Import other components
import { DocumentsComponent } from './app/documents/documents.component';
import { MessageListComponent } from './app/messages/message-list/message-list.component';
import { ContactsComponent } from './app/contacts/contacts.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/documents', pathMatch: 'full' },
      { path: 'documents', component: DocumentsComponent },
      { path: 'messages', component: MessageListComponent },
      { path: 'contacts', component: ContactsComponent }
    ])
  ]
}).catch(err => console.error(err));
