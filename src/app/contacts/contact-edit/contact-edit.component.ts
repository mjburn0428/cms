import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactEditComponent implements OnInit, OnDestroy {
  originalContact: Contact | null = null;
  contact: Contact = { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] };
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  contactId: string | null = null;
  private subscription: Subscription | undefined;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactId = this.route.snapshot.paramMap.get('id');
    if (this.contactId) {
      this.contactService.getContact(this.contactId).subscribe((contact) => {
        if (contact) {
          this.originalContact = contact;
          this.editMode = true;
          this.contact = contact ?? { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] }; // Fallback to an empty contact if undefined
          this.groupContacts = contact.group ? [...contact.group] : []; // Safely assign group
        }
      });
    }

    // Listen for updates on contact list
    this.subscription = this.contactService.contactListChangedEvent.subscribe(() => {
      if (this.contactId) {
        this.contactService.getContact(this.contactId).subscribe((contact) => {
          this.contact = contact ?? { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] }; // Ensure contact is valid
          this.updateGroupContacts();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Separate contacts into groups
  private updateGroupContacts(): void {
    this.groupContacts = this.contact && this.contact.group ? [...this.contact.group] : [];
  }

  isInvalidContact(newContact: Contact): boolean {
    if (!newContact) {
      return true; // newContact has no value
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true; // Cannot add the contact itself to its own group
    }
    return this.groupContacts.some(contact => contact.id === newContact.id);
  }

  // Handle adding contacts to the group via drag-and-drop
  onContactDrop(event: CdkDragDrop<Contact[]>): void {
    const droppedContact: Contact = event.item.data;
    if (this.isInvalidContact(droppedContact)) {
      return; // Exit if the contact is invalid
    }
    if (!this.groupContacts.find(contact => contact.id === droppedContact.id)) {
      this.groupContacts.push(droppedContact); // Add the contact to the group if not already added
    }
  }

  // Remove contact from the group
  onRemoveItem(index: number): void {
    if (index < 0 || index >= this.groupContacts.length) {
      return; // Exit if index is out of range
    }
    this.groupContacts.splice(index, 1); // Remove contact from groupContacts array
  }

  // Submit the form data
  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.editMode) {
        this.contactService.updateContact(this.contact.id, this.contact);
      } else {
        this.contactService.addContact(this.contact);
      }
      this.router.navigate(['/contacts']);
    }
  }

  // Cancel editing and navigate back
  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}



