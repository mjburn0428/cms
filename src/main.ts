import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { ContactListComponent } from './app/contacts/contact-list/contact-list.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/contacts', pathMatch: 'full' },
      { path: 'contacts', component: ContactListComponent }
    ])
  ]
}).catch(err => console.error(err));