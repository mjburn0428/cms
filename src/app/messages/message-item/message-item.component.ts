import { Component, Input } from '@angular/core';
import { Message } from '../models/message.model';  // Ensure the correct path to your model

@Component({
  selector: 'app-message-item',
  standalone: true,  // Make it standalone
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  imports: [] // Add FormsModule or CommonModule if needed
})
export class MessageItemComponent {
  @Input()
  message!: Message;
}
