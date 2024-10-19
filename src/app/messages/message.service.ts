import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './models/message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();  // Event emitter for message changes

  constructor() {
    this.loadMessagesFromLocalStorage();  // Load messages when the service is initialized
  }

  // Get a copy of the messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Add a new message and update local storage
  addMessage(newMessage: Message): void {
    this.messages.push(newMessage);
    this.messageChangedEvent.emit(this.messages.slice());
    this.saveMessagesToLocalStorage();  // Save to local storage after adding the message
  }

  // Save messages to local storage
  private saveMessagesToLocalStorage(): void {
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  // Load messages from local storage and merge them with MOCKMESSAGES
  private loadMessagesFromLocalStorage(): void {
    const savedMessages = localStorage.getItem('messages');
    if (savedMessages) {
      this.messages = [...MOCKMESSAGES, ...JSON.parse(savedMessages)];  // Merge MOCKMESSAGES with stored messages
    } else {
      this.messages = MOCKMESSAGES.slice();  // Use MOCKMESSAGES if no messages are saved
    }
  }
}



