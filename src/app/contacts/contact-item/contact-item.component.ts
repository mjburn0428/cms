import { Component, Input } from '@angular/core';
import { Contact } from '../models/contact.model';   // Moved contact model file to models folder and calling it on import. 

@Component({
  selector: 'cms-contact-item',
  standalone: true,
  imports: [],
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!: Contact;  // Add an input variable to receive Contact object
}