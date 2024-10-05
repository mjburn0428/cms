import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: true,  
  imports: [CommonModule],  // Import CommonModule to use Angular features like ngIf
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input()
  contact!: Contact;  // Receive contact as input
}
