import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>(); // Event emitter for message changes
  private baseUrl = 'http://localhost:3000/messages'; // NodeJS backend URL
  private maxMessageId: number = 0;

  constructor(private http: HttpClient) {
    this.fetchMessages(); // Fetch messages from NodeJS backend on initialization
  }

  // Fetch messages from NodeJS backend
  fetchMessages(): void {
    this.http.get<{ message: string; messages: Message[] }>(this.baseUrl).subscribe(
      (responseData) => {
        this.messages = responseData.messages || []; // Use empty array if null
        this.maxMessageId = this.getMaxId(); // Recalculate maxMessageId
        this.messageChangedEvent.emit(this.messages.slice()); // Emit updated list
      },
      (error: any) => {
        console.error('Failed to fetch messages:', error);
      }
    );
  }

  // Get a copy of the messages
  getMessages(): Message[] {
    return this.messages.slice();
  }

  // Add a new message
  addMessage(newMessage: Message): void {
    if (!newMessage) {
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; createdMessage: Message }>(this.baseUrl, newMessage, {
        headers: headers,
      })
      .subscribe(
        (responseData) => {
          this.messages.push(responseData.createdMessage);
          this.messageChangedEvent.emit(this.messages.slice());
        },
        (error: any) => {
          console.error('Failed to add message:', error);
        }
      );
  }

  // Delete a message
  deleteMessage(id: string): void {
    const pos = this.messages.findIndex((message) => message.id === id);
    if (pos < 0) {
      console.warn('Message not found for deletion:', id);
      return;
    }

    this.http.delete(this.baseUrl + '/' + id).subscribe(
      () => {
        this.messages.splice(pos, 1);
        this.messageChangedEvent.emit(this.messages.slice());
      },
      (error: any) => {
        console.error('Failed to delete message:', error);
      }
    );
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




