import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileApiService } from '../../services/profile-api.service';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent {
  userIdInput = '';
  profile = signal<any | null>(null);
  matchPercentage = signal<number | null>(null);
  loading = signal(false);
  error = signal('');

  private api = inject(ProfileApiService);

  loadProfile() {
    const userId = parseInt(this.userIdInput, 10);
    if (!userId) {
      this.error.set('Please enter a valid user ID.');
      return;
    }
    this.loading.set(true);
    this.error.set('');
    this.profile.set(null);
    this.matchPercentage.set(null);

    this.api.getProfile(userId).subscribe({
      next: (data) => {
        this.profile.set(data);
        this.getMatchPercentage(userId);
      },
      error: (err) => {
        console.error(err);
        this.error.set('User not found.');
        this.loading.set(false);
      },
    });
  }

  getMatchPercentage(userId: number) {
    this.api.getMatchPercentage(userId).subscribe({
      next: (data: any) => {
        this.matchPercentage.set(data.matchPercentage);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to retrieve match percentage.');
        this.loading.set(false);
      },
    });
  }
}
