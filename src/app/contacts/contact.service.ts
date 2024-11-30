import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './models/contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();
  private maxContactId: number = 0;
  private baseUrl = 'http://localhost:3000/contacts'; // NodeJS backend URL

  constructor(private http: HttpClient) {
    this.fetchContacts(); // Fetch contacts from the backend on initialization
  }

  // Fetch contacts from the backend
  fetchContacts(): void {
    this.http.get<{ message: string; contacts: Contact[] }>(this.baseUrl).subscribe(
      (responseData) => {
        this.contacts = responseData.contacts || []; // Use empty array if null
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

  // Return a copy of the contacts list
  getContacts(): Contact[] {
    return this.contacts.slice();
  }

  // Get a specific contact by ID
  getContact(id: string): Contact | undefined {
    return this.contacts.find((contact) => contact.id === id);
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

  // Add a new contact
  addContact(newContact: Contact): void {
    if (!newContact) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; createdContact: Contact }>(this.baseUrl, newContact, {
        headers: headers,
      })
      .subscribe(
        (responseData) => {
          this.contacts.push(responseData.createdContact);
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Failed to add contact:', error);
        }
      );
  }

  // Update an existing contact
  updateContact(id: string, updatedContact: Contact): void {
    if (!updatedContact) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(this.baseUrl + '/' + id, updatedContact, { headers: headers })
      .subscribe(
        () => {
          const index = this.contacts.findIndex((contact) => contact.id === id);
          if (index !== -1) {
            updatedContact.id = id;
            this.contacts[index] = updatedContact;
            this.contacts.sort((a, b) => a.name.localeCompare(b.name));
            this.contactListChangedEvent.next(this.contacts.slice());
          }
        },
        (error: any) => {
          console.error('Failed to update contact:', error);
        }
      );
  }

  // Delete a contact by ID
  deleteContactById(id: string): void {
    this.http.delete(this.baseUrl + '/' + id).subscribe(
      () => {
        this.contacts = this.contacts.filter((contact) => contact.id !== id);
        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Failed to delete contact:', error);
      }
    );
  }

  // Delete a contact by passing the contact object
  deleteContact(contact: Contact): void {
    if (!contact) return;

    const pos = this.contacts.indexOf(contact);
    if (pos >= 0) {
      this.deleteContactById(contact.id);
    }
  }
}



