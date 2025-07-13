import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileApiService } from '../../services/profile-api.service';
import { ProfilePreviewComponent } from '../profile-preview/profile-preview.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ProfilePreviewComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile = {
    aboutMe: '',
    interests: '',
    reactionsJson: '',
    profilePictureUrl: '',
    coverPhotoUrl: '',
  };

  private api = inject(ProfileApiService);
  loading = signal(false);
  saved = signal(false);

  ngOnInit(): void {
    this.fetchProfile();
  }

  fetchProfile() {
    this.loading.set(true);
    this.api.getProfile(this.getCurrentUserId()).subscribe({
      next: (data: any) => {
        this.profile = {
          aboutMe: data.aboutMe ?? '',
          interests: data.interests ?? '',
          reactionsJson: data.reactionsJson ?? '',
          profilePictureUrl: data.profilePictureUrl ?? '',
          coverPhotoUrl: data.coverPhotoUrl ?? '',
        };
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Profile fetch error:', err);
        this.loading.set(false);
      },
    });
  }

  saveProfile() {
    this.loading.set(true);
    this.api.createOrUpdateProfile(this.profile).subscribe({
      next: () => {
        this.saved.set(true);
        this.loading.set(false);
        setTimeout(() => this.saved.set(false), 3000);
      },
      error: (err) => {
        console.error('Profile save error:', err);
        this.loading.set(false);
      },
    });
  }

  getCurrentUserId(): number {
    // TEMP placeholder, replace with your auth system’s ID
    return 1;
  }
}
