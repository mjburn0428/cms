import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';
import { ContactService } from '../contact.service';
import { ContactItemComponent } from '../contact-item/contact-item.component';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ContactsFilterPipe } from '../shared/contacts-filter.pipe'; // <-- Import the ContactsFilterPipe

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactItemComponent, RouterModule, DragDropModule, ContactsFilterPipe], // <-- Add ContactsFilterPipe to imports
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  teams: Contact[] = [];
  individuals: Contact[] = [];
  term: string = '';  // <-- Define the term property for the search term
  private subscription: Subscription = new Subscription();

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

  // Method to handle search term input
  search(value: string) {  // <-- Define the search method
    this.term = value;
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

  // Handle drop event (drag and drop)
  onDrop(event: CdkDragDrop<Contact[]>) {
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (event.container.id === event.previousContainer.id) {
      // Same container: reorder the list
      this.moveItemInList(previousIndex, currentIndex);
    } else {
      // Different container: move the contact to a different list
      this.moveItemBetweenContainers(event.previousContainer.data, event.container.data, previousIndex, currentIndex);
    }
  }

  // Helper method to move items within the same list
  moveItemInList(previousIndex: number, currentIndex: number) {
    const item = this.teams[previousIndex];
    this.teams.splice(previousIndex, 1);
    this.teams.splice(currentIndex, 0, item);
  }

  // Helper method to move items between different lists
  moveItemBetweenContainers(previousContainer: Contact[], currentContainer: Contact[], previousIndex: number, currentIndex: number) {
    const item = previousContainer[previousIndex];
    previousContainer.splice(previousIndex, 1);
    currentContainer.splice(currentIndex, 0, item);
  }
}



