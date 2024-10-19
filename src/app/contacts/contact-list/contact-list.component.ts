import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  teams: Contact[] = [];
  individuals: Contact[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();

    // Found a way to separate the contacts into teams and individuals 
    this.teams = this.contacts.filter(contact => contact.group !== null);
    this.individuals = this.contacts.filter(contact => contact.group === null);
  }

  onSelect(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact); 
  }
}

