import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | null = null;
  contact: Contact = { id: '', name: '', email: '', phone: '', imageUrl: '', group: [] };
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  contactId: string | null = null;

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
          this.contact = JSON.parse(JSON.stringify(this.originalContact));
          if (this.originalContact.group) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
        }
      });
    }
  }

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

  onRemoveItem(index: number): void {
    this.groupContacts.splice(index, 1);
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}

