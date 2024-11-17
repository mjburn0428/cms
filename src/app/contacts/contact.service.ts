import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './models/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number = 0;
  private firebaseUrl = 'https://jbcms-6023e-default-rtdb.firebaseio.com/contacts.json'; // Replace with your Firebase URL

  constructor(private http: HttpClient) {
    this.fetchContacts(); // Fetch contacts from Firebase on initialization
  }

  // Fetch contacts from Firebase
  fetchContacts(): void {
    this.http.get<Contact[]>(this.firebaseUrl).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts || []; // Use empty array if null
        this.maxContactId = this.getMaxId(); // Recalculate maxContactId
        this.contacts.sort((a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase()
            ? -1
            : a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : 0
        );
        this.contactListChangedEvent.next(this.contacts.slice()); // Emit updated contact list
      },
      (error: any) => {
        console.error('Failed to fetch contacts:', error);
      }
    );
  }

  // Store contacts in Firebase
  private storeContacts(): void {
    const contactsJson = JSON.stringify(this.contacts); // Convert contacts to JSON string
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put(this.firebaseUrl, contactsJson, { headers }).subscribe(
      () => {
        this.contactListChangedEvent.next(this.contacts.slice()); // Emit updated contact list
      },
      (error: any) => {
        console.error('Failed to store contacts:', error);
      }
    );
  }

  // Return a copy of the contacts list
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // Get a specific contact by ID
  getContact(id: string): Observable<Contact | undefined> {
    const contact = this.contacts.find((contact) => contact.id === id);
    return new Observable((observer) => {
      observer.next(contact);
      observer.complete();
    });
  }

  // Find the maximum ID in the current contacts
  private getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach((contact) => {
      const currentId = parseInt(contact.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  // Add a new contact with a unique ID
  addContact(newContact: Contact): void {
    if (!newContact) return;

    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts(); // Store updated contacts in Firebase
  }

  // Update an existing contact by ID
  updateContact(id: string, updatedContact: Contact): void {
    if (!updatedContact) return;

    const index = this.contacts.findIndex((contact) => contact.id === id);
    if (index !== -1) {
      updatedContact.id = id;
      this.contacts[index] = updatedContact;
      this.storeContacts(); // Store updated contacts in Firebase
    }
  }

  // Delete a contact by its ID
  deleteContactById(id: string): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    this.storeContacts(); // Store updated contacts in Firebase
  }

  // Delete a contact by passing the contact object
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos >= 0) {
      this.contacts.splice(pos, 1);
      this.storeContacts(); // Store updated contacts in Firebase
    }
  }
}


