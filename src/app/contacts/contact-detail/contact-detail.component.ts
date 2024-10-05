import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  standalone: true,
  imports: [CommonModule]  // Add CommonModule to the imports array
})
export class ContactDetailComponent implements OnChanges {
  @Input() contact!: Contact;

  ngOnChanges() {
    console.log('Received contact:', this.contact);  // Log to check contact data
  }
}