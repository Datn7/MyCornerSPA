import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageApiService } from '../../services/message-api.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  selectedUserId: number | null = null;
  messageContent = '';
  messages = signal<any[]>([]);
  loading = signal(false);
  error = signal('');

  private api = inject(MessageApiService);

  selectUser() {
    if (!this.selectedUserId) {
      this.error.set('Please enter a valid user ID.');
      return;
    }
    this.loadConversation();
  }

  loadConversation() {
    this.loading.set(true);
    this.api.getConversation(this.selectedUserId!).subscribe({
      next: (msgs: any) => {
        this.messages.set(msgs);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Load conversation error', err);
        this.error.set('Failed to load conversation.');
        this.loading.set(false);
      },
    });
  }

  sendMessage() {
    if (!this.messageContent.trim()) {
      this.error.set('Message cannot be empty.');
      return;
    }
    this.loading.set(true);
    this.api.sendMessage(this.selectedUserId!, this.messageContent).subscribe({
      next: () => {
        this.messageContent = '';
        this.loadConversation();
      },
      error: (err) => {
        console.error('Send message error', err);
        this.error.set('Failed to send message.');
        this.loading.set(false);
      },
    });
  }
}
