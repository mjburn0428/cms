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

  //New method to get all contacts. 
  getContacts(): Contact[] {
    return this.contacts.slice();  
  }

  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;  
      }
    }
    return null;  
  }
}
