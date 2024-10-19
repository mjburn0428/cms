import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './models/contact.model';  
import { MOCKCONTACTS } from './MOCKCONTACTS';  

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];  
  contactSelectedEvent = new EventEmitter<Contact>();  

  constructor() {
    this.contacts = MOCKCONTACTS;
    
  }

  // New method to get all contacts.
  getContacts(): Contact[] {
    return this.contacts.slice();  
  }

  // Updated method to return undefined instead of null
  getContact(id: string): Contact | undefined {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;  // Return the found contact
      }
    }
    return undefined;  // Return undefined if no contact is found
  }
}
