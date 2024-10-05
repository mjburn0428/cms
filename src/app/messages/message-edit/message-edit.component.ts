import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../models/message.model';  // Ensure correct path to your model
import { FormsModule } from '@angular/forms';  // For form functionality
import { CommonModule } from '@angular/common';  // Common Angular directives

@Component({
  selector: 'app-message-edit',
  standalone: true,  // Make it standalone
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css'],
  imports: [CommonModule, FormsModule] // Import Angular modules required for forms
})
export class MessageEditComponent {
  @ViewChild('subject')
  subjectInputRef!: ElementRef;
  @ViewChild('msgText')
  msgTextInputRef!: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();

  currentSender: string = 'Joe';  // Replace with your desired name

  onSendMessage() {
    const subjectValue = this.subjectInputRef.nativeElement.value;
    const msgTextValue = this.msgTextInputRef.nativeElement.value;

    const newMessage = new Message(1, subjectValue, msgTextValue, this.currentSender);

    this.addMessageEvent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}

