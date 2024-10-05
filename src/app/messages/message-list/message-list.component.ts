import { Component } from '@angular/core';
import { MessageItemComponent } from '../message-item/message-item.component';
import { MessageEditComponent } from '../message-edit/message-edit.component';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  standalone: true,
  imports: [MessageItemComponent, MessageEditComponent]  // Add the components here
})
export class MessageListComponent {
  messages = [/* Array of messages */];
}