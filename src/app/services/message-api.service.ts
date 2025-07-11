import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MessageApiService {
  constructor(private http: HttpClient) {}

  sendMessage(receiverId: number, content: string) {
    return this.http.post('/api/messages', { receiverId, content });
  }

  getConversation(userId: number) {
    return this.http.get(`/api/messages/conversation/${userId}`);
  }
}
