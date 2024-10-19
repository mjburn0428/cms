import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../models/message.model';  
import { ContactService } from '../../contacts/contact.service'; 
import { Contact } from '../../contacts/models/contact.model'; 

@Component({
  selector: 'app-message-item',
  standalone: true, 
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  imports: [] 
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;

  messageSender!: string; 

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Get the contact based on the message's sender ID
    const contact: Contact | null | undefined = this.contactService.getContact(this.message.sender);

    // If contact is found, assign the contact's name to messageSender
    this.messageSender = contact ? contact.name : 'Unknown Sender';
  }
}
