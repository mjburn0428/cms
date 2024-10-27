import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './models/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = MOCKCONTACTS;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {}

  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string): Observable<Contact | undefined> {
    const contact = this.contacts.find(contact => contact.id === id);
    return of(contact);
  }

  deleteContact(id: string): void {
    console.log('Attempting to delete contact with ID:', id); // Log contact ID
    const index = this.contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.contactChangedEvent.emit(this.contacts.slice()); // Emit the updated contacts array
      console.log('Contact deleted successfully'); // Confirmation log
    } else {
      console.log('Contact not found for deletion'); // Log if not found
    }
  }
}  
