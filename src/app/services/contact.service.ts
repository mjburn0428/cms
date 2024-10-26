import { Injectable } from '@angular/core';
import { Contact } from '../contacts/models/contact.model';
import { Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { MOCKCONTACTS } from '../contacts/MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = []; // Empty initially, will be populated with mock data

  constructor() {}

  // Simulate fetching mock contacts with a delay
  getMockContacts(): Observable<Contact[]> {
    console.log('Loading mock contacts...');
    return of(MOCKCONTACTS).pipe(delay(1000)); // Simulate a 1-second delay
  }

  // Retrieve all contacts
  getContacts(): Observable<Contact[]> {
    // If contacts aren't loaded, fetch them from MOCKCONTACTS
    if (this.contacts.length === 0) {
      return this.getMockContacts().pipe(
        switchMap(mockData => {
          this.contacts = mockData;
          return of(this.contacts);
        })
      );
    }
    return of(this.contacts);
  }

  // Retrieve a specific contact by ID
  getContact(id: string): Observable<Contact | undefined> {
    // If contacts aren't loaded, load them before retrieving the specific contact
    if (this.contacts.length === 0) {
      return this.getMockContacts().pipe(
        switchMap(mockData => {
          this.contacts = mockData;
          return of(this.contacts.find(contact => contact.id === id));
        })
      );
    }

    // If contacts are already loaded, retrieve directly
    const contact = this.contacts.find(contact => contact.id === id);
    console.log(`Retrieving contact with ID ${id}:`, contact);
    return of(contact);
  }
}

