import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {
  @Input() contact: Contact | undefined;  // Input to receive the selected contact
}
