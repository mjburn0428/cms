import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './models/contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = MOCKCONTACTS;
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number;

  constructor() {
    this.maxContactId = this.getMaxId(); // Initialize maxContactId
  }

  // Return a copy of the contacts list
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // Get a specific contact by ID as an Observable
  getContact(id: string): Observable<Contact | undefined> {
    const contact = this.contacts.find(contact => contact.id === id);
    return of(contact);
  }

  // Find the maximum ID in the current contacts
  private getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id.toString(), 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  // Add a new contact with a unique ID
  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // Update an existing contact by ID
  updateContact(id: string, updatedContact: Contact): void {
    if (!updatedContact) return;

    const index = this.contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      updatedContact.id = id;
      this.contacts[index] = updatedContact;
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  }

  // Delete a contact by its ID
  deleteContactById(id: string): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // Delete a contact by passing the contact object
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;

    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}


