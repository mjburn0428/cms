import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule, DragDropModule],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  teams: Contact[] = [];
  individuals: Contact[] = [];
  private subscription: Subscription | undefined;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    this.updateTeamsAndIndividuals();

    // Subscribe to contact list changes
    this.subscription = this.contactService.contactListChangedEvent.subscribe((updatedContacts: Contact[]) => {
      this.contacts = updatedContacts;
      this.updateTeamsAndIndividuals();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Separate contacts into teams and individuals
  private updateTeamsAndIndividuals(): void {
    this.teams = this.contacts.filter(contact => contact.group !== null);
    this.individuals = this.contacts.filter(contact => contact.group === null);
  }

  // Handle contact deletion
  deleteContact(contactId: string) {
    this.contactService.deleteContactById(contactId);
    this.updateTeamsAndIndividuals();
  }

  onSelect(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}




