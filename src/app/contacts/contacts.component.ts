import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';  
import { CommonModule } from '@angular/common';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactService } from './contact.service';  
import { RouterModule } from '@angular/router'; // Import RouterModule to use router-outlet

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone: true,
  imports: [CommonModule, ContactListComponent, ContactDetailComponent, RouterModule]  // Add RouterModule here
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
