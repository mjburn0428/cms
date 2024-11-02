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

  // Delete a contact by its ID, handling both individual and team contacts
  deleteContactById(id: string): void {
    // Loop through all contacts to find and delete the specified contact
    this.contacts = this.contacts.map(contact => {
      if (contact.group && Array.isArray(contact.group)) {
        // If the contact has a group, filter out the contact with the given ID
        contact.group = contact.group.filter(member => member.id !== id);
        return contact;
      } else {
        // For individual contacts, return only those that don’t match the given ID
        return contact.id !== id ? contact : null;
      }
    }).filter(contact => contact !== null); // Filter out any null values (deleted individuals)

    // Emit the updated contacts list
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


