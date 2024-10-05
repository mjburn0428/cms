import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  standalone: true,
  imports: [CommonModule, ContactItemComponent]
})
export class ContactListComponent {
  @Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [
    {
      id: '1',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '/assets/images/jacksonk.jpg',
      group: null
    },
    {
      id: '2',
      name: 'Rex Barzee',
      email: 'barzeer@byui.edu',
      phone: '208-496-3768',
      imageUrl: '/assets/images/barzeer.jpg',
      group: null
    }
  ];

  onSelected(contact: Contact) {
    this.selectedContactEvent.emit(contact);
  }
}