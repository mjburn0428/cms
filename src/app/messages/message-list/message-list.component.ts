import { Component } from '@angular/core';
import { Message } from '../models/message.model';  // Ensure correct path to the model
import { CommonModule } from '@angular/common';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';

@Component({
  selector: 'app-message-list',
  standalone: true,
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  imports: [CommonModule, MessageItemComponent, MessageEditComponent]
})
export class MessageListComponent {
  // Define the messages array with content from the screenshot
  messages: Message[] = [
    new Message(1, 'Bro. Jackson', 'The grades for this assignment have been posted', 'Bro. Jackson'),
    new Message(2, 'Steve Johnson', 'When is assignment 3 due', 'Steve Johnson'),
    new Message(3, 'Bro. Jackson', 'Assignment 3 is due on Saturday at 11:30 PM', 'Bro. Jackson'),
    new Message(4, 'Mark Smith', 'Can I meet with you sometime. I need help with assignment 3', 'Mark Smith'),
    new Message(5, 'Bro. Jackson', 'I can meet with you today at 4:00 PM in my office.', 'Bro. Jackson')
  ];

  constructor() { }

  // Method to add a new message to the list
  onAddMessage(message: Message) {
    this.messages.push(message); // Append the new message to the array
  }
}
