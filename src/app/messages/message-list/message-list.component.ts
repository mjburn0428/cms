import { Component, OnInit } from '@angular/core'; 
import { Message } from '../models/message.model';  
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';
import { MessageService } from '../message.service'; 

@Component({
  selector: 'app-message-list',
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  imports: [CommonModule, MessageItemComponent, MessageEditComponent]
})
export class MessageListComponent implements OnInit {

  messages: Message[] = []; // Initialize an empty array for messages

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    // Initially load the messages from the service
    this.messages = this.messageService.getMessages();

    // Subscribe to the messageChangedEvent to update the list when new messages are added
    this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;  // Update the local messages array when a change occurs
    });
  }
}
