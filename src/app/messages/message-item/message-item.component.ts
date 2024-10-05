import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css'],
  standalone: true
})
export class MessageItemComponent {
  @Input() message: any;  // Ensure message is received as an input property
}