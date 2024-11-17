import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>(); // Event emitter for message changes
  private firebaseUrl = 'https://jbcms-6023e-default-rtdb.firebaseio.com/messages.json'; 
  private maxMessageId: number = 0;

  constructor(private http: HttpClient) {
    this.fetchMessages(); // Fetch messages from Firebase on initialization
  }

  // Fetch messages from Firebase
  fetchMessages(): void {
    this.http.get<Message[]>(this.firebaseUrl).subscribe(
      (messages: Message[]) => {
        this.messages = messages || []; // Use empty array if null
        this.maxMessageId = this.getMaxId(); // Recalculate maxMessageId
        this.messageChangedEvent.emit(this.messages.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to fetch messages:', error);
      }
    );
  }

  // Save messages to Firebase
  private saveMessagesToFirebase(): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.firebaseUrl, this.messages, { headers }).subscribe(
      () => {
        this.messageChangedEvent.emit(this.messages.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to save messages:', error);
      }
    );
  }

  // Get a copy of the messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Add a new message and save to Firebase
  addMessage(newMessage: Message): void {
    this.maxMessageId++;
    newMessage.id = this.maxMessageId.toString(); // Assign a unique ID
    this.messages.push(newMessage);
    this.saveMessagesToFirebase(); // Save to Firebase after adding the message
  }

  // Find the maximum ID in the current messages
  private getMaxId(): number {
    let maxId = 0;
    this.messages.forEach((message) => {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }
}




