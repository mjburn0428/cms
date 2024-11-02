import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];      // Full list of contacts
  teams: Contact[] = [];         // Contacts grouped as teams
  individuals: Contact[] = [];   // Contacts without group association (individuals)
  private subscription: Subscription | undefined; // Subscription to manage event cleanup

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // Load initial contacts from the service
    this.contacts = this.contactService.getContacts();
    this.updateTeamsAndIndividuals();  // Organize contacts into teams and individuals

    // Subscribe to contactListChangedEvent to handle updates to the contact list
    this.subscription = this.contactService.contactListChangedEvent.subscribe((updatedContacts: Contact[]) => {
      this.contacts = updatedContacts;  // Update the contact list
      this.updateTeamsAndIndividuals();  // Refresh teams and individuals
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Helper method to separate contacts into teams and individuals
  private updateTeamsAndIndividuals(): void {
    this.teams = this.contacts.filter(contact => contact.group !== null);
    this.individuals = this.contacts.filter(contact => contact.group === null);
  }

  // Emit an event to notify when a contact is selected
  onSelect(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}



