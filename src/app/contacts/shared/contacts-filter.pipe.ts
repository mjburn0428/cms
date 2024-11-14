import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: true  // <-- Add this line
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts) return [];
    if (!term || term.length === 0) return contacts;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
