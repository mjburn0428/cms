import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';  
import { CommonModule } from '@angular/common';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './contact.service';  

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent]  
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact | undefined;  

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    
    this.contactService.contactSelectedEvent.subscribe((contact: Contact) => {
      this.selectedContact = contact;  
    });
  }
}
