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

  getContacts(): Contact[] {
    return this.contacts.slice(); // Return a copy of the contacts list
  }

  getContact(id: string): Observable<Contact | undefined> {
    const contact = this.contacts.find(contact => contact.id === id);
    return of(contact);
  }

  // Helper function to find the maximum ID in the current contacts
  getMaxId(): number {
    let maxId = 0;
    for (const contact of this.contacts) {
      const currentId = parseInt(contact.id.toString(), 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  addContact(newContact: Contact): void {
    if (!newContact) return;

    // Generate a new unique ID
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();

    // Add the contact to the list and emit the updated list
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(id: string, updatedContact: Contact): void {
    if (!updatedContact) return;

    // Find the index of the contact to update
    const index = this.contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      updatedContact.id = id; // Ensure the updated contact retains the same ID
      this.contacts[index] = updatedContact;
      this.contactListChangedEvent.next(this.contacts.slice());
    }
  }

  // Function to delete a contact by its id
  deleteContactById(id: string): void {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  // Function to delete a contact by passing the contact object directly
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact); // Find the index of the contact
    if (pos < 0) return; // Exit if contact is not found

    this.contacts.splice(pos, 1); // Remove the contact from the array

    // Emit the updated contacts list
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}

