import { Component } from '@angular/core';
import { Contact } from './models/contact.model';  // Import the Contact model
import { CommonModule } from '@angular/common';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent]  // Ensure ContactDetailComponent is imported
})
export class ContactsComponent {
  selectedContact: Contact | undefined;  // This will store the selected contact

  onContactSelected(contact: Contact) {
    this.selectedContact = contact;  // Assign the emitted contact to selectedContact
  }
}