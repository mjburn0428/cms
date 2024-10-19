import { Component, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';

@Component({
  selector: 'app-message-edit',
  standalone: true,
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
})
export class MessageEditComponent {
  @ViewChild('subject') subjectInputRef!: ElementRef;
  @ViewChild('msgText') msgTextInputRef!: ElementRef;
  
  currentSender: string = '1';  // Replace with the ID of the sender

  constructor(private messageService: MessageService) {}

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;

    // Generate a new message with a unique ID
    const newMessageId = (Math.random() * 1000).toString();  // Generate random ID
    const newMessage = new Message(newMessageId, subjectValue, msgTextValue, this.currentSender);

    // Add the new message to the service
    this.messageService.addMessage(newMessage);

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}

